var sig = require('./sig');
var host = "http://www.youtube-mp3.org";
var video = "https://www.youtube.com/watch?v=";
var R = "OTAuMTYzLjQ2LjE4NQ==";

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

  function songSrc(info, videoId) {
    var tsCreate = info.ts_create;
    var r = encodeURIComponent(R);//info.r
    var h2 = info.h2;
    var uri = '/get?video_id=' + videoId + '&ts_create=' + tsCreate + '&r=' + r + '&h2=' + h2;
    var s = '&s=' + sig(uri);

    return [host, uri, s].join('');
  }

  return {
    pushItem: pushItem,
    itemInfo: itemInfo,
    songSrc: songSrc
  }
}();