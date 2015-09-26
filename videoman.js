var sig = require('./sig');
var host = "http://www.youtube-mp3.org";
var video = "http://www.youtube.com/watch?v=";
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
    var uri = "/a2/c/pushItem?item=" + escape(video + videoId) + "&el=" + getEl() + "&bf=" + getBF() + "&r=" + time();
    var s = '&s=' + sig(uri);

    return [host, uri, s].join('');
  };

  function itemInfo(pid) {
    var uri = "/a2/c/itemInfo?pid=" + pid + "&ac=" + getAc() + "&t=" + getT() + "r=" + time();
    var s = '&s=' + sig(uri);

    return [host, uri, s].join('');
  }

  function songSrc(info, pid) {
    var h = info.h;
    var r = time();
    var uri = '/a2/c/getData?pid=' + pid + '&h=' + h + '&r=' + r;
    var s = '&s=' + sig(uri);

    return [host, uri, s].join('');
  }

  return {
    pushItem: pushItem,
    itemInfo: itemInfo,
    songSrc: songSrc
  }
}();