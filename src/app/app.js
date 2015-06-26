(function(document, window, $) {
  'use strict';
  var app;
  app = angular.module('app', ['directives']);
  app.controller('appController', [
    '$scope', '$http', function($scope, $http) {
      var load;
      $scope.gifs = [];
      load = function() {
        $http.get('api/gifs').success(function(data) {
          $scope.gifs = data;
        }).error(function(err) {
          console.log(err);
        });
      };
      load();
    }
  ]);
})(document, window, window.jQuery);
