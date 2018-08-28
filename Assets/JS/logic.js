$(document).ready(function() {
var config = {
    apiKey: "AIzaSyBuF6Kz4eJRfZiMq1Dh2DDjZTupTB-htW4",
    authDomain: "fsfproject-d2a39.firebaseapp.com",
    databaseURL: "https://fsfproject-d2a39.firebaseio.com",
    projectId: "fsfproject-d2a39",
    storageBucket: "fsfproject-d2a39.appspot.com",
    messagingSenderId: "819348342946"
  };

  
  firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    var name = "";
    var dst = "";
    var frq = "";
    var ttime = 0;

    $("#add-train").on("click", function(event) {
     event.preventDefault();
  
        // Grabbed values from text boxes
        name = $("#name-input").val().trim();
        dst = $("#dst-input").val().trim();
        frq = $("#frq-input").val().trim();
        ttime = $("#ttime-input").val().trim();
  

        // Code for handling the push
        database.ref('trains/').push({
          name: name,
          dst: dst,
          frq: frq,
          ttime: ttime,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      });
      database.ref('trains/').on("child_added", function(childSnapshot) {
      
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().dst);
        console.log(childSnapshot.val().frq);
        console.log(childSnapshot.val().ttime);
        var cDate = moment();
        console.log(cDate.day());
        var ttime = moment(cDate.format('YYYY-MM-DD') + ' '+childSnapshot.val().ttime);
        console.log(ttime);
        var tMinutes = ttime.diff(cDate,'minutes');
        var bRate = parseInt(tMinutes) + parseInt(childSnapshot.val().frq);
        
        // full list of items to the well
        $("#full-train-list").append("<tr><td> " + childSnapshot.val().name +
          " </td><td> " + childSnapshot.val().dst +
          " </td><td> " + childSnapshot.val().frq +
          " </td><td> " + childSnapshot.val().ttime + 
          " </td><td> " + bRate +"</td></tr>");
              
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
      
    })