import { peerSocket } from "messaging";
import { geolocation } from "geolocation";
import { Accelerometer } from "accelerometer";
import { HeartRateSensor } from "heart-rate";
import { me as device } from "device";
import { battery,charger} from "power";
import { me as appbit } from "appbit";



/// This function will send the data collected from the sensors to Companion APP
// --------------------------------------------------
function sendMessageToCompanion(message) {
  if (peerSocket.readyState === peerSocket.OPEN) {
    console.log("Sending message to companion: " + JSON.stringify(message));
    peerSocket.send(JSON.stringify(message));
  } else {
    console.log("Error while sending message to companion: Connection is not open");
  }
}
// --------------------------------------------------
// APPLICATION STATUS
// --------------------------------------------------
console.log("App Started");
while (peerSocket.readyState !== peerSocket.OPEN) {
}
let appStatus = {topic:'application',data:"started"};
sendMessageToCompanion(appStatus);
if (appbit.appTimeoutEnabled) {
 console.log("Timeout is enabled");
}
appbit.appTimeoutEnabled = false; // Disable timeout
/// On unload application status
appbit.onunload = function() {
  console.log("App Unloaded");
  let appStatus = {topic:'application',data: "stopped" };
  sendMessageToCompanion(appStatus);
}

// --------------------------------------------------
// GEOLOCATION SENSOR CODE
// --------------------------------------------------

let watchID = geolocation.watchPosition(locationSuccess, locationError, { timeout: 60 * 1000 });

function locationSuccess(position) {
  setTimeout(() => {
        let location = {topic:"geolocation", data : { latitude: position.coords.latitude, longitude: position.coords.longitude }};
    sendMessageToCompanion(location);
  },3000);

}

function locationError(error) {
  console.log(" Location Error: " + error.code,
              "Message: " + error.message);
}
// --------------------------------------------------
// // ACCELEROMETER SENSOR CODE
// // --------------------------------------------------
if (Accelerometer) {
  const accelerometer = new Accelerometer({ frequency: 20 });
  accelerometer.addEventListener("reading", () => {
    let acceleration = {topic:'accelerometer', data: { x: accelerometer.x, y: accelerometer.y, z: accelerometer.z } };
    sendMessageToCompanion(acceleration);
  });
  accelerometer.start();
} else {
  console.log("This device does NOT have an Accelerometer!");
}
// --------------------------------------------------
// // LAST SYNC TIME CODE
// // --------------------------------------------------
let lastSyncTime = { topic:"sync",data: device.lastSyncTime };
sendMessageToCompanion(lastSyncTime)
// // HEART RATE SENSOR CODE
// // --------------------------------------------------
if (HeartRateSensor) {
  const heartRateSensor = new HeartRateSensor();
  heartRateSensor.addEventListener("reading", () => {
    let heartRate = { topic:'heartRate', data: heartRateSensor.heartRate };
    setTimeout(()=> { 
          sendMessageToCompanion(heartRate);

    },10000);
  });
  heartRateSensor.start();
} else {
  console.log("This device does NOT have a HeartRateSensor!");
}

// BATTERY LEVEL CODE
// --------------------------------------------------
battery.onchange = function() {
  console.log(`Battery level: ${Math.floor(battery.chargeLevel)}%`);
  let batteryLevel = {topic:'battery',data:Math.floor(battery.chargeLevel)};
 
  sendMessageToCompanion(batteryLevel);
}

// CHARGE STATUS CODE
// --------------------------------------------------
charger.onchange = function() {
  console.log("The charger " + (charger.connected ? "is" : "is not") + " connected");
  let charge = {topic:'charger', data: charger.connected };
  sendMessageToCompanion(charge);
}
// --------------------------------------------------


