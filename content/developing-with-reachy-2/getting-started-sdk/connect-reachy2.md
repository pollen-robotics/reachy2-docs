---
title: "Connect to Reachy 2"
description: "Establish a connection to the robot with the Python SDK"
lead: "Establish a connection to the robot with the Python SDK"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "Getting started with the SDK"
weight: 110
toc: true
---


The last required step before being able to use your Reachy 2 is to find its IP address. 

> Note: if you haven't connected Reachy to a network yet, please first follow the instructions ???

## Using the LCD screen

If you haven't unplugged it, the LCD screen connected in Reachy's back should be diplaying its IP address.

{{< img-center "images/sdk/getting-started/lcd-display.png" 400x "" >}}

If the LCD screen is not working or is unplugged, check out the page Find my IP section to learn other ways to get the IP address.


You can check that everything is working as expected by running the following Python code:

```python
from reachy_sdk import ReachySDK

# Replace with the actual IP you've found.
reachy = ReachySDK(host='the.reachy.ip.found.')
```
