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
---


## 1. Find Reachy 2's IP address

After you connected the robot to the network, it should have an IP address. The LCD screen connected in Reachy's back should be diplaying its IP address.

{{< img-center "images/vr/getting-started/lcd-display.png" 400x "" >}}

If the LCD screen is not working or is unplugged, check out the page Find my IP section to learn other ways to get the IP address.
> Note the LCD screen will not work if you plug it after having turned on the computer.

## 2. Connect from the navigator

From your computer, on the same network, open a navigator and go to:  
**`http://<IP.address>:8000/`** 

> For example, if the screen indicates `192.168.1.42`, connect to `http://192.168.1.42:8000/` 

You should arrive on a services page:

{{< img-center "images/docs/getting-started/dashboard.png" 600x "dashboard" >}}


This tool has been thought to help you **start easier with the robot** and **facilitate quick debugging**.

The dashboard is here to give you an overview of the robot's state as well as giving you the possiblity to access quickly some features (changing a robot's part compliance for example).

## Features Overview

What does the dashboard provide?

* **Access the services** - **Services page**</br> 
Stop or restart the robot's services, see robot logs *(coming soon)*.

* **Manage network connection** - **Network page**</br> 
Choose a wifi network to connect the robot to.

* **Update robot software** - **Updates page**</br>
Get the last software versions of the robot, and choose the services you want to update.

* **Visualize robot state** - **Visualization tools page**</br> 
Get RViz visualization or even display live data from ROS topics with Foxglove.

* **Send robot commands** - **Reachy control page**</br> 
*Coming soon*


On each page, the **serial number** of your robot is also displayed. 

More information is available for each page in the content section.