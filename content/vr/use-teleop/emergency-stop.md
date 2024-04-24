---
title: "Emergency stop"
description: "Stop immediately sending commands to the robot"
lead: "Stop immediately sending commands to the robot"
date: 2023-07-26T09:01:49+02:00
lastmod: 2023-07-26T09:01:49+02:00
draft: false
images: []
type: docs
toc: true
weight: "140"
---

In case you feel like something unexpected is happening with the robot while you are teleoperating it in VR, you can stop immediately teleoperation rather than using the standard exit menu, which requires to wait for a few seconds.  

> The VR application emergency stop does not replace the physical emergency stop button of the robot.

While pressing either:
- (A) + right index trigger + right middle finger trigger  
*or*
- (X) + left index trigger + left middle finger trigger  
you will activate the VR emergency stop.  
{{< img "images/vr/use-teleop/meta-quest-emergency-stop.png" 400x "Meta Quest controller emergency stop">}}

The teleoperation application will immediately **stop sending commands** to the robot, **reduce the torque** values of the arms for a few seconds, then turn the robot **compliant**.

{{< img "images/vr/use-teleop/emergency-stop.png" 600x "Help panel in VR transition room">}}  </br>

You will remain in the teleoperation view until you press (A) as usually to go back to the transition room.