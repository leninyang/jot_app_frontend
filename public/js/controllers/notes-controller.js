angular.module('jot-app').controller('notesController', ['$http', '$scope',
function($http, $scope) {

  // scope variable holding notes
  this.allNotes = [];

  // scope variable holding the forms data
  this.formData = {};

  //==================================
  //        Notes Index
  //==================================
  this.getNotes = function() {
    $http({
      method: 'GET',
      url: $scope.url + 'notes',
    }).then(function(response) {
      console.log('all notes', response);
      this.allNotes = response.data;
    }.bind(this));
  };
  this.getNotes();

  //==================================
  //        Notes Create
  //==================================
  this.createNote = function() {
    $http({
      method: 'POST',
      url: $scope.url + 'notes',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data: {
        note: {
          title: this.formData.title,
          content: this.formData.content,
        }
      }
    }).then(function(response) {
      console.log('New note: ', response);
      this.formData = {};
    }.bind(this));
  };



}]); //End notesController
