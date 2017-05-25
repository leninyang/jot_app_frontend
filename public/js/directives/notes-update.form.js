angular.module('jot-app').directive('notesUpdateForm', function() { // Camel case .html file in partials
  return {
    restrict: 'E',
    templateUrl: '../../partials/notes-update-form.html',
    controller: 'notesController', // Which Controller you're using
    controllerAs: 'notesCtrl' // How you want to name it
  };
});
