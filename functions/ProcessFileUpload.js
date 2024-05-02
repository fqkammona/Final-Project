const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

exports.processFileUpload = async (message, context) => {
  const {data} = message;
  const fileData = JSON.parse(Buffer.from(data, 'base64').toString());
  const bucketName = fileData.bucket;
  const fileName = fileData.name;

  console.log(`New file uploaded: ${bucketName}/${fileName}`);

  const file = storage.bucket(bucketName).file(fileName);

  try {
    const [metadata] = await file.getMetadata();

    // Construct a URL that allows access to the file
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2500'  // Far future date to effectively make it not expire
    });

    // Store metadata along with custom metadata in Firestore
    const videoData = {
      name: fileName,
      url: url,
      uploaded: Firestore.Timestamp.now(),
      objects: metadata.metadata?.objects || 'None',  // Assuming 'objects' is the key for custom metadata
      otherData: metadata.metadata?.otherData || 'None'  // Any other custom metadata
    };

    await firestore.collection('videos').add(videoData);

    console.log(`File metadata stored for ${fileName}`);
  } catch (err) {
    console.error('Error processing file:', err);
  }
};

