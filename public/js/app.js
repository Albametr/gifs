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
                var end = 5;
                var $video = $element.find('video.video-container');
                var video = $video[0];
                var aa=888;
                $video.on('play', function () {
                    var interval;
                    interval = setInterval(function () {
                        var canvas, ctx;
                        aa=777;
                        if (video.currentTime <= end) {
                            canvas = document.createElement('canvas');
                            canvas.width = width;
                            canvas.height = height;
                            ctx = canvas.getContext('2d');
                            ctx.drawImage(video, 0, 0);
                            images.push(canvas);
                            if (images.length === 1) {
                                drawFrame(0, images);
                            }
                        } else {
                            clearInterval(interval);
                            video.pause();
                        }
                    }, 40);
                });

                var $targetCanvas = $element.find('canvas.gif-container');
                var targetCanvasCtx = $targetCanvas[0].getContext('2d');
                var drawFrame = function (index, images) {
                    var data;
                    if (index < 0 || index >= images.length) {
                        return;
                    }
                    data = images[index];
                    targetCanvasCtx.drawImage(data, 0, 0);
                };
                var trackMove = function (e) {
                    var idx, x, y;
                    if (e.originalEvent) {
                        e = e.originalEvent;
                    }
                    x = e.offsetX;
                    y = e.offsetY;
                    idx = parseInt(x / width * images.length);
                    idx = Math.min(idx, images.length - 1);
                    drawFrame(idx, images);
                    e.preventDefault();
                };
                var trackTouchMove = function (e) {
                    var idx, x, y;
                    if (e.originalEvent) {
                        e = e.originalEvent;
                    }
                    x = e.touches[0].clientX;
                    y = e.touches[0].clientY;
                    idx = parseInt(x / width * images.length);
                    idx = Math.min(idx, images.length - 1);
                    drawFrame(idx, images);
                    e.preventDefault();
                };
                $targetCanvas.on('mousemove', trackMove);
                $targetCanvas.on('touchmove', trackTouchMove);
            }
        }
    }]);


(function (window, angular, $) {
    'use strict';
    angular.module('directives_old', []).directive('loader', [
        function () {
            return {
                restrict: 'EA',
                scope: {
                    ngShow: '=ngShow'
                },
                template: '<div class="wrapper-loading" ng-show="ngShow">Loading...</div></div>'
            };
        }
    ]).directive('gif', [
        function () {
            return {
                restrict: 'EA',
                scope: {
                    url: '@'
                },
                templateUrl: 'list.html',
                link: function ($scope, element) {
                    var $element, $targetCanvas, $video, drawFrame, end, height, images, targetCanvasCtx, trackMove, trackTouchMove, video, width;
                    $element = $(element);
                    images = [];
                    width = $element.width();
                    height = $element.height;
                    end = 5;
                    $video = $element.find('video.video-container');
                    video = $video[0];
                    $video.on('play', function () {
                        var interval;
                        interval = setInterval(function () {
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
                    $targetCanvas = $element.find('canvas.gif-container');
                    targetCanvasCtx = $targetCanvas[0].getContext('2d');
                    drawFrame = function (index) {
                        var data;
                        if (index < 0 || index >= images.length) {
                            return;
                        }
                        data = images[index];
                        targetCanvasCtx.drawImage(data, 0, 0);
                    };
                    trackMove = function (e) {
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
                    trackTouchMove = function (e) {
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
                   //$targetCanvas.on('touchmove', trackTouchMove);
                    return;
                }
            };
        }
    ]);
})(window, window.angular, window.jQuery);


