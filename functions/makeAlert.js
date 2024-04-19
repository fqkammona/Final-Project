const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.checkForAlerts = functions.firestore
    .document('frames/{frameId}')
    .onCreate(async (snap, context) => {
        // Access the frame data from the newly created document
        const frameData = snap.data();

        // Get the current time to compare against scheduled event times
        const currentTime = new Date();

        try {
            // Query the scheduled_events collection for events that match the criteria
            const eventsRef = admin.firestore().collection('scheduled_events');
            const querySnapshot = await eventsRef
                .where('personId', '==', frameData.personId)  // Assuming frameData contains personId
                .where('startTime', '<=', currentTime)
                .where('endTime', '>=', currentTime)
                .get();

            // Check if there are any matching scheduled events
            if (!querySnapshot.empty) {
                const alertsRef = admin.firestore().collection('alerts');
                
                // Create an alert for each matching scheduled event
                querySnapshot.forEach(doc => {
                    const eventData = doc.data();
                    alertsRef.add({
                        frameId: context.params.frameId,
                        eventId: doc.id,
                        detectedAt: frameData.timestamp, // Assuming frameData contains a timestamp
                        eventType: eventData.eventType,
                        message: `Alert: ${eventData.eventType} detected for ${frameData.personId}`
                    });
                });

                console.log('Alerts created for matching events.');
            } else {
                console.log('No matching scheduled events found.');
            }
        } catch (error) {
            console.error('Error processing frame data:', error);
            throw new functions.https.HttpsError('unknown', 'Failed to process frame data', error);
        }
    });
