---
title: "Teleoperation messages"
description: "Understand displayed information during teleoperation sessions"
lead: "Understand displayed information during teleoperation sessions"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  teleoperation:
    parent: "Using Reachy2Teleoperation application"
weight: 350
toc: true
---


During Reachy teleoperation, several messages can show up in front of view.  

**Warning messages**  

Some messages are just **warnings**, signaling you the quality of teleoperation may be altered or the current state of the robot may evolve into future errors (motors heating up or low battery). These messages are displayed on a **dark grey background**.  
When possible, please consider acting to prevent these warnings from becoming errors.

**Error messages**  

Other messages may signal **errors**, which will lead to a fast dysfunction of the teleoperation. These messages are to take into account quickly, as you may not be controlling the robot properly anymore when they appear. These messages are displayed on a **red background**.  

{{< warning icon="👉🏾" text="When error messages appear, <b>stop teleoperation</b> and act appropriately depending on the error type. " >}}
