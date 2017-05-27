angular.module('jot-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {


// -------------------
//  GRABING ELEMENTS
// -------------------
  // Grabbing About the Game button
  var $openBtn = $('#openModal');
  // Grabbing modal element
  var $modal = $('#modal');
  // Grabbing close button
  var $closeBtn = $('#close');


// -------------------
//   EVENT HANDLERS
// -------------------
  // Event handler to open the modal
  var openModal = function(){
    $modal.css('display', 'block');
  }
  // Event handler to close the modal
  var closeModal = function(){
    $modal.css('display', 'none');
  }


// -------------------
//   EVENT LISTENERS
// -------------------
  //Add event listener to About the Game button
  $openBtn.on('click', openModal);
  //Add event listener to Close button
  $closeBtn.on('click', closeModal);




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
