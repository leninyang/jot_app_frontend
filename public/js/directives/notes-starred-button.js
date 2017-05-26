angular.module('jot-app').directive('notesStarredButton', function() { // Camel case .html file in partials
  return {
    restrict: 'E',
    templateUrl: '../../partials/notes-starred-button.html',
    controller: 'notesController', // Which Controller you're using
    controllerAs: 'notesCtrl' // How you want to name it
  };
});
