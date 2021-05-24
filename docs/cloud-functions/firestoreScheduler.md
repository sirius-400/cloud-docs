---
sidebar_position: 1
---

# Firestore Scheduler

This functions is the one that we use for automating backup and get raw data from Firestore to be processed by ML in AI Platform.

## Index File

Create `index.js` and write these code,

```js title="index.js"
const Firestore = require("@google-cloud/firestore");
const {Storage} = require("@google-cloud/storage");
const BUCKET_NAME = "your-bucket-name";     // Your Bucket Name
const PROJECTID = "your-bucket-name";       // Your Project ID
const COLLECTION_NAME = "collection-name";  // Your Collection Name
const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});
const storage = new Storage();
const converter = require("json-2-csv");
const fs = require("fs");

exports.firestoreBackupFunctions = async (context) => {
  const unixTimestamp = Date.now();
  const jsonPath = "/tmp/input.json";
  const csvPath = "/tmp/input.csv";

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

  fs.writeFileSync(jsonPath, JSON.stringify(testDatas));
  
  const bucket = storage.bucket(BUCKET_NAME);
  const destination = 'test.json';
  
  try {
    // Uploads a local file to the bucket
    await bucket.upload(jsonPath, {
      destination: destination,
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=3600",
      },
    });

    console.log(`${jsonPath} uploaded to /${destination}.`);
  } catch (e) {
    throw new Error("uploadLocalFileToStorage failed: " + e);
  }
};

async function uploadLocalFileToStorage() {

  try {
    // Uploads a local file to the bucket
    await bucket.upload(jsonPath, {
      destination: destination,
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=3600",
      },
    });

    console.log(`${jsonPath} uploaded to /${destination}.`);
  } catch (e) {
    throw new Error("uploadLocalFileToStorage failed: " + e);
  }
}
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
    "json-2-csv": "^3.14.0",
    "semver": "^5.5.1"
  },
  "devDependencies": {
    "babel-eslint": "^10.1.0",
    "eslint": "^7.6.0",
    "eslint-config-google": "^0.14.0"
  }
}
```

## ESLint Config

Enable ESLint to lint your javascript code

```js title=.eslintrc.js
module.exports = {
  "root": true,
  "env": {
    es6: true,
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "google",
  ],
  "rules": {
    quotes: ["error", "double"],
  },
  "parser": "babel-eslint",
};
```

## Create .gcloudignore file

Create this file to ignore what file to be uploaded.

```text
# This file specifies files that are *not* uploaded to Google Cloud Platform
# using gcloud. It follows the same syntax as .gitignore, with the addition of
# "#!include" directives (which insert the entries of the given .gitignore-style
# file at that point).
#
# For more information, run:
#   $ gcloud topic gcloudignore
#
.gcloudignore
# If you would like to upload your .git directory, .gitignore file or files
# from your .gitignore file, remove the corresponding line
# below:
.git
.gitignore
apackage.json
index_bak.js
node_modules/

#!include:.gitignore
```

## Create .gitignore file

Create this file to ignore what file to be uploaded.

```text
node_modules/
*.log
```
