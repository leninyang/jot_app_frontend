angular.module('jot-app').directive('notesCreateForm', function() { // Camel case .html file in partials
  return {
    restrict: 'E',
    templateUrl: '../../partials/notes-create-form.html',
    controller: 'notesController', // Which Controller you're using
    controllerAs: 'notesCtrl' // How you want to name it
  };
});
