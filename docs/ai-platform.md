---
sidebar_position: 3
---

# AI Platform Setup

![AI Platform overview](/img/ai-platform/overview.png)

This page will cover the setup of our AI Platform.

## Create New Notebook

On the Cloud Console, click on AI Platform and select Notebook. Create new Notebook with the specification you need, in our case we use AI Platform with Tensorflow Enterprise version 2.5.

![create new notebook](/img/ai-platform/001.png)

## Allow ML Team to Access the Resources

By default, AI Platform only allows Project Editor to access the Notebook. However, we can use AI Platform service account to our custom service account and add other user to act as our customed service account to access the resource. This is also allign with the principle of least privilege that only allows user to access the required previledges.

First go to IAM and Service Account tab, create new service account (we named it customSA). Add new access (grant access) and add the role "AI Platform Notebook Service Agent" to our customSA.

![add ai platform sa](/img/ai-platform/002.png)
