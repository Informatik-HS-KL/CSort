//empfängt Dateien in formdata format, filetype gibt den Namen der Datei an und username den Ordner in public
//server starten: npx nodemon server/server.js
var express = require('express');
var app = express();
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
var multer = require('multer');
var cors = require('cors');

app.use(cors());
app.use(express.static('public'));
var path = require('path');
const fs = require('fs')
const { fstat } = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './' + req.body.username + '/');
},
filename: function (req, file, cb) {
  cb(null, req.body.filetype + path.extname(file.originalname))
}
});

var boardstorage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './' + req.body.username + '/');
},
filename: function (req, file, cb) {
  cb(null, req.body.filetype + '.json')
}
});

var upload = multer({ storage: storage }).single('file');
var boardupload = multer({ storage: boardstorage }).single('file');

const dataDir='test';

// Hintergrundbild hochladen
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

// test
app.get('/test', function(req, res){
  res.send('OK');
});

// Karten aus dem public-folder
app.get('/download_cards', function(req, res){
  const file = path.resolve(__dirname + `/../server/${dataDir}/cards.json`);
  res.sendFile(file);
});

app.get('/download_background', function(req, res){
  const file = path.resolve(__dirname + `/../server/${dataDir}/background.png`);
  res.sendFile(file);
});

app.get('/download_legend', function(req, res){
  const file = path.resolve(__dirname + `/../server/${dataDir}/legend.json`);
  res.sendFile(file);
});

// Karten hochladen
app.post('/upload_cards',function(req, res) {
  boardupload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err);
         } else if (err) {
            console.error(err);
             return res.status(500).json(err);
         }
         console.log(req.data)

    return res.status(200).send(req.file);

  })
});

app.listen(81, function() {

  console.log('App running on port 81');

});