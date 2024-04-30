const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize the Firebase Admin SDK if it hasn't been initialized yet
if (!admin.apps.length) {
  admin.initializeApp();
}

exports.onMetadataCreate = functions.firestore
    .document("users/{userId}/events/{eventId}") //
    .onCreate(async (snapshot, context) => {
    // Listen to 'testing' from (scheduledTime --- scheduledTime + 5-minutes)

      // 1. Get the newly added metadata
      const metadata = snapshot.data(); // Will contain user form
      console.log("Received metadata:", metadata);

      // 2. Get timestamp from user form
      // Parse the metadata timestamp and create the time window
      const metadataTimestamp = metadata.timestamp.toDate();
      const endTimeWindow =
    new Date(metadataTimestamp.getTime() +
     5 * 60000); // endTime

      //

      // 3.  Convert times to Firestore timestamps
      const metadataTimestampFirestore =
    admin.firestore.Timestamp.fromDate(metadataTimestamp);
      const endTimeWindowFirestore =
    admin.firestore.Timestamp.fromDate(endTimeWindow);

      console.log("Firestore start timestamp: " + metadataTimestampFirestore);
      console.log("Firestore end time stamp: " + endTimeWindowFirestore);


      // 4. Retrieve all 'testing' detection events between start-stop time
      let matchFound = false;
      const testRef = admin.firestore().collection("testing");
/*
      try {
        // Fetch the 10 most recent documents based on the 'timestamp' field
        const recentSnapshot = await testRef
            .orderBy("timestamp", "desc")
        // Order by timestamp in descending order
            .limit(10) // Limit to the newest 10 entries
            .get();

        // Check if the snapshot is empty
        if (recentSnapshot.empty) {
          console.log("No recent documents found.");
        } else {
          console.log("Newest 10 timestamps:");
          recentSnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(`${doc.id}: ${data.timestamp.toDate()}`);
          });
        }
      } catch (error) {
        console.error("Failed to retrieve recent documents:", error);
      }
*/

      const testSnapshot = await testRef
          .where("timestamp", ">=", metadataTimestampFirestore)
          .where("timestamp", "<=", endTimeWindowFirestore)
          .get();


      console.log("testSnapshot is: " + JSON.stringify(testSnapshot));

      // Looping through each detection found in timeframe in 'testing'
      testSnapshot.forEach((detectDoc) => {
        const observedMetadata = detectDoc.data();
        console.log("Oberserving metadata at: " + observedMetadata.timestamp);

        // comparing the user form objects/people to detect with the
        // detected people/objects in 'testing'

        // Confirming if observed objects are what the user is looking for
        // let people = false;
        // let objects = false;

        if (arraysIntersect(metadata.recognizedObjects,
            observedMetadata.objects)) {
          matchFound = true;
          // objects = true;
          console.log("Detected objects requested");
        }

        if (arraysIntersect(metadata.recognizedObjects,
            observedMetadata.faces)) {
          matchFound = true;
          // people = true;
          console.log("Detected people requested");
        }
      });


      if (matchFound) {
        console.log("A match was found, performing subsequent actions...");
      // Add additional logic to handle the case when a match is found
      } else {
        console.log("No matches were found.");
      // Handle the case when no matches are found
      }
    });


// Helper function to check if two arrays have any common elements
/**
 * Checks if two arrays have any common elements.
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @return {boolean} True if the arrays intersect, false otherwise.
 */
function arraysIntersect(arr1, arr2) {
  console.log("(event.faces): " + arr1 + "\n(metadata.faces): " + arr2);
  return arr1 && arr2 && arr1.some((item) => arr2.includes(item));
}
