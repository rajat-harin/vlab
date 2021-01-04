var multer = require('multer')
const router = require('express').Router();
var AdmZip = require('adm-zip');
var fs = require('fs');
const path = require('path'); 

const unZip = ( file, newFileName )=>{
  // reading archives
  var zip = new AdmZip(path.join(file.destination,file.filename));
  var dir = path.join('./client/public/sims', newFileName)
  if(!fs.existsSync(dir))
  {
    fs.mkdir(dir, (err) => { 
    if (err) { 
        return console.error(err); 
    } 
    console.log('Directory created successfully!'); 
  });
} 
  zip.extractAllTo(/*target path*/dir, /*overwrite*/true);
  fs.unlink(path.join(file.destination,file.filename), (err) => {
    if (err) {
      console.error(err)
      return
    }
  });
  return 
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

router.post('/:simName', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log(err);
            return res.status(500).json({err})
        } else if (err) {
          console.log(err);
            return res.status(500).json({err})
        }
        else {
          unZip(req.file, req.params.simName);
          return res.status(200).json({
            fileName: req.originalname,
            msg: "File Uploaded Successfully!",
            err: null
          })
        }
        
   

 })
});

module.exports = router;