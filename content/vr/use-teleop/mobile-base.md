---
title: "Control the mobile base"
description: "Use the mobile in the VR teleoperation application"
lead: "How to use the mobile base in the VR teleoperation application"
date: 2023-07-26T09:01:49+02:00
lastmod: 2023-07-26T09:01:49+02:00
draft: false
images: []
type: docs
toc: true
weight: "110"
---

## Control the mobile base
Use the **thumbstick/trackpad** to control the mobile base!  
The **left controller controls the translation** of the mobile base, while the **right one controls the rotation**.  

**Is there any security to prevent collision with objects?**  

**Yes!** If you are too close to a wall or object, the LIDAR anti-collision safety unables the mobile base to go closer to the obstacle. The mobile base will therefore not move in this direction, but you can still go in other directions. You will get a warning message when the anti-collision safety is triggered.  
[More information on the anti-collision safety](https://docs.pollen-robotics.com/sdk/mobile-base/safety/)  

Nevertheless, this security is for the mobile base and won't prevent the robot's arms to collide with external objects, so be aware while teleoperating the robot.  

*Please note very small objects won't be detected by the LIDAR sensor.*

**What is the forward direction of Reachy?**  

The forward direction is aligned with the **forward direction of the mobile base**, meaning that giving a forward instruction to the robot will always lead the robot to go physically forward, no matter the direction you are looking to.   

Check the actual direction of your commands using the **indicator** at the bottom: the white arrow shows you the direction command relative to your actual head orientation. If your head is correctly aligned with the mobile base forward direction, this arrow will point forward if giving a forward command with your left controller.  
{{< img "images/vr/use-teleop/straight_forward.png" 600x "Forward direction looking straight">}}
{{< img "images/vr/use-teleop/head_on_side_forward.png" 600x "Forward direction looking on the left">}}   

In the above images, the same forward command is sent from the left controller.   
On the first image, the user is looking straight (the black arrow is located in the target view), so the white mobility arrow is pointing front.   
On the second image, the user is looking on the left side (the target view is on the left of the black arrow), so the forward direction is pointing right, as it is the direction aligned with the mobile base forward direction.   

*Note that these images are only for example, mobility is not available on virtual Reachy.*
