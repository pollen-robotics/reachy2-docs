---
title: "1. Start with Reachy 2"
description: "Quick overview of how to use the robot once connected."
lead: "What can you do once connected to Reachy 2?"
date: 2023-07-25T17:38:52+02:00
lastmod: 2023-07-25T17:38:52+02:00
draft: false
images: []
type: docs
toc: true
weight: "70"
---

## Enable teleop cameras for the SDK


### SR camera
The SR camera is unplugged by default.  
If you want to use it, plug the SR camera on the robot's computer remaining USB port (2).

{{< img-center "images/sdk/first-moves/plugged-sr.png" 400x "" >}}

> Make sure to unplug it if you want to use the teleoperation.

### Teleop cameras
The teleop cameras are shared between the teleop service and the SDK server, and can only be used by one at the same time.  
In order to be able to use the teleop cameras with the SDK:
1. Go to the dashboard
2. Stop [webrtc service in the services tab]({{< ref "/dashboard/content/services" >}})

{{< img-center "images/sdk/first-moves/stop-webrtc-service.png" 400x "" >}}

## Be ready to move

### 1. Connect to the robot

If you followed the instructions from ["Connect to Reachy 2"]({{< ref "sdk/getting-started/connect" >}}), you know how to get Reachy's IP address and how to connect to the robot with the command: 

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='192.168.0.42')  # Replace with the actual IP
```

### 2. Turn on motors

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
If you want to turn on or off a single part, access directly the relevant part and turn it on or off, for example for the left arm:

```python
reachy.l_arm.turn_on()
reachy.l_arm.turn_off()
```

All parts are detailed below in [ReachySDK attributes]({{< ref "sdk/first-moves/intro#attributes" >}}).  

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

### 3. Start from a standard position (optional)

2 standard positions are accessible and can be called easily to setup your starting position:
- the **zero** pose, with all joints set at 0 degree
- the **elbow_90** pose, with the elbow pitch set at -90 degrees and all other joints at 0 degree

To start at the zero position, use the `set_pose()` function:
```python
reachy.set_pose('zero')
```

By default, this movement is made in 2 seconds. You can choose to specify a custom duration. For example, to reach the elbow_90 pose in 5 seconds:
```python
reachy.set_pose('elbow_90', duration=5)
```

## Check connection

At any time, you can check the connection between your SDK and the robot is still open with:
```python
reachy.is_connected()
>>> True
```

If the connection has been lost, and the problem has been resolved, you can reconnect to the robot with the `connect()`method:
```python
reachy.connect()
```

{{< alert icon="💡" text="You cannot use this method to connect to another IP address. It will automatically reconnect to the initial instantiated robot." >}}

## ReachySDK object

The *reachy* object instanciated from the ReachySDK class above is the root access to get all incoming information from Reachy 2 (joints or cameras) and to control each part of the robot (left/right arm, head, mobile base).  

The *reachy* object has 7 attributes and ?? methods that we will quickly present here, more detailed information are given in the dedicated pages after this one. 

{{< alert icon="💡" text="Note that you can only instantiate one ReachySDK in a session." >}}

{{< img-center "images/sdk/first-moves/reachy_attributes.png" 400x "" >}}

### Attributes

The *reachy* attributes detailed give to access to info, parts and sensors of the robot.

#### List of attributes
[reachy.cameras]({{< ref "sdk/first-moves/intro#reachycameras" >}})  
[reachy.head]({{< ref "sdk/first-moves/intro#reachyhead" >}})  
[reachy.info]({{< ref "sdk/first-moves/intro#reachyinfo" >}})  
[reachy.joints]({{< ref "sdk/first-moves/intro#reachyjoints" >}})  
[reachy.l_arm]({{< ref "sdk/first-moves/intro#reachyl_arm" >}})  
[reachy.mobile_base]({{< ref "sdk/first-moves/intro#reachymobile_base" >}})  
[reachy.r_arm]({{< ref "sdk/first-moves/intro#reachyr_arm" >}})  

#### reachy.cameras

[Camera object](https://pollen-robotics.github.io/reachy-sdk/api/camera.html). It is used to recover the last image captured by the left camera and also to control the motorized zoom attached to the camera.

```python
reachy.left_camera
>>> <Camera side="left" resolution=(720, 1280, 3)>
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
	<Joint name="l_antenna" pos="0.00" mode="compliant">
	<Joint name="r_antenna" pos="0.00" mode="compliant">
>>
```

#### reachy.info

[Camera object](https://pollen-robotics.github.io/reachy-sdk/api/camera.html). It is used to recover the last image captured by the right camera and also to control the motorized zoom attached to the camera.

```python
reachy.right_camera
>>> <Camera side="right" resolution=(720, 1280, 3)>
```

#### reachy.joints

[Joint object](https://pollen-robotics.github.io/reachy-sdk/api/joint.html) containing every joint of the robot, from its arms to its head and antennas. This is useful when you want to get information, like the position, from all joints at once.

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
	<Joint name="l_antenna" pos="140.32" mode="compliant">
	<Joint name="r_antenna" pos="79.03" mode="compliant">
	<Joint name="neck_roll" pos="-21.58" mode="compliant">
	<Joint name="neck_pitch" pos="-79.71" mode="compliant">
	<Joint name="neck_yaw" pos="-59.27" mode="compliant">
>
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
	<Joint name="r_gripper" pos="19.50" mode="compliant">
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

### Basic methods

The *reachy* object has ?? methods, 8 of them being basic methods useful to start using the robot. The other methods are related to robot movements, and will be detailed in a more advanced section.

#### List of basic methods

[reachy.connect()]({{< ref "sdk/first-moves/intro#reachyconnect" >}})  
[reachy.disconnect()]({{< ref "sdk/first-moves/intro#reachydisconnect" >}})  
[reachy.is_connected()]({{< ref "sdk/first-moves/intro#reachyis_connected" >}})  
[reachy.is_off()]({{< ref "sdk/first-moves/intro#reachyis_off" >}})  
[reachy.is_on()]({{< ref "sdk/first-moves/intro#reachyis_on" >}})  
[reachy.turn_off()]({{< ref "sdk/first-moves/intro#reachyturn_off" >}})  
[reachy.turn_on()]({{< ref "sdk/first-moves/intro#reachyturn_on" >}})  
[reachy.set_pose()]({{< ref "sdk/first-moves/intro#reachyset_pose" >}})  


#### reachy.connect()

#### reachy.disconnect()

#### reachy.is_connected()

#### reachy.is_off()

#### reachy.is_on()

#### reachy.turn_off()

Method to turn off the whole robot. Turning off the robot means putting all parts of the robot in compliant mode, including the mobile base if there is one. See next section for more information on what the compliant mode is for a motor.

```python
reachy.turn_off()
```

#### reachy.turn_on()

Method to turn on the whole robot. Turning on the robot means putting all the parts of the robot in stiff mode, including the mobile base if there is one. See next section for more information on what the stiff mode is for a motor.

```python
reachy.turn_on()
```

#### reachy.set_pose()


