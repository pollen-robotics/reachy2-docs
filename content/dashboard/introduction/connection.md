---
title: "Connection"
description: ""
lead: ""
date: 2023-07-25T16:34:00+02:00
lastmod: 2023-07-25T16:34:00+02:00
draft: false
images: []
type: docs
toc: true
weight: "20"
---

## 1. Find Reachy 2's IP address

After you connected the robot to the network, it should have an IP address. The LCD screen connected in Reachy's back should be diplaying its IP address.

{{< img-center "images/vr/getting-started/lcd-display.png" 400x "" >}}

If the LCD screen is not working or is unplugged, check out the page [Find my IP section]({{< ref "help/system/find-my-ip" >}}) to learn other ways to get the IP address.
> Note the LCD screen will not work if you plug it after having turned on the computer.

## 2. Connect from the navigator

From your computer, on the same network, open a navigator and go to:  
**`http://<IP.address>:8000/`** 

> For example, if the screen indicates `192.168.1.42`, connect to `http://192.168.1.42:8000/` 

You should arrive on a services page:

{{< img-center "images/docs/getting-started/dashboard.png" 600x "dashboard" >}}