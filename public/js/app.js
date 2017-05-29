console.log('JoT app is connected.');

var app = angular.module('jot-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope) {
  this.message = "JoT";
  // This is the url for our backend, inject scope to your controllers and you should be able to use this variable anywhere
  $scope.url = 'http://localhost:3000/';

  // scope variable holding userData, available to all controllers
  $scope.userData = {};

  //Used to hold the logged in user.
  $scope.currentUser = {};

  // currentUser
  $scope.loggedInUser = false;

  $scope.$on('userLogin', function() {
    $scope.$broadcast('newLogin')
  });

  // this is a function that checks if a user is logged in, inject scope to your
  // controllers and you should be able to use this variable anywhere
  $scope.userIsLoggedIn = function() {
    var jwt = localStorage.getItem('token');
    if(jwt !== 'undefined' && jwt !== undefined && jwt !== null) {
      console.log('The user is logged in.');
      $scope.userData.username = JSON.parse(localStorage.getItem('username'));
      $scope.userData.id = JSON.parse(localStorage.getItem('user_id'));
      $scope.loggedInUser = true;
    } else {
      $scope.userData = {};
      console.log('The user is NOT logged in.');
      $scope.loggedInUser = false;
    }
  };

  $scope.userIsLoggedIn();

}]); //End mainController
