---
sidebar_position: 1
---

# Overview

This page will cover an overview of the cloud computing side of our **capstone project**.

## Application Architecture

This is our Application Architecture,

![app architecture](/img/overview.png)

As you can see, we mainly use GCP to handle our backend. We have 2 cloud functions, 1 is for backup and retrive places data to be processed by ML model, the other one is for serving the model output in JSON format to Android App. We also use Cloud Storage mainly for storing our data. Lastly, we create monitoring dashboard to monitor cloud resources, including the cloud functions, AI Platform, and API Usage.

### Cloud Functions Documentation

For the first functions visit [this link](Cloud%20Functions/firestoreScheduler), for the second one visit [this link](Cloud%20Functions/models)

### Cloud Firestore Documentation
