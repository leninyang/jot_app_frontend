angular.module('jot-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {


  // -------------------
  //  GRABING ELEMENTS
  // -------------------
  // Grabbing Login button
  var $openLoginBtn = $('#openLoginModal');
  var $openSignUpModal = $('#openSignUpModal');

  // Grabbing login modal element
  var $loginModal = $('#loginModal');
  var $signUpModal = $('#signUpModal');
  // Grabbing close button
  var $closeLoginBtn = $('#closeLogin');
  var $closeSignUpBtn = $('#closeSignUp');

  // -------------------
  //   EVENT HANDLERS
  // -------------------
  // Event handler to open the modal
  var openLoginModal = function(){
    $loginModal.css('display', 'block');
  }
  var openSignUpModal = function(){
    $signUpModal.css('display', 'block');
  }
  // Event handler to close the modal
  var closeLoginModal = function(){
    $loginModal.css('display', 'none');
  }
  var closeSignUpModal = function(){
    $signUpModal.css('display', 'none');
  }

  // -------------------
  //   EVENT LISTENERS
  // -------------------
  //Add event listener to Login Button
  $openLoginBtn.on('click', openLoginModal);
  //Add event listener to Sign Up Button
  $openSignUpModal.on('click', openSignUpModal);
  //Add event listener to Close button
  $closeLoginBtn.on('click', closeLoginModal);
  $closeSignUpBtn.on('click', closeSignUpModal);




  this.message = "JoT";
  $scope.currentUser = {};

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
      $scope.currentUser = response.data.user;
      console.log($scope.currentUser);
      // Empties the form
      // loginData.username = '';
      // loginData.password = '';
      // localStorage.setItem('token', JSON.stringify(response.data.token));
      if (response.data.status === 200) {
        // saves webtoken to local storage
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('username', JSON.stringify(response.data.user.username));
        localStorage.setItem('user_id', JSON.stringify(response.data.user.id));
        $scope.userIsLoggedIn();
      } else {
        this.msg = 'Sorry, the username and password you provided don\'t match our records.';
      }
    }.bind(this));
  };

  // =================================
  //            LOGOUT
  // =================================
  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  },
  console.log('logout');

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
          password: signUpData.password,
        }
      }
    }).then(function(response){
      console.log('Sign up!', response);
      // Empties the form
      signUpData.username = '';
      signUpData.password = '';
    });
  };




}]); //End loginController
