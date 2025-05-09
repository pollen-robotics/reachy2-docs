---
title: "Connect to Reachy 2"
description: "Establish connection with the robot from the VR teleoperation application"
lead: "Establish connection with the robot from the VR teleoperation application"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  teleoperation:
    parent: "Getting started with teleoperation"
weight: 210
toc: true
seo:
  title: " Connect Reachy 2 Teleoperation App to Your Robot"
  description: "Learn how to connect the Reachy 2 teleoperation app to your robot. Follow our step-by-step guide for a seamless connection process."
---

## 1. Find Reachy 2 IP

In many cases, you will be able to use the name of the robot to connect.  
Find your robot name in its back, below its neck.  


If your network setup is configured so it does not work with the local name, you can get its exact IP by connecting to the dashboard, in the Network section.  


Can't find the IP? Use the LCD screen to get information.

## 2. Check your VR setup is ready

- First check your PC is connected to the **same network as the robot**.
- Connect your VR device to your PC and make sure it is ready to be used. Depending on your headset, the menus you should get in when ready for use is different. Check your headset section for more information on how to start correctly.
{{<toggle-list title="Meta headsets (Quest 2, Quest 3 and Rift)" text="Follow the steps of the section <a href=\"https://www.meta.com/en-gb/help/quest/articles/headsets-and-accessories/oculus-link/connect-with-air-link/\"><b>Setup Link</b> from the official Meta website</a>. <br /> You should then enter a white menu. When you are in, your VR device is ready.">}}
{{<toggle-list title="HTC Vive" text="<i>Coming soon</i>">}}
{{<toggle-list title="Valve Index" text="<i>Coming soon</i>">}}


## 3. Launch the application

Once everything is ready, you can launch the application.  

Run *Reachy2Teleoperation* from your computer.


## 4. Connect to the robot

Create a new robot entry in the menu with the IP address you previously found.  
The IP can either be:
- the robot name followed by **.local**.<br />For example, if your robot name was **reachy2-beta0**, enter "**reachy2-beta0.local**".
- the real robot IP, as written in the Network section of the dashboard.

> Note that you must select the input fields with your VR beam and fill them in using your computer keyboard.  

Once the robot is created, select it and click on "**Connect**".  
You should then arrive in the *transition room* of the application.  

A message to allow the network access to the app may pop up, in this case **allow access**:

{{< img-center "images/vr/getting-started/allow-access.png" 400x "" >}}

Make sure the connection is fine by checking the information displayed at the top of the mirror.  
You must see:
- a green text telling you "Connected to Reachy"
- the view of the robot displayed in miniature
- a good network connection indication

{{< img-center "images/vr/getting-started/mirror-scene.png" 600x "" >}}
