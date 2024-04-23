---
title: "Connect to the dashboard"
description: ""
lead: ""
date: 2023-08-09T14:43:48+02:00
lastmod: 2023-08-09T14:43:48+02:00
draft: false
images: []
toc: true
weight: "50"
---
The dashboard is here to give you an overview of the robot's state (what services are running, is there an error on a motor,...) and give you the possibility to access quickly some features (changing a robot's part compliance for example).

This tool has been thought to help you **start easier with the robot** and **facilitate quick debugging**.

## 1. Find Reachy 2's IP address

The LCD screen connected in Reachy's back should be diplaying its IP address.

{{< img-center "images/vr/getting-started/lcd-display.png" 400x "" >}}

If the LCD screen is not working or is unplugged, check out the page [Find my IP section]({{< ref "help/system/find-my-ip" >}}) to learn other ways to get the IP address.

> Note the LCD screen will not work if you plug it after having turned on the computer.

## 2. Connect from the navigator

From your computer, on the same network, open a navigator and go to:  
**`http://<IP.address>:8000/`** 

> For example, if the screen indicates `192.168.1.42`, connect to `http://192.168.1.42:8000/` 

You should arrive on a services page:

{{< img-center "images/docs/getting-started/dashboard.png" 600x "dashboard" >}}

Usage of the dashboard is detailed in the next sections.
