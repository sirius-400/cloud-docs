---
sidebar_position: 1
---

# Firestore Scheduler

This functions is the one that we use for automating backup and get raw data from Firestore to be processed by ML in AI Platform.

## Index File

Create `index.js` and write these code,

```js title="index.js"
const Firestore = require("@google-cloud/firestore");
const {CloudStorage} = require("@google-cloud/storage");
const BUCKET_NAME = "your-bucket-name";     // Your Bucket Name
const PROJECTID = "your-bucket-name";       // Your Project ID
const COLLECTION_NAME = "collection-name";  // Your Collection Name
const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});
const storage = new CloudStorage();
exports.firestoreBackupFunctions = async (context) => {
  const unixTimestamp = Date.now();
  const snapshot = await
  firestore
      .collection(COLLECTION_NAME).get();

  const testDatas = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    testDatas.push({id, ...data});
  });
  console.log(testDatas);
  const bucket = storage.bucket(BUCKET_NAME);
  const destination = `${directory}${fileName}`;
};
```

## Package file

This is my `package.json` file used to build this functions

```json title=package.json
{
  "name": "functions",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "lint": "eslint ."
  },
  "main": "index.js",
  "dependencies": {
    "@google-cloud/firestore": "4.12.2",
    "@google-cloud/functions-framework": "^1.8.0",
    "@google-cloud/storage": "^5.8.5",
    "semver": "^5.5.1"
  }
}
```
