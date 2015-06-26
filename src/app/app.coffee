((document, window, $) ->
  'use strict';
  
  app = angular.module 'app', ['directives']

  app.controller 'appController', ['$scope', '$http', ($scope, $http) ->
    $scope.gifs = []

    load = ->
      $http.get 'api/gifs'
        .success (data) ->
          $scope.gifs = data
          return
        .error (err) ->
          console.log(err)
          return
      return

    # loading gifs
    load()

    return
  ]

  return
)(document, window, window.jQuery)