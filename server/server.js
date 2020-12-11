//empfängt Dateien in formdata format, filetype gibt den Namen der Datei an und username den Ordner in public
//server starten: npx nodemon server/server.js
var express = require('express');
var app = express();
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
var multer = require('multer');
var cors = require('cors');

app.use(cors());
var path = require('path');
const fs = require('fs')
const { fstat } = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public/' + req.body.username + '/');
},
filename: function (req, file, cb) {
  cb(null, req.body.filetype + path.extname(file.originalname))
}
});

var upload = multer({ storage: storage }).single('file');

app.get('/download_background', function(req, res){
  const path = ('public/' + req.params.username + '/' + req.params.filetype + '.png');
  res.sendFile(path);
});

app.post('/upload_background',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err);
         } else if (err) {
             return res.status(500).json(err);
         }
    return res.status(200).send(req.file);

  })

});

app.listen(8000, function() {

  console.log('App running on port 8000');

});