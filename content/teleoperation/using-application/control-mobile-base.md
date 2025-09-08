---
title: "Control the mobile base"
description: "Use the mobile base in teleoperation"
lead: "Use the mobile base in teleoperation"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  teleoperation:
    parent: "Using Reachy2Teleoperation application"
weight: 320
toc: true
---

The mobile base is controlled by the joysticks on each controller: 
- **Left controller:** translation (forward-backward / left-right)
- **Right controller:** rotation (clockwise / counter-clockwise)

A message will appear if an obstacle is detected by the lidar: if you approach it slightly, the mobile base will slow down, and if you reach the maximum limit distance, the mobile base will stop.

If you wish to change the safety distances, please refer to the [section on the mobile base]({{< ref "/developing-with-reachy-2/basics/6-use-mobile-base/#Lidar" >}}) in the Client SDK.