var multer = require('multer')
const router = require('express').Router();
var AdmZip = require('adm-zip');
var fs = require('fs');
const path = require('path');

// AWS setup

// Import required AWS SDK  for Node.js
const AWS = require("aws-sdk");

// Set the AWS region
const REGION = "ap-south-1";

// Set the bucket parameters
const bucketName = process.env.AWS_BUCKET_NAME;

// Create an S3 client service object
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}) //all keys are taken from .env

//end

const unZipToFS = (file, newFileName) => {
  // reading archives
  var zip = new AdmZip(path.join(file.destination, file.filename));
  var dir = path.join('./client/public/sims', newFileName)
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });
  }
  else {
    fs.readdir(dir, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(dir, file), err => {
          if (err) throw err;
        });
      }
    });
  }
  zip.extractAllTo(/*target path*/dir, /*overwrite*/true);
  fs.unlink(path.join(file.destination, file.filename), (err) => {
    if (err) {
      console.error(err)
      return
    }
  });
  return
}

const unZipToBucket = (file, newFileName) => {
  // reading archives
  var zip = new AdmZip(path.join(file.destination, file.filename));
  var zipEntries = zip.getEntries();
  zipEntries.forEach(function (zipEntry) {
    if (zipEntry.entryName == "index.html") {
      s3.upload({
        Bucket: bucketName,
        Key: newFileName + '/' + zipEntry.entryName,
        Body: zipEntry.getData(),
        ContentType: 'text/html'
      },
        (err, data) => {
          return err
        }
      )
    }
    else {
      s3.upload({
        Bucket: bucketName,
        Key: newFileName + '/' + zipEntry.entryName,
        Body: zipEntry.getData()
      },
        (err, data) => {
          return err
        }
      )
    }

  });
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './client/public/sims')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file')

router.post('/:simName', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json({ err })
    } else if (err) {
      console.log(err);
      return res.status(500).json({ err })
    }
    else {
      unZipToFS(req.file, req.params.simName);
      return res.status(200).json({
        fileName: req.originalname,
        msg: "File Uploaded Successfully!",
        err: null
      })
    }
  })
});

router.post('/aws/:simName', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json({ err })
    } else if (err) {
      console.log(err);
      return res.status(500).json({ err })
    }
    else {
      console.log(req.file);
      let uploadError
      uploadError = unZipToBucket(req.file, req.params.simName);
      if (uploadError) {
        return res.status(500).json({
          fileName: req.originalname,
          msg: "File Uploaded Failed!",
          err: uploadError
        })
      }
      return res.status(200).json({
        fileName: req.originalname,
        msg: "File Uploaded Successfully!",
        err: null
      })
    }
  })
});

module.exports = router;