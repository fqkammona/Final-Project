
const {onRequest} = require("firebase-functions/v2/https");

// Import the Cloud Function from the scheduleTasks module
const {scheduleListeningTask} = require("./scheduleTasks");
// Export the Cloud Function from scheduleTasks.js
exports.scheduleListeningTask = scheduleListeningTask;

const {handleMetadata} = require("./handleMetadata");
exports.handleMetadata = handleMetadata;

const {processFileUpload} = require("./ProcessFileUpload")
exports.processFileUpload = processFileUpload;
/*
// Define and export the startListeningFunction
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
*/
