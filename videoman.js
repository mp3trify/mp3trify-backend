var sig = require('./sig');
var host = "http://www.youtube-mp3.org";
var video = "http://www.youtube.com/watch?v=";

module.exports = function() {
  function getBF() {
    return false;
  }

  function getEl() {
    return "na";
  }

  function getAc() {
    return "www";
  }

  function getT() {
    return "grp";
  }

  function time() {
    return new Date().getTime();
  }

  function pushItem(videoId) {
    var uri = "/a/pushItem/?item=" + escape(video + videoId) + "&el=" + getEl() + "&bf=" + getBF() + "&r=" + time();
    var s = '&s=' + sig(uri);

    return [host, uri, s].join('');
  };

  function itemInfo(videoId) {
    var uri = "/a/itemInfo/?video_id=" + videoId + "&ac=" + getAc() + "&t=" + getT() + "r=" + time();
    var s = '&s=' + sig(uri);

    return [host, uri, s].join('');
  }

  return {
    pushItem: pushItem,
    itemInfo: itemInfo
  }
}();