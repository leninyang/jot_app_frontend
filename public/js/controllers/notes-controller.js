angular.module('jot-app').controller('notesController', ['$http', '$scope',
function($http, $scope) {

  // -------------------
  //  GRABING ELEMENTS
  // -------------------
  var $openCreateBtn = $('#openCreateModal');
  // Grabbing login modal element
  var $createModal = $('#createModal');
  // Grabbing close button
  var $closeCreateBtn = $('.closeCreate');


  // -------------------
  //   EVENT HANDLERS
  // -------------------
  // Event handler to open the modal
  var openCreateModal = function(){
    $createModal.css('display', 'block');
  }
  var closeCreateModal = function(){
    $createModal.css('display', 'none');
  }
  // -------------------
  //   EVENT LISTENERS
  // -------------------
  //Add event listener to Login Button
  $openCreateBtn.on('click', openCreateModal);
  //Add event listener to Close button
  $closeCreateBtn.on('click', closeCreateModal);


  // scope variable holding notes

  this.notesArray = [];
  this.arrayArchivedNotes = [];
  this.displayedNotes = [];
  this.singleNote = [];
  this.filteredArrayByID = [];

  // scope variable holding the forms data
  this.formData = {};

  var self = this;


  //==================================
  //        Show All Notes
  //==================================

  // function getNotes() {
  self.getNotes = function() {
    $http({
      method: 'GET',
      url: $scope.url + 'notes',
    }).then(function(response) {;
      this.notesArray = response.data

      // SHOWS ONLY THE NOTES WITH VALUE OF ARCHIVED FALSE
      this.arrayArchivedNotes = this.notesArray.filter(function(note) {
        return note.archived === false;
      });

      // SHOWS NOTES FILTERD BY CURRENTUSER ID
      this.filteredArrayByID = this.arrayArchivedNotes.filter(function(note) {
        return note.user_id === $scope.currentUser.id;
      });

      // IF USER IS LOGGED IN, SHOW NOTES FILTERED BY CURRENUSER.ID
      if ($scope.loggedInUser === true) {
        this.displayedNotes = this.filteredArrayByID
        console.log('Showing notes of current user.');
      } else {
        console.log("Can't show notes, you're not logged in.");
      }
    }.bind(this));
  };
  self.getNotes();


  // =====================
  //       LISTENER | $emit, $broadcast and $on
  // =====================

  // Listens for event from parent controller (Main Controller)
  $scope.$on('newLogin', function() {
    self.getNotes()
  });


  //==================================
  //        Shows Individual Notes
  //==================================

  // this.showOneNote = function(noteID) {
  //   $http({
  //     method: 'GET',
  //     url: $scope.url + 'notes/' + noteID,
  //   }).then(function(response){
  //     console.log('individual note', response.data);
  //     this.singleNote = response.data;
  //   }.bind(this));
  // };


  //==================================
  //        Show All Notes
  //==================================
  this.showAllNotes = function() {
    self.getNotes();
  };

  //==================================
  //        Show Archived Notes
  //==================================
  this.showArchivedNotes = function() {
    console.log(this.notesArray);
    this.displayedNotes =
     this.notesArray.filter(function(note) {
      return note.archived === true && note.user_id === $scope.currentUser.id;

    });
  };

  //==================================
  //        Show Starred Notes
  //==================================
  this.showStarredNotes = function() {
    console.log(this.notesArray);
    this.displayedNotes = this.notesArray.filter(function(note) {
      return note.starred === true && note.user_id === $scope.currentUser.id;
    });
  }

  //==================================
  //       Create Note
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
      self.getNotes();
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
      self.getNotes();
    }.bind(this));
  };

  //==================================
  //        Starred
  //==================================
  this.starNote = function(note) {
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
      self.getNotes();
    }.bind(this));
  };

  //==================================
  //        Archived
  //==================================
  this.archiveNote = function(note) {
    // When clicked, checks for value and assigns the opposite
    if (note.archived === false) {
      note.archived = true
    } else if (note.archived === true) {
      note.archived = false
    }
    $http({
      method: 'PATCH',
      url: $scope.url + 'notes/' + note.id,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data: {
        note: {
          archived: note.archived
        }
      }
    }).then(function(response) {
      console.log('Edited note: ', note);
      console.log('archived status: ', note.archived);
      self.getNotes();
    }.bind(this));
  };






}]); //End notesController
