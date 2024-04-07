---
title: "Arm specifications"
description: "Reachy's 2023 arm specifications: material used for pieces, power consumption, dimensions, weight, payload, degrees of freedom."
lead: "Reachy 2023 arm specifications."
date: 2023-07-26T08:06:36+02:00
lastmod: 2023-07-26T08:06:36+02:00
draft: false
images: []
type: docs
menu:
  advanced:
    parent: "specifications"
weight: 210
toc: true
---

**Construction:** 3D printed MJF Painted- 3 axial needle roller bearings  
**Power consumption:** 51W  
**Dimensions:** 662x88x73mm  

## Weight repartition 
Overall Arm: 1670g  
Shoulder: 240g  
Upper arm: 610g  
Forearm: 590g  
Gripper: 230g  

**Maximum payload: 500g**   
*(this may vary depending on the holding and duration configuration)*

{{< img-center "images/advanced/specifications/right-arm-scheme.png" 600x "Reachy's right arm schematic" >}}

## Degrees of freedom
Reachy's arm offers 7 degrees of movement + 1 for the gripper

|Right arm|   |   |   |Left arm|   |   |
|-------|-------------|----------|-------|-------|-------------|----------|
| **Motor name** | **Angle limits** | **Motor ID** |   | **Motor name** | **Angle limits** | **Motor ID** |
|shoulder_pitch|-150, 90|10| |shoulder_pitch|-150, 90|20|
|shoulder_roll|-180, 10|11| |shoulder_roll|-10, 180|21|
|arm_yaw|-90, 90|12| |arm_yaw|-90, 90|22|
|elbow_pitch|-125, 0|13| |elbow_pitch|-125, 0|23|
|forearm_yaw|-100, 100|14| |forearm_yaw|-100, 100|24|
|wrist_pitch|-45, 45|15| |wrist_pitch|-45, 45|25|
|wrist_roll|-55, 35|16| |wrist_roll|-35, 55|26|
|gripper|-50, 25|17| |gripper|-25, 50|27|

| Motors|
|---------|
|3 Dynamixel MX-106T|
|1 Dynamixel MX-64AT|
|4 Dynamixel MX-28AT|


## Fans  
3 fans (shoulder, elbow and wrist)
