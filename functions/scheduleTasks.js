const {CloudTasksClient} = require("@google-cloud/tasks");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const client = new CloudTasksClient();

exports.scheduleListeningTask = functions.firestore
    .document("users/{userId}/events/{eventId}")
    .onCreate(async (snapshot, context) => {
      const eventData = snapshot.data();
      const startTime =
      eventData.timestamp.toDate(); // Timestamp for the event start
      // write endTime as 3 minutes after starts
      const endTime = startTime.getTime() + 
      3 * 60000;
      const project = "girl-c0ded";
      const queue = "trigger-listening-function";
      const location =
      "us-central1"; // Queue location must match the function location
      const url = `https://${location}-${project}.cloudfunctions.net/startListeningFunction`;
      console.log("Scheduled task URL:", url);


      const payload =
      JSON.stringify({userId: context.params.userId,
        eventId: context.params.eventId});

      const parent = client.queuePath(project, location, queue);
      const task = {
        httpRequest: {
          httpMethod: "POST",
          url,
          headers: {
            "Content-Type": "application/json",
          },
          body: Buffer.from(payload).toString("base64"),
        },
        scheduleTime: {
          seconds: Math.round(endTime.getTime() / 1000),
        },
      };

      await client.createTask({parent, task});
      console.log("Task scheduled: " + JSON.stringify(task));
    });
