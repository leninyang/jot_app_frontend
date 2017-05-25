angular.module('jot-app').directive('navBar', function() { // Camel case .html file in partials
  return {
    restrict: 'E',
    templateUrl: '../../partials/nav-bar.html',
    controller: 'loginController', // Which Controller you're using
    controllerAs: 'loginCtrl' // How you want to name it
  };
});
