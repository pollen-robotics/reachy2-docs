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
seo:
  title: "Connecting to Reachy 2 – Network Setup and Dashboard Access"
  description: "Learn how to connect Reachy 2 to your local network and access its web-based dashboard using a hostname or IP address."
---

## A) Check your network

🌐 To communicate with Reachy 2, your computer and the robot must be **on the same network**. You can do this:
- via **Ethernet** (recommended for stability), or
- via **WiFi** (if both devices are on the same WiFi network).  

Ensure your computer is on the same network as Reachy’s, preferably via a wired connection.

{{< img-center "images/getting-started/setup-reachy2/connect-reachy2/Reachy2-getting-started-4-A_check-network.png" 500x "Check network" >}}

<br>

**⚠️ Important if using ethernet:**
Do not plug an Ethernet cable directly between your computer and the robot.
Instead, connect the robot’s Ethernet cable to your router or switch, so it becomes part of your local network—just like your computer.

## B) Connect to the dashboard

Check the name of your robot at its back of neck and type it followed with **.local:8000** in your web browser.  

> Example: for a robot called `r2-0000`, type **`http://r2-0000.local:8000/`** in your web browser

You can also connect to the dashboard via Reachy’s IP address.

To know it, you can use the LCD screen provided. For that, turn off your robot then connect the LCD screen to the USB port on the mobile base. Reachy’s IP addresses (WiFi and Ethernet) will appear.  

{{< img-center "/images/getting-started/setup-reachy2/connect-reachy2/lcd_screen.jpg" 300x "LCD screen plugged" >}}  

Open a tab in your web browser and enter Reachy's IP address followed with **:8000**.  

> Example: for a robot with IP `192.168.0.100`, type **`http://192.168.0.100:8000/`** in your web browser

**Click on “Reachy awake” to confirm that Reachy is well set-up.**

{{< alert icon="🔴" text="While operating the robot, always <b>keep the emergency button within reach</b> and press it immediately if any issue occurs (e.g. collisions)." >}}


---

After unpacking Reachy be sure to **book your kick-off meeting** with one of our engineer at [support@pollen-robotics.com](mailto:support@pollen-robotics.com). 

*This meeting usely lasts one hour but can be extended depending on your needs. During this meeting, we will review together the whole functionalities of Reachy and its infinite capabilities.*