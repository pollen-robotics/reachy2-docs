---
title: "SDK Overview"
description: "Understand the structure of the SDK."
lead: ""
date: 2023-07-25T18:49:56+02:00
lastmod: 2023-07-25T18:49:56+02:00
draft: false
images: []
type: docs
toc: true
---

## Understand the SDK structure

### Reachy

### Parts


### Actuators

Reachy's arm offers 7 degrees of freedom. It also gives access to one joint for the gripper.  
The **arm** is divided as follow:
- **shoulder**, composed of 2 joints (pitch and roll)
- **elbow**, composed of 2 joints (yaw and pitch)
- **wrist**, composed of 3 joints (roll, pitch and yaw)

We refer to the shoulder, elbow and wrist as **actuators**.  
For some actions, such as changing the compliance, is the the lowest level of control you will have.

### Joints

Each degree of freedom of Reachy is referred to as a **joint**. Joints are the lowest level of control you can have.  
The Orbita2D (used as shoulders and elbows in Reachy 2) offer the control of 2 joints, while Orbita3D (used as wrists and neck) offer the control of 3 joints.  
A joint is an angle you can control the position of in order to make movements with Reachy. For each joint, you can read a present position and write a goal position. Those position are given in degrees.  

```python
reachy.r_arm.elbow.pitch.present_position
>>> 0.0

reachy.r_arm.elbow.pitch.goal_position = -90
```

### Cameras

You have 2 different cameras type on Reachy:
- the **teleop** cameras, which are the cameras in Reachy's head. They are mobile cameras which can move the head and with stereovision, that are used for the teleoperation.
- the **SR** cameras, which are the short-range cameras on Reachy's torso. They are fix cameras, with an accessible dpeth map, mainly useful for manipulation tasks.

You can access those cameras doing:

```python
reachy.cameras.teleop
>>>

reachy.cameras.SR
>>>
```
{{< alert icon="👉" text="The teleop cameras are shared between the Teleoperation service and the SDK server, and can only be used by one of them at once. <b>Make sure you enabled the access to the teleop cameras for the SDK server</b> before trying to use them through the Python SDK." >}}
