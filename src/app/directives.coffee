((window, angular, $) ->
  'use strict';

  angular.module 'directives', []
    # loader
    .directive 'loader', [->
      restrict: 'EA'
      scope: ngShow: '=ngShow'
      template: '<div class="wrapper-loading" ng-show="ngShow">Loading...</div></div>'
    ]

    # gif
    .directive  'gif', [->
      restrict: 'EA'
      scope: url: '@'
      templateUrl: 'list.html'
      link: ($scope, element) ->
        $element = $ element
        images = []
        width = $element.width()
        height = $element.height
        end = 5

        # sequencing video
        $video = $element.find 'video.video-container'
        video=$video[0];
        $video.on 'play', ->
          interval = setInterval () ->
            if video.currentTime <= end
              canvas = document.createElement 'canvas'
              canvas.width = width
              canvas.height = height

              ctx = canvas.getContext '2d'
              ctx.drawImage video, 0, 0
              images.push canvas

              if images.length == 1
                drawFrame 0
                return
            else
              clearInterval interval
              video.pause()
              return
          , 40
          return

        # draw video frame
        $targetCanvas = $element.find 'canvas.gif-container'
        targetCanvasCtx = $targetCanvas[0].getContext '2d'
        drawFrame = (index) ->
          if index < 0 || index >= images.length
            return

          data = images[index]
          targetCanvasCtx.drawImage data, 0, 0
          return

        # track mouse move
        trackMove = (e) ->
          e = e.originalEvent if e.originalEvent
          x = e.offsetX
          y = e.offsetY

          idx = parseInt x / width * images.length
          idx = Math.min idx, images.length - 1
          drawFrame idx

          e.preventDefault()
          return

        # track touch move
        trackTouchMove = (e) ->
          e = e.originalEvent if e.originalEvent
          x = e.touches[0].clientX
          y = e.touches[0].clientY

          idx = parseInt x / width * images.length
          idx = Math.min idx, images.length - 1
          drawFrame idx

          e.preventDefault()
          return

        # Events
        $targetCanvas
          .on 'mousemove', trackMove
        $targetCanvas
          .on 'touchmove', trackTouchMove

        return
        return
    ]

  return
)(window, window.angular, window.jQuery)