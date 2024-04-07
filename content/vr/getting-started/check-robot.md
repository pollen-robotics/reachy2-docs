---
title: "Check robot is ready"
description: ""
lead: "Prepare your robot for teleoperation"
date: 2023-08-21T16:00:11+02:00
lastmod: 2023-08-21T16:00:11+02:00
type: docs
draft: false
images: []
toc: true
---

## Little checks before start

> When starting the robot, the services required for teleoperation are **automatically launched**.  

### SR camera must be unplugged

Make sure the **SR camera is unplugged**: it could cause troubles to launch the teleop cameras service.

{{< img-center "images/vr/getting-started/unplugged-sr.png" 400x "" >}}

### Have you done anything since the last boot?

In the following cases:
- you have just unplugged the SR camera, without rebooting the robot
- you have used the Python SDK during your session with the robot

Then disconnect all running clients (if you used the Python SDK), and **restart the webrtc service** from the dashboard.  

{{< img-center "images/vr/getting-started/restart-webrtc.png" 600x "" >}}

> A reboot of the robot will also work.