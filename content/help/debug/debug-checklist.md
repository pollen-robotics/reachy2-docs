---
title : "Quick debug checklist"
description: "Debug"
lead: "Easy steps to debug yourself common issues"
date: 2023-07-26T08:44:51+02:00
lastmod: 2023-07-26T08:44:51+02:00
draft: false
images: []
type: docs
menu:
  help:
    parent: "Debug"
toc: true
weight: 100
seo:
  title: "Debug checklist"
  description: "Quickly recover Reachy 2: press emergency stop, adjust arms/head, raise button, restart reachy2-core and webrtc services via dashboard."
---


## Fast recovering

The simpliest way to recover from an error (for example an arm not responding anymore) is to **power cycle the motors and restart the services**.  

This fast recovery procedure may cover 80% of unexpected behavior.   

To do so:
1. Suspend your current use of the robot
2. Press the emergency stop button
3. Make sure to put the arms and head in a suitable position before restarting the motors
4. Press and turn clockwise the emergency stop button to raise it
5. Go to the dashboard and click on *Restart* for `reachy2-core` then `webrtc`

