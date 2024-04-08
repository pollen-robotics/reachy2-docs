---
title: "Connect to the dashboard"
description: ""
lead: ""
date: 2023-08-09T14:43:48+02:00
lastmod: 2023-08-09T14:43:48+02:00
draft: false
images: []
toc: true
weight: "40"
---
The dashboard is here to give you an overview of the robot's state (what services are running, is there an error on a motor,...) and give you the possibility to access quickly some features (changing a robot's part compliance for example).

This tool has been thought to help you **start easier with the robot** and **facilitate quick debugging**.

## 1. Find Reachy 2's IP address

After you connected the robot to the network, it should have an IP address. You can find it on the LCD screen if you haven't unplugged it yet. 

In case the screen does not display the IP address, follow the instructions of [Find Reachy 2's IP]({{< ref "help/system/find-my-ip" >}}).

> Note the LCD screen will not work if you plug it after having turned on the computer.

## 2. Connect from the navigator

From your computer, on the same network, open a navigator and go to:  
**`http://<IP.address>:8000/`** 

> For example, if the screen indicates `192.168.1.42`, connect to `http://192.168.1.42:8000/` 

You should arrive on a services page:

{{< img-center "images/docs/getting-started/dashboard.png" 600x "dashboard" >}}