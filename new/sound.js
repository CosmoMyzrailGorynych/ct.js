(function () {
  ctjs.mods.sound = {
    fn: {
      detect: function (_type){
        var _au = document.createElement('audio');
        return !!(_au.canPlayType && _au.canPlayType(_type).replace(/no/, ''));
      },
      play: function (name) {
        ct.data.sounds[name].loop = false;
        ct.data.sounds[name].play();
      },
      loop: function (name) {
        ct.data.sounds[name].loop = true  ;
        ct.data.sounds[name].play();
      },
      pause: function (name) {
        ct.data.sounds[name].pause();
      },
      volume: function (name,power) {
        if(power == undefined) return ct.data.sounds[name].volume;
        return ct.data.sounds[name].volume = power;
      },
      time: function (name,time) {
        if(time == undefined) return ct.data.sounds[name].currentTime;
        return ct.data.sounds[name].currentTime = time;
      },
      duration: function (name) {
        return ct.data.sounds[name].duration;
      }
    },
    author: 'Cosmo Myzrail Gorynych admin@nersta.ru https://github.com/CosmoMyzrailGorynych/'
  };
  ctjs.ct.sound = ctjs.mods.sound.fn;
  ctjs.mods.sound.wav = ctjs.mods.sound.detect('audio/wav; codecs="1"'),
  ctjs.mods.sound.ogg = ctjs.mods.sound.detect('audio/ogg; codecs="vorbis"'),
  ctjs.mods.sound.mp3 = ctjs.mods.sound.detect('audio/mpeg;'),
  window.dispatchEvent(window.ctjs.loadlibCt);
})();