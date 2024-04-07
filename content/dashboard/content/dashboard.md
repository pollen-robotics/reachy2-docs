---
title: "Reachy control"
description: "Monitor Reachy from Reachy control dashboard page. Send compliance and goal positions commands, and read errors."
lead: "Reachy quick monitoring through the dashboard"
date: 2023-07-25T15:46:33+02:00
lastmod: 2023-07-25T15:46:33+02:00
draft: false
images: []
type: docs
toc: true
---

The Reachy Control page is a monitoring page where you can both:
- read **errors** from the robot
- send high level commands, such as goal positions and compliance.

{{< img-center "images/dashboard/content/control.png" 600x "Control tab" >}}

<p align="center">
  <img src="control.png" alt="control tab" width="100%"/>
</p>

Try to turn on or off parts of the robot, or the whole robot.

You can also send commands to make the part moves. Give joints goal positions, express ** in degrees** in Reachy 2 coordinate system.  

> Have a look to the [Arms kinematics page]({{< ref "sdk/first-moves/kinematics" >}}) to know the sign of the angles to send to the joints. 

Enter the value you want to send, then click **Go to** to reach the position.
