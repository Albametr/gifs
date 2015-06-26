(function(document, window, $) {
  'use strict';
  window.onload = function() {
    var draw, end, height, images, targetCanvas, targetCanvasCtx, trackMove, trackTouchMove, video, width;
    images = [];
    width = 850;
    height = 480;
    end = 5;
    video = document.getElementById('video');
    video.onplay = function() {
      var interval;
      interval = setInterval(function() {
        var canvas, ctx;
        if (video.currentTime <= end) {
          canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0);
          images.push(canvas);
          if (images.length === 1) {
            draw(0);
          }
        } else {
          clearInterval(interval);
          video.pause();
        }
      }, 40);
    };
    targetCanvas = document.getElementById('gif');
    targetCanvasCtx = targetCanvas.getContext('2d');
    draw = function(index) {
      var data;
      if (index < 0 || index >= images.length) {
        return;
      }
      data = images[index];
      targetCanvasCtx.drawImage(data, 0, 0);
    };
    trackMove = function(e) {
      var idx, x, y;
      if (e.originalEvent) {
        e = e.originalEvent;
      }
      x = e.offsetX;
      y = e.offsetY;
      idx = parseInt(x / width * images.length);
      idx = Math.min(idx, images.length - 1);
      draw(idx);
      e.preventDefault();
    };
    trackTouchMove = function(e) {
      var idx, x, y;
      if (e.originalEvent) {
        e = e.originalEvent;
      }
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      idx = parseInt(x / width * images.length);
      idx = Math.min(idx, images.length - 1);
      draw(idx);
      e.preventDefault();
    };
    $(targetCanvas).on('mousemove', trackMove);
    $(targetCanvas).on('touchmove', trackTouchMove);
  };
})(document, window, window.jQuery);
