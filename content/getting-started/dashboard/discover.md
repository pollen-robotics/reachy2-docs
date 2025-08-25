---
title: "Discover the dashboard"
description: "Understand the dashboard features"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  getting-started:
    parent: "Dashboard"
weight: 400
toc: true
seo:
  title: "How to Find Reachy 2's IP Address and Access the Dashboard – Step-by-Step Guide"
  description: "Learn how to find Reachy 2's IP address and connect to the dashboard to manage the robot’s services. Step-by-step instructions for easy setup and network management."
---


## 1. Connect from the Navigator

From your computer, on the same network, open a browser and go to:  
**`http://<IP.address>:8000/`** or **`http://<robot.name>:8000/`** 

> If you need a reminder on how to get the IP or the name of your robot, go back to [Connect Reachy section]({{< ref "getting-started/setup-reachy2/connect-reachy2/#b-connect-to-the-dashboard" >}})

You should arrive on the **Robot Monitoring** section :

{{< img-center "images/docs/getting-started/dashboard.png" 600x "dashboard" >}}

The dashboard is designed to help you **start easier with the robot** and **facilitate quick debugging**.

It provides an overview of the robot's state and allows quick access to features (e.g., changing a robot's part compliance).

## 2. Features Overview

What does the dashboard provide?

* **Access the robot's state** - **Reachy control page**</br> 
Get robot's info, state of the joints, even send posture command. 


* **Access the services** - **Services page**</br> 
Stop or restart the robot's services, see robot logs.

* **Manage network connection** - **Network page**</br> 
Choose a WiFi network to connect the robot to and get the IP addresses.

* **Update robot software** - **Updates page**</br>
Get the latest software versions of the robot, and choose the services you want to update.

* **Visualize robot state** - **Visualization tools page**</br> 
Get RViz visualization or display live data from ROS topics with Foxglove.

* **Get images and control audio features** - **Media page**
Get torso and head camera frames and manage the volume of input and output. 



On each page, the **serial number** of your robot is also displayed.

More information is available for each page in the content section.
