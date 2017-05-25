angular.module('jot-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {
  this.message = "JoT";
  this.user = {};



  // =================================
  //            LOGIN
  // =================================
  // this function will make a login request when called
  this.login = function(loginData) {
    $http({
      method: 'POST',
      url: $scope.url + 'users/login',
      data: {
        user: {
          username: loginData.username,
          password: loginData.password
        }
      },
    }).then(function(response){
      console.log('response', response);
      this.user = response.data.user;
      // Emptying the form
      loginData.username = '';
      loginData.password = '';
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
  this.signUp = function(signUpData) {
  $http({
    method: 'POST',
    url: $scope.url + 'users',
    data: {
      user: {
        username: signUpData.username,
        password: signUpData.password
      }
    }
  }).then(function(response){
    console.log('Sign up!', response);
    // Emptying the form
    signUpData.username = '';
    signUpData.password = '';
  });
};




}]); //End loginController
