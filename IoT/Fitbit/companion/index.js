import { peerSocket } from "messaging";
import calendars from "calendars";

console.log("Companion Running ");

// GET TEST FROM COMPANION CODE
// --------------------------------------------------
// const host = "https://cat-fact.herokuapp.com/facts";
// fetch(host, {
//   method : "GET",
//   headers : myHeaders}) // Build the request
// .then(function(response){
//   return response.json();}) //Extract JSON from the response
// .then(function(data) {             
//   console.log("Got response from server:", JSON.stringify(data));}) // Send it to the watch as a JSON string
// .catch(function(error) {
//   console.log(error);}); // Log any errors with Fetch


let firebaseTestURL = "https://wimp-project-63c97-default-rtdb.firebaseio.com";
/// ------------------------ You change you firabase url here ------------------------------------------////
let firebaseEndpoint = ""
///  --------------------------------------------------------------------------------------------------////


function sendMessageToExpress(topic,data){
  let firebaseTestURL = `${firebaseEndpoint}/${topic}.json`;
  fetch(firebaseTestURL , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        console.log("Response from server: " + response.status);
        console.log("Response details : " + JSON.stringify(response));
        return response.json();
      })
      .then(data => {
        console.log("Response from server: " + JSON.stringify(data));
      })
      .catch(error => {
        console.log("Error from server: " + error);
      });
}

/// On message received from the device application
peerSocket.addEventListener("message", (evt) => {
  let currentData = JSON.parse(evt.data);
  sendMessageToExpress(currentData.topic, currentData.data);
});