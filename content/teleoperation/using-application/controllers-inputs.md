---
title: "Controllers inputs"
description: "Mapping between controllers and teleoperation features"
lead: "Mapping between controllers and teleoperation features"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  teleoperation:
    parent: "Using Reachy2Teleoperation application"
weight: 330
toc: true
---

> A reminder of the controller inputs mapping is available in the **help** section of the *transition room* in the VR teleoperation application:  
{{< img "images/vr/use-teleop/help-panel.png" 600x "Help panel in VR transition room">}}


## Meta Quest

### Standard inputs

{{< img "images/vr/use-teleop/meta-quest-mapping.png" 600x "Meta Quest controller mapping">}}

|Input|Feature description |
|----|--------------------|
|**A**|**At robot teleoperation start:** Start robot teleoperation|
|       |**During teleoperation:** Return to menu|
|**B**|**During teleoperation:** Mobile base boost|
|**X**|**When leaving teleoperation (A pressed):** Lock robot position|
|**Left Thumbstick**|**During teleoperation:** Control mobile base translation|
|**Right Thumbstick**|**During teleoperation:** Control mobile base rotation|
|**Left Index Trigger**|**In menu:** Select button|
|                      |**During teleoperation:** Control left gripper|
|**Right Index Trigger**|**In menu:** Select button|
|                       |**During teleoperation:** Control right gripper|
|**Left Controller position / orientation**|**During teleoperation:** Reachy's left arm end effector position / orientation|
|**Right Controller position / orientation**|**During teleoperation:** Reachy's right arm end effector position / orientation|
|**Headset orientation**|**During teleoperation:** Reachy's head orientation|

### Emergency stop combination

{{< img "images/vr/use-teleop/meta-quest-emergency-stop.png" 600x "Meta Quest controller emergency stop">}}

|Input|Feature description |
|----|--------------------|
|**A + right index trigger + right middle finger trigger**|**During teleoperation:** Emergency stop|
|**X + left index trigger + left middle finger trigger**|**During teleoperation:** Emergency stop|
