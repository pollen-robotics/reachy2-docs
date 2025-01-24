---
title: "Grippers specifications"
description: "Grippers specifications of Reachy 2"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  hardware-guide:
    parent: "Specifications"
weight: 140
toc: true
---

## Key features
- Parallel distal phalanx movement
- Removable/Interchangeable tips *(Default tip : hybrid hard tip with rubber-like covering)*
- [Dynamixel XM430-W210-R actuator](https://emanual.robotis.com/docs/en/dxl/x/xm430-w210/)
- 100 mm wide open position
- 24V Power input → Converted to 12v by the embedded electronics
- Nominal Force : 10N
- Peak Force : 50N
- Current-based position control : Adjustable force limitation
- Weight: 400g


## General Dimensions

  {{< img-center "images/hardware-guide/specifications/grippers/grippers_dimensions.png" 300x "Grippers dimensions" >}}

Parallel distal phalanx movement means that in every position of the gripper, distal phalanxes remains parallel. 

  {{< img-center "images/hardware-guide/specifications/grippers/grippers_mechanism.png" 300x "Grippers mechanism" >}}

Maximum opening between the 2 distal phalanxes is 100mm. Maximum closing is when the 2 opposite distal phalanxes are in contact.

  {{< img-center "images/hardware-guide/specifications/grippers/grippers_opening.png" 300x "Grippers opening" >}}

## Fingers & tips

Fingers are specifically designed to allow gripping of various shape objects. The inside of proximal phalanx is covered with a rubber like material, and distal tip is directly do with a specific adhesive material

Tips are V-shaped in 2 directions to help with holding thin objects

  {{< img-center "images/hardware-guide/specifications/grippers/grippers_tips.png" 300x "Grippers tips" >}}

Example of easily graspable objects :

  {{< img-center "images/hardware-guide/specifications/grippers/grippers_graspable_objects.png" 600x "Grippers easily graspable objects examples" >}}

### Interchangeable Tip

The tips can be easily changed depending on customers’ needs. 

Size, shape and material can be changed to design new tips and fit them on each finger, thanks to a specific mechanical interface. 

  {{< img-center "images/hardware-guide/specifications/grippers/grippers_interchangeable_tip.png" 300x "Grippers Interchangeable Tip" >}}

Default Tip : hybrid hard tip with rubber-like covering

## Advanced

### Mechanism

Starting to the 0 position of the motor (0°), gripper is closed. Gripper full opening occurs when a 152° angle is applied to the motor.

  {{< img-center "images/hardware-guide/specifications/grippers/grippers_motors.png" 500x "Grippers mechanism" >}}

Note :

To ensure full closing of the gripper during manipulation, a negative angle is applied to the motor (up to -10°). This allows to hold very thin objects (sheet paper i.e) by producing small collisions between distal phalanxes. 

  {{< img-center "images/hardware-guide/specifications/grippers/grippers_closed.png" 400x "Closed Grippers" >}}


Motor rotation motion creates creates a  linear motion of the connecting rods. This will create a non-linear gear ratio depending on its position.

  {{< img-center "images/hardware-guide/specifications/grippers/opening_angle.png" 400x "Motor angle to opening percentage" >}}


### Mechanical interface with Orbita3D

  {{< img-center "images/hardware-guide/specifications/grippers/interface_to_orbita3D.png" 300x "Grippers interface with Orbita 3D" >}}

### Electronic interface

  {{< img-center "images/hardware-guide/specifications/grippers/grippers_electronic_interface.png" 500x "Grippers electronic interface" >}}