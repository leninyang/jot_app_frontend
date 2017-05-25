angular.module('jot-app').directive('loginForm', function() { // Camel case .html file in partials
  return {
    restrict: 'E',
    templateUrl: '../../partials/login-form.html',
    controller: 'loginController', // Which Controller you're using
    controllerAs: 'loginCtrl' // How you want to name it
  };
});
