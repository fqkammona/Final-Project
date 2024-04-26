const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize the Firebase Admin SDK if it hasn't been initialized yet
if (!admin.apps.length) {
  admin.initializeApp();
}

exports.matchMetadataWithEvents = functions.firestore
    .document("testing/{metadataId}")
    .onCreate(async (snapshot, context) => {
    // Get the newly added metadata
      const metadata = snapshot.data();

      // Parse the metadata timestamp and create the time window
      const metadataTimestamp = new Date(metadata.timestamp);
      const endTimeWindow = new
      Date(metadataTimestamp.getTime() +
      9 * 60000); // 9 minutes after the metadata timestamp

      // Convert times to Firestore timestamps
      const metadataTimestampFirestore =
      admin.firestore.Timestamp.fromDate(metadataTimestamp);
      const endTimeWindowFirestore =
      admin.firestore.Timestamp.fromDate(endTimeWindow);

      // Retrieve all events across all users within the time window and compare
      let matchFound = false;
      const usersRef = admin.firestore().collection("users");
      const usersSnapshot = await usersRef.get();

      for (const userDoc of usersSnapshot.docs) {
        const eventsRef = userDoc.ref.collection("events");
        const eventsSnapshot = await eventsRef
            .where("timestamp", ">=", metadataTimestampFirestore)
            .where("timestamp", "<=", endTimeWindowFirestore)
            .get();

        // let matchFound = false;
        eventsSnapshot.forEach((eventDoc) => {
          const event = eventDoc.data();
          if (arraysIntersect(event.recognizedObjects, metadata.objects) &&
            (!metadata.faces || arraysIntersect(event.faces, metadata.faces))) {
            console.log(`Yes, match found for User ID: ${userDoc.id} 
            with Event ID: ${eventDoc.id}`);
            matchFound = true;
          // Here you can handle the match as needed
          }
        });
      }

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
  return arr1 && arr2 && arr1.some((item) => arr2.includes(item));
}

