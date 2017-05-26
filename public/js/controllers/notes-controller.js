angular.module('jot-app').controller('notesController', ['$http', '$scope',
function($http, $scope) {

  var self = this;
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
      // console.log('all notes', response);
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
          starred: this.formData.starred = false,
          archived: this.formData.archived = false,
          user_id: $scope.currentUser.id
        }
      }
    }).then(function(response) {
      console.log('New note: ', response);
      this.formData = {};
      this.getNotes();
    }.bind(this));
  };

  //==================================
  //        Notes Update
  //==================================
  this.updateNote = function(note) {
    $http({
      method: 'PATCH',
      url: $scope.url + 'notes/' + note.id,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data: {
        note: {
          title: note.title,
          content: note.content
        }
      }
    }).then(function(response) {
      console.log('Edited note: ', note);

    }.bind(this));
  };

  //==================================
  //        Notes Delete
  //==================================
  this.deleteNote = function(note){
    $http({
     method: 'DELETE',
     url: $scope.url + 'notes/' + note.id,
     headers: {
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
     }
    }).then(function(response){
     console.log("Deleted: ", response);
     this.getNotes();
    }.bind(this));
  };
  //==================================
  //        Starred
  //==================================
  this.starNote = function(note) {
    // console.log('what is being passed', note);
    if (note.starred === false) {
      note.starred = true
    } else if (note.starred === true) {
      note.starred = false
    }

    $http({
      method: 'PATCH',
      url: $scope.url + 'notes/' + note.id,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data: {
        note: {
          starred: note.starred
        }
      }
    }).then(function(response) {
      // console.log('Edited note: ', note);
      console.log('starred status: ', note.starred);
    }.bind(this));
  }

}]); //End notesController
