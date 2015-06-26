((document, window, $) ->
  'use strict';
  
  window.onload = ->
    images = []
    width = 850
    height = 480
    end = 5

    video = document.getElementById 'video'
    interval = setInterval () ->
      if video.currentTime <= end
        canvas = document.createElement 'canvas'
        canvas.width = width
        canvas.height = height
        
        ctx = canvas.getContext '2d'
        ctx.drawImage video, 0, 0
        images.push canvas
        
        if images.length == 1
          draw 0
          return
      else
        clearInterval interval
        video.pause()
        return
    , 40

    targetCanvas = document.getElementById 'gif'
    targetCanvasCtx = targetCanvas.getContext '2d'
    draw = (index) ->
      if index >= images.length
        return

      data = images[index]
      targetCanvasCtx.drawImage data, 0, 0
      return

    trackMove = (e) ->
      e = e.originalEvent if e.originalEvent
      x = e.offsetX
      y = e.offsetY

      idx = parseInt x / width * images.length
      idx = Math.min idx, images.length - 1
      draw idx

      e.preventDefault()
      return

    trackTouchMove = (e) ->
      e = e.originalEvent if e.originalEvent
      x = e.touches[0].clientX
      y = e.touches[0].clientY

      idx = parseInt x / width * images.length
      idx = Math.min idx, images.length - 1
      draw idx

      e.preventDefault()
      return

    # Events
    $ targetCanvas
      .on 'mousemove', trackMove
    $ targetCanvas
      .on 'touchmove', trackTouchMove

    return

  return

  

)(document, window, window.jQuery)