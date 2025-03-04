---
title: "Connect to Reachy 2"
description: "Establish a connection to the robot with the Python SDK"
lead: "Establish a connection to the robot with the Python SDK"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
url: "/developing-with-reachy-2/getting-started-sdk/connect-reachy2/"
menu:
  developing-with-reachy-2:
    parent: "Getting started with the SDK"
weight: 110
toc: true
slug: "connect-reachy2"
url: "/developing-with-reachy-2/getting-started-sdk/connect-reachy2/"
---

<br>

To be able to connect to your Reachy 2, you first need to be on the same network (either via Ethernet or WiFi).

Then you need to find your robot's IP address. Unfortunately, you can't use its .local address for the SDK. You have two ways to do that : via the dashboard (the easiest way) or via the LCD screen. 

## Using the dashboard

You can use your robot name to access the dashboard : for that, you type on a browser `reachy_name.local:8000/`. 

Once you are in the dashboard, you can click on **Network** and you will find the IP addresses of your robot (WiFi and Ethernet). 


## Using the LCD screen

If you are not able to access the dashboard, you can turn off completely your robot. Then, you can plug the supplied LCD screen on the USB port of the mobile base.

Turn on your robot again, and it should display display the robot's IP addresses (alternately Ethernet and WiFi) : 

{{< img-center "images/sdk/getting-started/IP_address.jpg" 400x "" >}}


You can check that everything is working as expected by running the following Python code in a terminal on your virtual environment :

```
$ python3
from reachy2_sdk import ReachySDK

# Replace with the actual IP you've found.
reachy = ReachySDK(host='the.reachy.ip.found.')
```
