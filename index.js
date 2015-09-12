var express = require('express');
var cors = require('cors');
var got = require('got');
var videoman = require('./videoman');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(cors());

app.get('/fetch_song/:id', function (req, res) {
  var videoId = req.params.id;
  var pushItem = videoman.pushItem(videoId);
  var options = {
    headers: {
      "Accept-Location": "*",
      "Referer": "http://www.youtube-mp3.org/es"
    }
  };

  got(pushItem, options, function(err, data, r) {
    var itemInfo = videoman.itemInfo(videoId);

    res.send({
      status_url: "/song_status/" + videoId,
      data: data
    });
  });
});

app.get('/song_status/:id', function (req, res) {
  var videoId = req.params.id;
  var itemInfo = videoman.itemInfo(videoId);

  got(itemInfo, function(err, data, r) {
    //TODO: Add safety checks...
    //Sanitize response
    data = data.replace('info = ', '')
    data = data.substring(0, data.length - 1);
    data = JSON.parse(data);

    response = {
      title: data.title,
      minutes: data.length,
      status: data.status,
      progress: data.progress,
      speed: data.progress_speed
    };

    if (data.status === 'serving') {
      response.song_src = videoman.songSrc(data, videoId);
    }

    res.send(response);
  });
});

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App running on port', app.get('port'));
});