(function () {
  ctjs.mods.draw = {
    fn: {
      circle: function (x,y,r,o) {
        ct.x.beginPath();
        ct.x.arc(x,y,r,0,2*Math.PI);  
        if (o) ct.x.stroke(); else ct.x.fill();
      },
      line: function (x,y,xx,yy) {
        ct.x.beginPath();
        ct.x.moveTo(x,y);
        ct.x.lineTo(xx,yy);
        ct.x.stroke();
      },
      image: function (img,imgindex,x,y) {
        ct.x.drawImage(ct.graphs[img].atlas,ct.graphs[img]['frames'][imgindex][0],ct.graphs[img]['frames'][imgindex][1],ct.graphs[img].width,ct.graphs[img].height,x-ct.graphs[img].x,y-ct.graphs[img].y,ct.graphs[img].width,ct.graphs[img].height);
      },
      imgext: function (img,imgindex,x,y,hs,vs,r,a) {
        ct.x.save();
        ct.x.globalAlpha = a;
        ct.x.translate(x,y);
        ct.x.rotate(r*Math.PI/180);
        ct.x.scale(hs,vs);
        ct.x.drawImage(ct.graphs[img].atlas,ct.graphs[img]['frames'][imgindex][0],ct.graphs[img]['frames'][imgindex][1],ct.graphs[img].width,ct.graphs[img].height,-ct.graphs[img].x,-ct.graphs[img].y,ct.graphs[img].width,ct.graphs[img].height);
        ct.x.restore();
      },
      copy: function (copy,x,y) {
        if(copy.transform) {
          ct.draw.imgext(copy.graph,Math.floor(copy.frame) % ct.graphs[copy.graph]['frames'].length,x,y,copy.tx,copy.ty,copy.tr,copy.ta);
        } else {
          ct.draw.image(copy.graph,Math.floor(copy.frame) % ct.graphs[copy.graph]['frames'].length,x,y);
        }
      },
      text: function (str,x,y,o) {
        if (o) ct.x.strokeText(str,x,y);
        else ct.x.fillText(str,x,y);
      },
      rectangle: function (x,y,w,h,o) {
        if (o) ct.x.strokeRect(x,y,w,h);
        else ct.x.fillRect(x,y,w,h);
      },
      rect: function (x,y,xx,yy,o) {
        ct.x.beginPath();
        ct.x.moveTo(x,y);
        ct.x.lineTo(xx,y);
        ct.x.lineTo(xx,yy);
        ct.x.lineTo(x,yy);
        ct.x.closePath();
        if (o) ct.x.stroke();
        else ct.x.fill();
      },
      polygon: {
        begin: function (x,y) {
          ct.x.beginPath();
          ct.x.moveTo(x,y);
        },
        move: function (x,y) {
          ct.x.lineTo(x,y);
        },
        close: function () {
          ct.x.closePath();
        },
        fill: function () {
          ct.x.fill();
        },
        stroke: function () {
          ct.y.stroke();
        }
      }
    },
    author: 'Cosmo Myzrail Gorynych admin@nersta.ru https://github.com/CosmoMyzrailGorynych/'
  };
  ctjs.ct.draw = ctjs.mods.draw.fn;
  window.dispatchEvent(window.ctjs.loadlibCt);
})();