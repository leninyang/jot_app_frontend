console.log('JoT app is connected.');

var app = angular.module('jot-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope) {
  this.message = "JoT";
  // this is the url for our backend, inject scope to your controllers and you should be able to use this variable anywhere
  $scope.url = 'http://localhost:3000/';

  // scope variable holding userData, available to all controllers
  $scope.userData = {};

  // scope variable holding notes
  $scope.notes = [];

  // scope variable holding the forms data
  this.formData = {};

  //========================================
  //            USER LOGIN
  //========================================
  this.login = function(userPass) {
    console.log(userPass);
    
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: userPass.username, password: userPass.password }},
    }).then(function(response) {
      console.log(response);
    });
  },


  //==================================
  //        Notes Index
  //==================================
  this.getNotes = function() {
    $http({
      method: 'GET',
      url: $scope.url + 'notes',
    }).then(function(response) {
      console.log('all notes', response);
      $scope.notes = response.data;
      // console.log($scope.notes);
    }.bind(this));
  };
  this.getNotes();
  //==================================
  //        Notes Create
  //==================================
  this.createNote = function() {
    $http({
      method: 'POST',
      url: $scope.url + 'notes',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data: {
        note: {
          title: this.formData.title,
          content: this.formData.content,
        }
      }
    }).then(function(response) {
      console.log('New note: ', response);
      this.formData = {};
    }.bind(this));
  };





}]); //End mainController
