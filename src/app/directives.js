(function(window, angular, $) {
  'use strict';
  angular.module('directives', []).directive('loader', [
    function() {
      return {
        restrict: 'EA',
        scope: {
          ngShow: '=ngShow'
        },
        template: '<div class="wrapper-loading" ng-show="ngShow">Loading...</div></div>'
      };
    }
  ]).directive('gif', [
    function() {
      return {
        restrict: 'EA',
        scope: {
          url: '@'
        },
        template: 'list.html',
        link: function($scope, element) {
          var $element;
          $element = $(element);
          window.onload = function() {
            var $targetCanvas, $video, drawFrame, end, height, images, targetCanvasCtx, trackMove, trackTouchMove, width;
            images = [];
            width = $element.width();
            height = $element.height;
            end = 5;
            $video = $element.find('video.video-container');
            $video.on('play', function() {
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
                    drawFrame(0);
                  }
                } else {
                  clearInterval(interval);
                  video.pause();
                }
              }, 40);
            });
            $targetCanvas = $element.find('gif-container');
            targetCanvasCtx = $targetCanvas[0].getContext('2d');
            drawFrame = function(index) {
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
              drawFrame(idx);
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
              drawFrame(idx);
              e.preventDefault();
            };
            $targetCanvas.on('mousemove', trackMove);
            $targetCanvas.on('touchmove', trackTouchMove);
          };
        }
      };
    }
  ]);
})(window, window.angular, window.jQuery);
