console.log('JoT app is connected.');

var app = angular.module('jot-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope) {
  this.title = "JoT"
  // this is the url for our backend, inject scope to your controllers and you should be able to use this variable anywhere
  $scope.url = 'http://localhost:3000/';

  // scope variable holding userData, available to all controllers
  $scope.userData = {};

  // scope variable holding notes
  $scope.notes = [];

  //==================================
  //        Notes Index
  //==================================
  this.getNotes = function() {
    $http({
      method: 'GET',
      url: $scope.url + 'notes',
    }).then(function(response) {
      console.log('all notes'response);
      $scope.notes = response.data;
      //console.log(this.recipes);
    }.bind(this));
  };
  this.getNotes();
  //==================================
  //        Notes Show
  //==================================
  this.getOneRecipe = function(id) {

  }





}]); //End mainController
