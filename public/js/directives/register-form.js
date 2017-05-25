angular.module('jot-app').directive('registerForm', function() { // Camel case .html file in partials
  return {
    restrict: 'E',
    templateUrl: '../../partials/register-form.html',
    controller: 'loginController', // Which Controller you're using
    controllerAs: 'loginCtrl' // How you want to name it
  };
});
