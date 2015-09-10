var sig = require('./sig');
var host = "http://www.youtube-mp3.org";
var video = "http://www.youtube.com/watch?v=";

module.exports = function() {
  function getBF() {
    return false;
  }

  function pushItem(videoId) {
    var time = new Date().getTime();
    var uri = "/a/pushItem/?item=" + escape(video + videoId) + "&el=na&bf=" + getBF() + "&r=" + time;
    var s = '&s=' + sig(uri);

    return [host, uri, s].join('');
  };

  return {
    pushItem: pushItem
  }
}();