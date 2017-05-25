console.log('JoT app is connected.');

var app = angular.module('jot-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope) {
  this.message = "JoT";
  // This is the url for our backend, inject scope to your controllers and you should be able to use this variable anywhere
  $scope.url = 'http://localhost:3000/';


}]); //End mainController
