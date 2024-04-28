/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const {onRequest} = require("firebase-functions/v2/https");

// Import the Cloud Function from the scheduleTasks module
const {scheduleListeningTask} = require("./scheduleTasks");

// Export the Cloud Function from scheduleTasks.js
exports.scheduleListeningTask = scheduleListeningTask;

const {onMetadataCreate} = require("./handleMetadata");

exports.onMetadataCreate = onMetadataCreate;

// Define and export the startListeningFunction
// This function will be triggered by the Cloud Task
exports.startListeningFunction = onRequest((req, res) => {
  console.log("Received body:", req.body);
  console.log("Type of body:", typeof req.body);
  // req.body is an object!!!!! NOT a buffer
  try {
    const {userId, eventId} = req.body;
    console.log(`Function triggered for userId: 
    ${userId}, eventId: ${eventId}`);
    res.status(200).send("Function executed successfully");
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});


