---
sidebar_position: 2
---

# Models

![function overview](/img/models/overview.png)

This functions is the one that we use for serve model output retrived from cloud storage. This functions will respond to `GET` request and return a JSON of the model output.

## Index File

Create `index.js` and write these code,

```js title="index.js"
const {Storage} = require("@google-cloud/storage");
const BUCKET_NAME = "YOUR_BUCKET_NAME";
const storage = new Storage();
const fs = require("fs");

exports.models = async (request, response) => {
  if (request.method === "GET") {
   const filePath = "data/";
   const fileName = "output-latest.json";
   const bucket = storage
     .bucket(BUCKET_NAME);
   const source = `${filePath}${fileName}`;

   try {
   // Download file from the bucket
    await bucket.file(source).download({
     destination: "/tmp/output-latest.json",
     validation: "crc32c",
    });

    const content = fs.readFileSync("/tmp/output-latest.json");
    response.status(200).send(JSON.parse(content));
   } catch (e) {
    response.status(500).send("Error on request, please check log");
    console.log(e);
   }
  } else {
   return response.status(403).send("Forbidden!");
  }
 };
```

## Package file

This is my `package.json` file used to build this functions

```json title=package.json
{
  "name": "model",
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

```text title=.gitignore
node_modules/
*.log
```

## Deploy your functions

Deploy your functons on the cloud using `gcloud` command,

```bash
gcloud functions deploy models --trigger-http --runtinme=nodejs14 --region=asia-southeast2
```

> Thats it! Your functions are good to go!
