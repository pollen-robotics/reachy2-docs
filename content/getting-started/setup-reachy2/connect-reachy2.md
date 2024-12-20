---
title: "Connect Reachy"
description: "First connection to the robot and first moves"
lead: "Make your first connection to the robot to make it move!"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  getting-started:
    parent: "Setup Reachy 2"
weight: 230
toc: true
---

## A) Check your network

Ensure your computer is on the same network as Reachy’s, preferably via a wired connection.

{{< img-center "images/getting-started/setup-reachy2/connect-reachy2/Reachy2-getting-started-4-A_check-network.png" 500x "Check network" >}}


## B) Connect to the dashboard

Check the name of your robot at its back and type it followed with **.local:8000** in your web browser.  

> Example: for a robot called `reachy2-pvt00`, type **`reachy2-pvt00.local:8000`** in your web browser

You can also connect to the dashboard via Reachy’s IP address.  
Connect the LCD screen provided to the USB port on the mobile base (this must be done before starting the robot). Reachy’s IP address will appear.  
Open a tab in your web browser and enter Reachy's IP adress followed with **:8000**.  

> Example: for a robot with IP `192.168.0.100`, type **`192.168.0.100:8000`** in your web browser

**Click on “Reachy awake” to confirm that Reachy is well set-up.**

{{< alert icon="🔴" text="While operating the robot, always <b>keep the emergency button within reach</b> and press it immediately if any issue occurs (e.g. collisions)." >}}


---

After unpacking Reachy be sure to **book your kick-off meeting** with one of our engineer at [support@pollen-robotics.com](mailto:support@pollen-robotics.com). 

*This meeting usely lasts one hour but can be extended depending on your needs. During this meeting, we will review together the whole functionalities of Reachy and its infinite capabilities.*