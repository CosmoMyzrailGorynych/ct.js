(function () {
  ctjs.mods.types = {
    genobj: {
      x:0,
      y:0,
      spd:0,
      dir:0,
      grav:0,
      dravdir:0,
      depth:0,
      type: -1,
      frame:0,
      imgspd:0,
      transform:false,
      transformx:1,
      transformy:1,
      transformr:0,
      transforma:1,
      graph: -1,
      events: function () {}
    },
    fn: {
      list: { },
      make: function (type,x,y) {
        obj = Object.create(ctjs.types.genobj);
        obj.type = type;
        obj.graph = ct.data.types[type].graph;
        obj.events = ct.data.types[type].events;
        obj.x = x;
        obj.y = y;
        
        if (ct.types.list[type])
          ct.types.list[type].push(obj);
        else
          ct.types.list[type] = [obj];
          
        if (ct.layers[ct.types[type].depth])
          ct.layers[ct.types[type].depth].push(obj);
        else
          ct.layers[ct.types[type].depth] = [obj];

        ct.data.types[type].oncreate.apply(obj);
      },
      move: function (o) {
        o.xprev = o.x;
        o.yprev = o.y;
        if (!o.grav) { o.grav = 0; o.gravdir = 0; }
        hspd = o.spd * Math.cos(o.dir*Math.PI/-180) + o.grav * Math.cos(o.gravdir*Math.PI/-180);
        vspd = o.spd * Math.sin(o.dir*Math.PI/-180) + o.grav * Math.sin(o.gravdir*Math.PI/-180);
        o.x += hspd;
        o.y += vspd;
        o.spd = Math.sqrt(hspd*hspd + vspd*vspd);
        if (o.spd > 0) o.dir = ct.types.ppd(o.xprev,o.yprev,o.x,o.y);
      },
      ppd: function (x1, y1, x2, y2) { 
        return Math.atan2(y2 - y1, x2 - x1) * -180 / Math.PI; 
      },
      each: function (func) {
        for (i in ct.stack) {
          func.apply(ct.stack[i]);
        }
      }
    },
    author: 'Cosmo Myzrail Gorynych admin@nersta.ru https://github.com/CosmoMyzrailGorynych/'
  };
  ctjs.ct.types = ctjs.mods.types.fn;
  window.dispatchEvent(window.ctjs.loadlibCt);
})();