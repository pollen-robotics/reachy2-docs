---
title: "General specifications"
description: "General specifications of Reachy 2"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  hardware-guide:
    parent: "Specifications"
weight: 100
toc: true
---

## Computer
One computer to run Reachy 2’s stack:

- [Solidrun Bedrock v3000](https://www.solid-run.com/industrial-computers/bedrock-v3000-basic/)
- CPU computer (as opposed to GPU/TPU used for AI needs)
- Fanless industrial PC
    
  {{< img-center "images/hardware-guide/specifications/general/bedrock_image.png" 600x "Bedrock v3000 computer" >}}    

Note: For AI needs, processing will be done via customer’s own computers at this stage

## Key features

- 2x 7 DoF Arms made of parallel joints (2x 2DoF & 1x 3DoF)
- 1x 3 DoF Neck (1x 3DoF)
- 1x Omnidirectional mobile base (+Lidar)
- Manual adjustment of robot height
- Internal cable routing through joints
- Modular design (right arm strictly identical to left arm)
- High reachability

## **Architecture**

Reachy 7 DoF arm is made of 2x Orbita 2D actuators for Shoulder & Elbow, and 1x Orbita 3D actuator for wrist. Reachy neck is made of 1x Orbita 3D too.

  {{< img-center "images/hardware-guide/specifications/general/image_actuators.png" 600x "Actuators localisation" >}}

### General dimensions

  {{< img-center "images/hardware-guide/specifications/general/robot_dimension.png" 600x "Robot dimensions" >}}

  {{< img-center "images/hardware-guide/specifications/general/arm_dimension.png" 600x "Arm dimensions" >}}

  {{< img-center "images/hardware-guide/specifications/general/head_dimension.png" 500x "Head dimensions" >}}

  {{< img-center "images/hardware-guide/specifications/general/mb_dimension.png" 500x "Mobile base dimensions" >}}


### Joints localisation

The robot's origin is defined by the intersection of the shoulder line and the vertical line passing through the center of the neck joint. Relative to this (virtual) origin, the centers of the shoulder and neck joints can be precisely located by applying these distances:

  {{< img-center "images/hardware-guide/specifications/general/joints_localisation_1.png" 600x "Joints localisation" >}}


#### Shoulders 

Based on robot’s origin: **-15° Roll and 10° Yaw**
    
  {{< img-center "images/hardware-guide/specifications/general/joints_localisation_2.png" 400x "Joints localisation" >}}
    
#### Neck 

Based on robot’s origin: **10° Pitch**
    
  {{< img-center "images/hardware-guide/specifications/general/joints_localisation_3.png" 200x "Joints localisation" >}}

