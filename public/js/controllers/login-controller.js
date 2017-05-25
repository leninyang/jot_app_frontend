angular.module('jot-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {
  this.message = "JoT";
  this.user = {};



  // =================================
  //            LOGIN
  // =================================
  // this function will make a login request when called
  this.login = function(userPass) {
    $http({
      method: 'POST',
      url: $scope.url + 'users/login',
      data: {
        user: {
          username: userPass.username,
          password: userPass.password
        }
      },
    }).then(function(response){
      console.log('response', response);
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }.bind(this));
  };

  // =================================
  //            LOGOUT
  // =================================
  this.logout = function() {
    localStorage.clear('token');
    location.reload();
    console.log('logout');
  }

  // =================================
  //            SIGNUP
  // =================================
  this.signup = function(signupData) {
  $http({
    method: 'POST',
    url: $scope.url + 'users',
    data: {
      user: {
        username: signupData.username,
        password: signupData.password
      }
    }
  }).then(function(response){
    console.log('Signing up!', response);
    signupData.username = '';
    signupData.password = '';
  });
};




}]); //End loginController
