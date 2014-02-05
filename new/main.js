(function () {
  function init(ct) { return setInterval(function() { ctjs.frameLoad(ct); }, ~~(1000 / ct.fps)); };
  function initRun(ct) { return setInterval(function() { ctjs.frame(ct); }, ~~(1000 / ct.fps)); };
  var ctlib = {
    mods: {
      core: {
        version: 0,
        author: 'Cosmo Myzrail Gorynych admin@nersta.ru https://github.com/CosmoMyzrailGorynych/'
      }
    },
    frameLoad: function (ct) {
      ct.dispatchEvent(window.ctjs.drawloadCt);
      if (ct.loaded == (ct.data.graphics ? ct.data.graphics.length : 0) + (ct.data.sounds ? ct.data.sounds.length : 0) + (ct.data.videos /* why not? */ ? ct.data.videos.length : 0)) {
        clearInterval(ct.ctDrawInt);
        ct.ctDrawInt = initRun(ct);
        ct.rooms.switch(ct.data.rooms.starting);
      }
    },
    frame: function (ct) {
      ct.x.clearRect(0, 0, ct.width, ct.height);
      ct.dispatchEvent(window.ctjs.predrawCt);
      ct.stack.sort(function(a,b) {return a.depth-b.depth});
      for (var i = 0; i < ct.stack.length; i ++) {
        if (ct.stack[i].kill) {
          ct.stack.splice(i,1);
          i --;
        } else {
          ct.stack[i].xprev = ct.stack[i].x;
          ct.stack[i].yprev = ct.stack[i].y;
          ct.stack[i].events();
          ct.stack[i].frame += ct.stack[i].imgspd;
        }
      }
      for (i in ct.types.list) {
        for (var k = 0; k < ct.types.list[i].length; k ++) {
          if (ct.types.list[i][k].kill) {
            ct.types.list[i].splice(k,1);
            k --;
          }
        }
      }
      ct.rooms.current.events();
      ct.dispatchEvent(window.ctjs.afterdrawCt);
    },
    get: function (url, callback) {
      var script = document.createElement('script');
      script.src = url;
      if (callback) { 
        script.addEventListener('load', callback);
      }
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
  
  if (window.Event) {
    ctlib.initCt = new Event('ctready');
    ctlib.preCt = new Event('ctbeforeready');
    ctlib.predrawCt = new Event('ctbeforedraw');
    ctlib.afterdrawCt = new Event('ctafterdraw');
    ctlib.drawloadCt = new Event('ctloading');
    ctlib.loadedCt = new Event('ctloaded');
    ctlib.loadlibCt = new Event('ctlibready');
  } else {
    ctlib.initCt = document.createEvent('Event');
    ctlib.preCt = document.createEvent('Event');
    ctlib.predrawCt = document.createEvent('Event');
    ctlib.afterdrawCt = document.createEvent('Event');
    ctlib.drawload = document.createEvent('Event');
    ctlib.loadedCt = document.createEvent('Event');
    ctlib.loadlibCt = document.createEvent('Event');
  }
  
  ctlib.ct = function (ct,data,libs,callback) {
    if (!ct) ct = this;

    ct.dispatchEvent(window.ctjs.preCt);
    
    ct.x = ct.getContext('2d');
    ct.data = data;
    ct.libs = libs;
    ct.running = false;
    ct.loaded = 0;
    ct.fps = 30;
    ct.stack = [];
    ct.types = {};
    ct.rooms = {
      switch: function (room) {
        ct.stack = [];
        ct.rooms.current = ct.data.rooms[room];
        ct.rooms.current.onstart();
      }
    };
    
    if (data.opts) for (var eh in data.opts) {
      ct[eh] = data.opts[eh];
    }
    
    if (data.graphics) for (var eh in data.graphics) {
      var img = document.createElement('img');
      img.indata = data.graphics[eh];
      img.ct = ct;
      img.onload = function () {
        this.indata.loaded = true;
        ct.loaded ++;
      }
      img.src = data.graphics[eh].src;
    }
    
    if (data.sounds) for (var eh in data.sounds) {
      var aud = document.createElement('audio');
      aud.indata = data.sounds[eh];
      aud.ct = ct;
      aud.onload = aud.oncanplaythrough = function () {
        if (!this.indata.loaded) {
          this.indata.loaded = true;
          ct.loaded ++;
        }
      }
      aud.src = data.sounds[eh].src;
    }
    
    if (data.videos) for (var eh in data.videos) {
      var vid = document.createElement('video');
      vid.indata = data.videos[eh];
      vid.ct = ct;
      vid.onload = aud.oncanplaythrough = function () {
        if (!this.indata.loaded) {
          this.indata.loaded = true;
          ct.loaded ++;
        }
      }
      vid.src = data.videos[eh].src;
    }
    
    if (!window.Event) {
      ctlib.initCt.initEvent('ctready', true, true);
      ctlib.preCt.initEvent('ctbeforeready', true, true);
      ctlib.predrawCt.initEvent('ctbeforedraw', true, true);
      ctlib.afterdrawCt.initEvent('ctafterdraw', true, true);
      ctlib.drawloadCt.initEvent('ctloading', true, true);
      ctlib.loadedCt.initEvent('ctloaded', true, true);
      ctlib.loadlibCt.initEvent('ctlibready', true, true);
    }
    ct.ctDrawInt = init(ct);
    ct.dispatchEvent(window.ctjs.initCt);
    return this;
  };
  
  HTMLCanvasElement.prototype.ct = ctlib.ct;
  
  window.ctjs = ctlib;
})();