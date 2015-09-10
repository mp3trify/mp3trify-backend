var express = require('express');
var videoman = require('./videoman');
var got = require('got');
var app = express();

app.get('/fetch_song/:id', function (req, res) {
  var videoId = req.params.id;
  var pushItem = videoman.pushItem(videoId);

  got(pushItem, function(err, data, r) {
    var itemInfo = videoman.itemInfo(videoId);

    res.send({
      itemInfo: itemInfo,
      pushItem: pushItem
    });
  });
});

app.get('/song_status/:id', function (req, res) {
  var videoId = req.params.id;
  var itemInfo = videoman.itemInfo(videoId);
  console.log(itemInfo);

  got(itemInfo, function(err, data, r) {
    //TODO: Add safety checks...
    //Sanitize response
    console.log(data);
    data = data.replace('info = ', '')
    data = data.substring(0, data.length - 1);

    res.send({
      data: JSON.parse(data)
    });
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});