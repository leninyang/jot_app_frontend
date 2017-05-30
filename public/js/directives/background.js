angular.module('jot-app').directive('background', function() { // Camel case .html file in partials
  return {
    restrict: 'E',
    templateUrl: '../../partials/background.html',
    controller: 'loginController', // Which Controller you're using
    controllerAs: 'loginCtrl' // How you want to name it
  };
});
