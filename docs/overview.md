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

For the first functions visit [this link](cloud-functions/firestoreScheduler), for the second one visit [this link](cloud-functions/models)

### Cloud Firestore

We use Firestore for our database to store user data and place data. We create auto backup using Cloud Functions to backup place data everyday so that it can be used for retraining our models.

### Enabled API for Google Maps Platform

We use several API in Google Maps Platform for our projects,

1. Maps SDK for Android
2. Direction API
3. Places API

Other API used are Google Cloud API mainly for handling compute resource (Compute API, App Engine API), AI Platform Notebook (Notebook API), and Storage (Cloud Storage API).

### AI Platform Setup Documentation

Visit [this link](cloud-monitoring)

### Cloud Monitoring Documentation

Visit [this link](cloud-monitoring)