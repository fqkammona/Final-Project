const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const Twilio = require("twilio");
const admin = require("firebase-admin");

admin.initializeApp();

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = new Twilio(accountSid, authToken);

exports.sendTextMessage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    // Ensure the user is authenticated
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")) {
      console.error(
          "No Firebase ID token was passed.");
      return res.status(403).send("Unauthorized");
    }

    const idToken = req.headers.authorization.split("Bearer ")[1];
    try {
      const decodedIdToken = await admin.auth().verifyIdToken(idToken);
      const userId = decodedIdToken.uid;

      // Fetch the user's phone number from Firestore
      const userRef = admin.firestore().doc(`users/${userId}`);
      const doc = await userRef.get();
      if (!doc.exists) {
        return res.status(404).send("User not found");
      }

      const user = doc.data();
      const phoneNumber = user.phoneNumber;

      const from = "+18446076496"; // Your Twilio number
      const text = req.body.text; // Text to send

      client.messages.create({
        to: phoneNumber,
        from: from,
        body: text,
      }).then((message) => {
        console.log(message.sid);
        return res.status(200).send({success: true,
          sid: message.sid});
      }).catch((error) => {
        console.error("Failed to send SMS:", error);
        return res.status(500).send("Failed to send SMS");
      });
    } catch (error) {
      console.error("Error verifying Firebase ID token:", error);
      return res.status(403).send("Unauthorized");
    }
  });
});
