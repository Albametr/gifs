angular.module('app', ['directives'])
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        var load;
        $scope.gifs = [];
        load = function () {
            $http.get('api/gifs').success(function (data) {
                $scope.gifs = data;
            }).error(function (err) {
                console.log(err);
            });
        };
        load();
    }]);

angular.module('directives', [])
    .directive('gfGif', [function () {
        return {
            restrict: 'EA',
            scope: {
                url: '@'
            },
            templateUrl: 'list.html',
            link: function (scope, element, attrs) {
                var $element = $(element);

                $element = $(element);
                var images = [];
                var width = $element.width();
                var height = $element.height();
                var start = 0;
                var end = 5;

                var $video = $element.find('video.video-container');
                var video = $video[0];

                $video.on('play', function () {
                    var count = 0;
                    var interval = function () {
                        var canvas, ctx;
                        if (video.currentTime <= end && video.currentTime >= start) {
                            canvas = document.createElement('canvas');
                            canvas.width = width;
                            canvas.height = height;
                            ctx = canvas.getContext('2d');
                            ctx.drawImage(video, 0, 0);
                            var frame = ctx.getImageData(0, 0, width, height);
                            //var frame=canvas.toDataURL("image/jpeg", 1.0);

                            images.push(frame);
                            if (images.length === 1) {
                                drawFrame(0, images);
                            }
                        } else if (video.currentTime > end) {
                            video.pause();
                        }

                        setTimeout(interval, 40);
                    };

                    interval();
                    //var interval;
                    //interval = setInterval(function () {
                    //    var canvas, ctx;
                    //    if (video.currentTime <= end && video.currentTime >= start) {
                    //        canvas = document.createElement('canvas');
                    //        canvas.width = width;
                    //        canvas.height = height;
                    //        ctx = canvas.getContext('2d');
                    //        ctx.drawImage(video, 0, 0);
                    //        images.push(canvas);
                    //        if (images.length === 1) {
                    //            drawFrame(0, images);
                    //        }
                    //    } else if (video.currentTime > end) {
                    //        clearInterval(interval);
                    //        video.pause();
                    //    }
                    //}, 40);
                });

                var $targetCanvas = $element.find('canvas.gif-container');
                var targetCanvasCtx = $targetCanvas[0].getContext('2d');
                var targetImg = $element.find('img.img-container')[0];
                var drawFrame = function (index, images) {
                    var data;
                    if (index < 0 || index >= images.length) {
                        return;
                    }
                    data = images[index];
                    //targetCanvasCtx.drawImage(data, 0, 0);
                    targetCanvasCtx.putImageData(data, 0, 0);
                    //targetImg.src=data;
                    //var image = new Image();
                    //image.src = data;
                    //image.onload = function(){
                    //    targetCanvasCtx.drawImage(image, 0,0);
                    //};
                };

                var prevIndex=0;
                var drawFrame_2=function(index){
                    if(Math.abs(index-prevIndex)>=0.04) {
                        video.currentTime = index;
                        //targetCanvasCtx.drawImage(video, 0, 0);
                        prevIndex=index;
                    }
                };

                var position = {x: 0, prevX: 0};
                var mouseDown = function (e) {
                    if (e.originalEvent) {
                        e = e.originalEvent;
                    }

                    position.x = getX(e);

                    $targetCanvas.bind('mousemove', trackMove);
                    $targetCanvas.bind('touchmove', trackMove);
                    e.preventDefault();
                };
                var mouseUp = function (e) {
                    $targetCanvas.unbind('mousemove');
                    $targetCanvas.unbind('touchmove');

                    if (e.originalEvent) {
                        e = e.originalEvent;
                    }

                    position.prevX += getX(e) - position.x;
                    if (position.prevX < 0) {
                        position.prevX = 0;
                    } else if (position.prevX > width) {
                        position.prevX = width;
                    }

                    e.preventDefault();
                };

                var trackMove = function (e) {
                    var idx, x;
                    if (e.originalEvent) {
                        e = e.originalEvent;
                    }
                    x = getX(e) - position.x + position.prevX;

                    if (x >= 0 || x <= width) {
                        //idx = parseInt(x / width * images.length);
                        //idx = Math.min(idx, images.length - 1);
                        //drawFrame(idx, images);
                        var index=x / width * (end-start);
                        drawFrame_2(index);
                    }
                    e.preventDefault();
                };

                function getX(e) {
                    //return (e.touches && e.touches[0].clientX) || e.offsetX;
                    return (e.changedTouches && e.changedTouches[0].clientX) || e.offsetX;
                };

                $targetCanvas.bind('mousedown', mouseDown);
                $targetCanvas.bind('mouseup', mouseUp);
                $targetCanvas.bind('mouseleave', mouseUp);

                $targetCanvas.bind('touchstart', mouseDown);
                $targetCanvas.bind('touchend', mouseUp);
            }
        }
    }]);



