var express = require('express');
var videoman = require('./videoman');
var app = express();

app.get('/fetch_song', function (req, res) {
  var fileName = 'song.mp3';
  var file = [__dirname, fileName].join('/');
  //TODO: use video_id
  var videoId = "KMU0tzLwhbE";
  var pushItem = videoman.pushItem(videoId);

  console.log(pushItem);

  res.download(file);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});