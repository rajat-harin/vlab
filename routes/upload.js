var multer = require('multer')
const router = require('express').Router();
const unzipper = require('unzipper');
var fs = require('fs');

const unZip = ( file )=>{
  fs.createReadStream(file.destination + "/" + file.filename)
  .pipe(unzipper.Parse())
  .on('entry', function (entry) {
    const newFileName = file.originalname.split('.')[0];
    const fileName = entry.path;
    const type = entry.type; // 'Directory' or 'File'
    const size = entry.vars.uncompressedSize; // There is also compressedSize;
    if (fileName === newFileName) {
      entry.pipe(fs.createWriteStream(file.destination));
    } else {
      entry.autodrain();
    }
  });
}


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './client/public/sims')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

router.post('/', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log(err);
            return res.status(500).json({err})
        } else if (err) {
          console.log(err);
            return res.status(500).json({err})
        }
        // else {
        //   unZip(req.file);
        // }
        
   return res.status(200).json({
     fileName: req.originalname,
     msg: "File Uploaded Successfully!",
     err: null
   })

 })
});

module.exports = router;