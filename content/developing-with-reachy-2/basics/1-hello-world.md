---
title: "1. Hello World"
description: "Basic connection to the robot with the Python SDK"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "SDK basics"
weight: 200
toc: true
---


## Be ready to move

### 1. Connect to the robot

If you followed the instructions from ["Connect to Reachy 2"]({{< ref "developing-with-reachy-2/getting-started-sdk/" >}}), you know how to get Reachy's IP address and how to connect to the robot in a Python interface with the command  : 

*(type `python` first in your terminal)*

``` python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='10.0.0.201')  # Replace with the actual IP
```

<details>
<summary>Check the connection </summary>

You can check the connection with your robot with:
```python
reachy.is_connected()
>>> True
```

If the connection has been lost, and the problem has been resolved, you can reconnect to the robot with the `connect()` method:
```python
reachy.connect()
```

</details>


### 2. Turn on / turn off motors


#### The whole robot

When starting, your robot is in compliant mode, which means you can move its parts by manipulating manually the robot. In this mode, the robot won't respond to any command you send to it.

At each use, you will have to turn on your robot's motors doing:
```python
reachy.turn_on()
```

At the end of your session or program, switch off the motors to send them back to compliant mode doing: 
```python
reachy.turn_off()
```

This will act on all parts of your robot, including the mobile base.  

> Turning off can be a bit brutal, especially if the arms are raised. You can use `reachy.turn_off_smoothly()` for torques to gradually decrease. 

#### Robot parts

If you want to turn on or off a single part, access directly the relevant part and turn it on or off, for example for the left arm:

```python
reachy.l_arm.turn_on()
reachy.l_arm.turn_off()
```

All parts are detailed below in [ReachySDK attributes]({{< ref "developing-with-reachy-2/basics/1-hello-world#attributes" >}}).  

At any time, you can check the state of your robot using the `is_on()` or `is_off()` method. Note that it will return True only if **all parts** are in the requested state. This means both methods can return False if the right arm is on but not the left one for example.

```python
# Turn on all parts
reachy.turn_on()
# Check robot state
reachy.is_on()
>>> True
reachy.is_off()
>>> False

# Turn off only the left arm
reachy.l_arm.turn_off()
# Check robot state
reachy.is_on()  # reachy is not on, as left arm is off
>>> False
reachy.is_off()  # but reachy is not fully off neither
>>> False
# Check parts state
reachy.r_arm.is_on()  # right arm is still on
>>> True
reachy.l_arm.is_off()  # left arm is off
>>> True
```

### 3. Start from a standard posture (optional)

2 standard postures are accessible and can be called easily to setup your starting position:
- the **default** pose, with both arms outstretched on either side of the body (be careful that your robot is at a sufficient height so that the arms do not touch the mobile base)
- the **elbow_90** pose, with the arms bent at 90°

To start at the zero position, use the `goto_posture()` function:
```python
reachy.goto_posture('default')
```

By default, this movement is made in 2 seconds. You can choose to specify a custom duration. For example, to reach the elbow_90 posture in 5 seconds:
```python
reachy.goto_posture('elbow_90', duration=5)
```


## ReachySDK object

The *reachy* object instanciated from the ReachySDK class above is the root access to get all incoming information from Reachy 2 (joints or cameras) and to control each part of the robot (left/right arm, head, mobile base).  

The *reachy* object has 7 attributes and numerous methods which you can find in the documentation. [LIEN] 

If you want to have an overview, you can browse the basic attributes and methods below. 

{{< img-center "images/sdk/first-moves/reachy_attributes.png" 400x "" >}}

<details>
<summary><b>Reachy's attributes </b></summary>

The *reachy* detailed attributes give access to info, parts and sensors of the robot.

#### List of attributes

[reachy.info]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyinfo" >}})  
[reachy.mobile_base]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachymobile_base" >}})  
[reachy.joints]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyjoints" >}})  
[reachy.head]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyhead" >}}) 
[reachy.l_arm]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyl_arm" >}})  
[reachy.r_arm]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyr_arm" >}}) 
[reachy.cameras]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachycameras" >}})  
 
#### reachy.info

[Camera object](https://pollen-robotics.github.io/reachy-sdk/api/camera.html). It is used to recover the last image captured by the right camera and also to control the motorized zoom attached to the camera.

```python
reachy.right_camera
>>> <Camera side="right" resolution=(720, 1280, 3)>
```


#### reachy.mobile_base

[Arm object](https://pollen-robotics.github.io/reachy-sdk/api/arm.html) containing every joint in the right arm along with its kinematics methods.

```python
reachy.r_arm
>>> <Arm side="right" joints=<Holder
	<Joint name="r_shoulder_pitch" pos="29.65" mode="compliant">
	<Joint name="r_shoulder_roll" pos="-0.94" mode="compliant">
	<Joint name="r_arm_yaw" pos="-7.60" mode="compliant">
	<Joint name="r_elbow_pitch" pos="-71.78" mode="compliant">
	<Joint name="r_forearm_yaw" pos="-0.73" mode="compliant">
	<Joint name="r_wrist_pitch" pos="-43.03" mode="compliant">
	<Joint name="r_wrist_roll" pos="-37.10" mode="compliant">
	<Joint name="r_wrist_yaw" pos="19.50" mode="compliant">
>>
```

#### reachy.joints

[Joint object](https://pollen-robotics.github.io/reachy-sdk/api/joint.html) containing every joint of the robot, from its arms to its head. This is useful when you want to get information, like the position, from all joints at once.

```python
reachy.joints
>>> <Holder
	<Joint name="l_shoulder_pitch" pos="-0.86" mode="compliant">
	<Joint name="l_shoulder_roll" pos="-0.38" mode="compliant">
	<Joint name="l_arm_yaw" pos="-81.45" mode="compliant">
	<Joint name="l_elbow_pitch" pos="-51.38" mode="compliant">
	<Joint name="l_forearm_yaw" pos="-16.28" mode="compliant">
	<Joint name="l_wrist_pitch" pos="-41.10" mode="compliant">
	<Joint name="l_wrist_roll" pos="-21.26" mode="compliant">
	<Joint name="l_gripper" pos="-3.08" mode="compliant">
	<Joint name="r_shoulder_pitch" pos="29.65" mode="compliant">
	<Joint name="r_shoulder_roll" pos="-0.94" mode="compliant">
	<Joint name="r_arm_yaw" pos="-7.60" mode="compliant">
	<Joint name="r_elbow_pitch" pos="-71.78" mode="compliant">
	<Joint name="r_forearm_yaw" pos="-0.73" mode="compliant">
	<Joint name="r_wrist_pitch" pos="-43.03" mode="compliant">
	<Joint name="r_wrist_roll" pos="-37.10" mode="compliant">
	<Joint name="r_gripper" pos="19.50" mode="compliant">
	<Joint name="neck_roll" pos="-21.58" mode="compliant">
	<Joint name="neck_pitch" pos="-79.71" mode="compliant">
	<Joint name="neck_yaw" pos="-59.27" mode="compliant">
>
```

#### reachy.head

[Head object](https://pollen-robotics.github.io/reachy-sdk/api/head.html).
Contains the three joints composing the Orbita actuator along with methods for its kinematics or to control it.

```python
reachy.head
>>> <Head joints=<Holder
	<Joint name="neck_roll" pos="0.00" mode="compliant">
	<Joint name="neck_pitch" pos="0.00" mode="compliant">
	<Joint name="neck_yaw" pos="0.00" mode="compliant">
>>
```

#### reachy.l_arm

[Arm object](https://pollen-robotics.github.io/reachy-sdk/api/arm.html) containing every joint in the left arm along with its kinematics methods.

```python
reachy.l_arm
>>> <Arm side="left" joints=<Holder
	<Joint name="l_shoulder_pitch" pos="-0.86" mode="compliant">
	<Joint name="l_shoulder_roll" pos="-0.38" mode="compliant">
	<Joint name="l_arm_yaw" pos="-81.45" mode="compliant">
	<Joint name="l_elbow_pitch" pos="-51.38" mode="compliant">
	<Joint name="l_forearm_yaw" pos="-16.28" mode="compliant">
	<Joint name="l_wrist_pitch" pos="-41.10" mode="compliant">
	<Joint name="l_wrist_roll" pos="-21.26" mode="compliant">
	<Joint name="l_gripper" pos="-3.08" mode="compliant">
>>
```


#### reachy.r_arm

[Arm object](https://pollen-robotics.github.io/reachy-sdk/api/arm.html) containing every joint in the right arm along with its kinematics methods.

```python
reachy.r_arm
>>> <Arm side="right" joints=<Holder
	<Joint name="r_shoulder_pitch" pos="29.65" mode="compliant">
	<Joint name="r_shoulder_roll" pos="-0.94" mode="compliant">
	<Joint name="r_arm_yaw" pos="-7.60" mode="compliant">
	<Joint name="r_elbow_pitch" pos="-71.78" mode="compliant">
	<Joint name="r_forearm_yaw" pos="-0.73" mode="compliant">
	<Joint name="r_wrist_pitch" pos="-43.03" mode="compliant">
	<Joint name="r_wrist_roll" pos="-37.10" mode="compliant">
	<Joint name="r_gripper" pos="19.50" mode="compliant">
>>
```

#### reachy.cameras

[Camera object](https://pollen-robotics.github.io/reachy-sdk/api/camera.html) containing both cameras of Reachy (teleop and torso one).

```python
reachy.cameras
>>> <Camera side="left" resolution=(720, 1280, 3)>
```

</details>

<details>
<summary><b>Reachy's basic methods</b></summary>

The *reachy* object has several methods, 8 of them being basic methods useful to start using the robot. The other methods are related to robot movements, and will be detailed in a more advanced section.

#### List of basic methods

[reachy.connect()]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyconnect" >}})  
[reachy.disconnect()]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachydisconnect" >}})  
[reachy.is_connected()]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyis_connected" >}})    
[reachy.turn_on()]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyturn_on" >}})
[reachy.turn_off()]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyturn_off" >}})  
[reachy.turn_off_smoothly()]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyturn_off" >}})  
[reachy.is_on()]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyis_on" >}})  
[reachy.is_off()]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyis_off" >}})

[reachy.goto_posture()]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyset_pose" >}})  


#### reachy.connect()

#### reachy.disconnect()

#### reachy.is_connected()

#### reachy.is_off()

#### reachy.is_on()

#### reachy.turn_on()

Method to turn on the whole robot. Turning on the robot means putting all the parts of the robot in stiff mode, including the mobile base if there is one. See next section for more information on what the stiff mode is for a motor.

```python
reachy.turn_on()
```
#### reachy.turn_off()

Method to turn off the whole robot. Turning off the robot means putting all parts of the robot in compliant mode, including the mobile base if there is one. See next section for more information on what the compliant mode is for a motor.

```python
reachy.turn_off()
```

#### reachy.goto_posture()

</details>