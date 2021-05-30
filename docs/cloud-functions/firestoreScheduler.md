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

  fs.writeFileSync(jsonPath, JSON.stringify(testDatas));
  const inputFile = JSON.parse(fs.readFileSync(jsonPath));
  (async () => {
    try {
      const csv = await converter.json2csvAsync(inputFile);
      fs.writeFileSync(csvPath, csv);
      await uploadLocalFileToStorage(
          csvPath, "input-"+unixTimestamp+".csv");
      await uploadLocalFileToStorage(jsonPath, "backup.json");
    } catch (err) {
      console.error(err);
    }
  })();
};

/**
 * uploadCsvFile.
 * @param {string} filePath file path in local.
 * @param {string} fileName file name in cloud storage.
 * @param {string} dir cloud storage target directory 
 */
async function uploadLocalFileToStorage(filePath, fileName, dir="data/") {
  const directory = dir;

  const bucket = storage.bucket(BUCKET_NAME);
  const destination = `${directory}${fileName}`;

  try {
    // Uploads a local file to the bucket
    await bucket.upload(filePath, {
      destination: destination,
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=3600",
      },
    });

    console.log(`${fileName} uploaded to /${directory}${fileName}.`);
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

```text title=.gcloudignore
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

```text title=.gitignore
node_modules/
*.log
```

## Deploy your functions

You can deploy this functons on the cloud (gcp) using `gcloud` command.

### Create a New PubSub Topic

Go to the gcp console or using the `admin SDK`, create new PubSub topic named `firestoreScheduler` or whatever name you want.

```bash
gcloud pubsub topics create firestoreScheduler
```

### Create Subscription to PubSub Topic

Create a new subscription to the topic we created earlier.

```bash
gcloud pubsub subscripsions create scheduler-sub --topic firestoreScheduler
```

### Deploy Functions

Deploy the functions with `gcloud functions deploy` command.

```bash
gcloud functions deploy firestoreBackupFunctions --trigger-topic=firestoreScheduler --runtime=nodejs14 --region=asia-southeast2
```

### Create New Cloud Scheduler Job

After the deploying the functions, don't forget to create new Cloud Scheduler job.

![create new cloud scheduler](/img/firestoreScheduler/400-capstone-scheduler-001.png)

![first cloud scheduler config](/img/firestoreScheduler/400-capstone-scheduler-002.png)

![second cloud scheduler config](/img/firestoreScheduler/400-capstone-scheduler-003.png)

![third cloud scheduler config](/img/firestoreScheduler/400-capstone-scheduler-004.png)

> Thats it! Your functions are good to go for now.
