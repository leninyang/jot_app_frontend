console.log('JoT app is connected.');

var app = angular.module('jot-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope) {
  this.message = "JoT";

  // TOGGLE USED FOR LOCALHOST AND HEROKU
  // $scope.url = 'http://localhost:3000/';
  $scope.url = 'https://jot-note-api.herokuapp.com/';


  // GRAB BODY ELEMENT
  var $body = $('body');

  // scope variable holding userData, available to all controllers
  $scope.userData = {};

  //scope variable holding currently logged in user's data
  $scope.currentUser = {};

  // scope variables used in userIsLoggedIn()
  $scope.loggedInUser = false;
  $scope.loggedInUserNav = true;

  // Broadcasts an event downward to child controller (Notes Controller)
  $scope.$on('userLogin', function() {
    $scope.$broadcast('newLogin')
  });

  // Function that checks if a user is logged in. We injejected $scope so we should be able to use this variable anywhere.
  $scope.userIsLoggedIn = function() {
    var jwt = localStorage.getItem('token');
    if(jwt !== 'undefined' && jwt !== undefined && jwt !== null) {
      console.log('The user is logged in.');
      $scope.userData.username = JSON.parse(localStorage.getItem('username'));
      $scope.userData.id = JSON.parse(localStorage.getItem('user_id'));

      $scope.loggedInUser = true;
      $scope.loggedInUserNav = false;
      $body.css('background-image', 'none');
    } else {
      $scope.userData = {};
      console.log('The user is NOT logged in.');
      $scope.loggedInUser = false;
      $scope.loggedInUserNav = true;
    }
  };

  $scope.userIsLoggedIn();

}]); //End mainController
