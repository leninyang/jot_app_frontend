angular.module('jot-app').directive('signUpForm', function() { // Camel case .html file in partials
  return {
    restrict: 'E',
    templateUrl: '../../partials/sign-up-form.html',
    controller: 'loginController', // Which Controller you're using
    controllerAs: 'loginCtrl' // How you want to name it
  };
});
