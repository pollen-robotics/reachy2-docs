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
slug: "1-hello-world"
url: "/developing-with-reachy-2/basics/1-hello-world/"
---

## Materials

To guide you through the SDK's functionalities, you can follow this written documentation (which is more complete), as well as the notebooks provided, so you can learn as you interact with your robot. 

####  Find the notebooks
<details>
<summary> If you cloned the reachy2_sdk repository </summary>

You can find the example notebooks in reachy2_sdk/src/examples. 
</details>

<details>
<summary>If you installed the reachy2_sdk from Pypi</summary> 
You haven't installed the examples on your computer. You can clone the folder in the directory that you want, by copying and pasting the instructions below into a terminal, in the desired folder. This will add an <i>examples_sdk</i> folder where you can find all the notebooks! 
<br>
<br>




  ```python
  git clone --no-checkout https://github.com/pollen-robotics/reachy2-sdk.git examples_sdk
  cd examples_sdk
  git sparse-checkout init --cone
  git sparse-checkout set src/examples
  git checkout develop
  mv src/examples/* .
  rm -rf src/
  ```

</details>

#### Follow them

<details>
<summary>
If you have any trouble making the notebooks work, please follow those steps : </summary>

1. In a terminal, go to the folder containing the notebooks 
	(if the repo has been cloned: *reachy2_sdk/src/examples*, if downloaded: *examples_sdk*) : 
   > ```cd path/to/folder```

2. Open your code editor by writing the command 

    > ```code .```

3. When you execute the first cell on your code editor, it may ask you if you want to install the jupyter and python extensions : click on “yes”.

4. Then it will ask you to choose the kernel : choose a python environment then select your virtual environment. 

    {{< img-center "images/sdk/first-moves/python_env.png" 600x "python env" >}}
    {{< img-center "images/sdk/first-moves/reachy_env.png" 600x "reachy env" >}}

5. A windows security popup can appear, click on “Allow” 
    {{< img-center "images/sdk/first-moves/firewall.png" 300x "firewall" >}}

6. Install the ipykernel package to make the notebooks run :
    {{< img-center "images/sdk/first-moves/pykernel.png" 600x "pykernel" >}}

You are now ready !

</details>

<br>

## Be ready to move

### 1. Connect to the robot

If you followed the instructions from ["Connect to Reachy 2"]({{< ref "developing-with-reachy-2/getting-started-sdk/connect-reachy2/" >}}), you know how to get Reachy's IP address and how to connect to the robot in a Python interface with the command  : 

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

:warning: Turning off can be a bit brutal, especially if the arms are raised. You can use `reachy.turn_off_smoothly()` for torques to gradually decrease. 

#### Robot parts

If you want to turn on or off a single part, access directly the relevant part and turn it on or off, for example for the left arm:

```python
reachy.l_arm.turn_on()
reachy.l_arm.turn_off()
```

All parts are detailed below in [ReachySDK attributes]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachy-attributes" >}}).

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
- the **default** pose, with both arms outstretched on either side of the body (be careful that your robot is at a sufficient height so that the arms do not touch the mobile base).
- the **elbow_90** pose, with the arms bent at 90°.

To start at the default posture, use the `goto_posture()` function:
```python
reachy.goto_posture('default')
```

By default, this movement is made in 2 seconds. You can choose to specify a custom duration. For example, to reach the elbow_90 posture in 5 seconds:
```python
reachy.goto_posture('elbow_90', duration=5)
```


## ReachySDK object

The *reachy* object instanciated from the ReachySDK class above is the root access to get all incoming information from Reachy 2 (joints or sensors) and to control each part of the robot (left/right arm, head, mobile base).  

The *reachy* object has 7 attributes and numerous methods which you can find in the [documentation](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html). 

If you want to have an overview, you can browse the basic attributes and methods below. 

{{< img-center "images/sdk/first-moves/reachy_methods.png" 400x "" >}}

<details id="reachy-attributes">
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

[Info object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/config/reachy_info.html) containing Reachy's informations

```python
reachy.info
>>> <ReachyInfo mode="FAKE" 
	robot_serial_number="reachy2-pvt01" 
	hardware_version="" 
	core_software_version="1.7.3.18" 
	battery_voltage=30.0 >
 ```

#### reachy.mobile_base

[Mobile_base object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.mobile_base) containing the informations about the mobile base. 


#### reachy.joints

[Joint object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.joints) containing every joint of the robot, from its arms to its head. This is useful when you want to get information, like the position, from all joints at once.

```python
reachy.joints
>>> {'r_arm.shoulder.pitch': <OrbitaJoint axis_type="pitch" present_position=0.0 goal_position=0.0 >,
	'r_arm.shoulder.roll': <OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >,
	'r_arm.elbow.yaw': <OrbitaJoint axis_type="yaw" present_position=0.0 goal_position=0.0 >,
	'r_arm.elbow.pitch': <OrbitaJoint axis_type="pitch" present_position=0.0 goal_position=0.0 >,
	'r_arm.wrist.roll': <OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >,
	'r_arm.wrist.pitch': <OrbitaJoint axis_type="pitch" present_position=-0.0 goal_position=-0.0 >,
	'r_arm.wrist.yaw': <OrbitaJoint axis_type="yaw" present_position=-0.0 goal_position=-0.0 >,
	'l_arm.shoulder.pitch': <OrbitaJoint axis_type="pitch" present_position=0.0 goal_position=0.0 >,
	'l_arm.shoulder.roll': <OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >,
	'l_arm.elbow.yaw': <OrbitaJoint axis_type="yaw" present_position=0.0 goal_position=0.0 >,
	'l_arm.elbow.pitch': <OrbitaJoint axis_type="pitch" present_position=0.0 goal_position=0.0 >,
	'l_arm.wrist.roll': <OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >,
	'l_arm.wrist.pitch': <OrbitaJoint axis_type="pitch" present_position=-0.0 goal_position=-0.0 >,
	'l_arm.wrist.yaw': <OrbitaJoint axis_type="yaw" present_position=-0.0 goal_position=-0.0 >,
	'head.neck.roll': <OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >,
	'head.neck.pitch': <OrbitaJoint axis_type="pitch" present_position=-0.0 goal_position=-0.0 >,
	'head.neck.yaw': <OrbitaJoint axis_type="yaw" present_position=-0.0 goal_position=-0.0 >}

```

#### reachy.head

[Head object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.head) containing the three joints composing the Orbita actuator along with methods for its kinematics or to control it.

```python
reachy.head
>>> <Head on=False actuators=
	neck: <Orbita3d on=False joints=
	<OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >
	<OrbitaJoint axis_type="pitch" present_position=-0.0 goal_position=-0.0 >
	<OrbitaJoint axis_type="yaw" present_position=-0.0 goal_position=-0.0 >

>>
```

#### reachy.l_arm

[Arm object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.l_arm) containing every joint in the left arm along with its kinematics methods.

```python
reachy.l_arm
>>> <Arm on=False actuators=
	shoulder: <Orbita2d on=False joints=
	<OrbitaJoint axis_type="pitch" present_position=0.0 goal_position=0.0 >
	<OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >
>
	elbow: <Orbita2d on=False joints=
	<OrbitaJoint axis_type="yaw" present_position=0.0 goal_position=0.0 >
	<OrbitaJoint axis_type="pitch" present_position=0.0 goal_position=0.0 >
>
	wrist: <Orbita3d on=False joints=
	<OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >
	<OrbitaJoint axis_type="pitch" present_position=-0.0 goal_position=-0.0 >
	<OrbitaJoint axis_type="yaw" present_position=-0.0 goal_position=-0.0 >
>
>

```


#### reachy.r_arm

[Arm object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.r_arm) containing every joint in the right arm along with its kinematics methods.

```python
reachy.r_arm
>>> <Arm on=False actuators=
	shoulder: <Orbita2d on=False joints=
	<OrbitaJoint axis_type="pitch" present_position=0.0 goal_position=0.0 >
	<OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >
>
	elbow: <Orbita2d on=False joints=
	<OrbitaJoint axis_type="yaw" present_position=0.0 goal_position=0.0 >
	<OrbitaJoint axis_type="pitch" present_position=0.0 goal_position=0.0 >
>
	wrist: <Orbita3d on=False joints=
	<OrbitaJoint axis_type="roll" present_position=0.0 goal_position=0.0 >
	<OrbitaJoint axis_type="pitch" present_position=-0.0 goal_position=-0.0 >
	<OrbitaJoint axis_type="yaw" present_position=-0.0 goal_position=-0.0 >
>
>

```

#### reachy.cameras

[Camera object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.cameras) containing both cameras of Reachy (teleop and depth one).

```python
reachy.cameras
>>> <CameraManager intialized_cameras=
	
>

```

</details>

<details>
<summary><b>Reachy's basic methods</b></summary>

The *reachy* object has several methods, 8 of them being basic methods useful to start using the robot. The other methods are related to robot movements, and will be detailed in a more advanced section.

#### List of basic methods

- [reachy.connect()](#reachyconnect)
- [reachy.disconnect()](#reachydisconnect)
- [reachy.is_connected()](#reachyis_connected)
- [reachy.turn_on()](#reachyturn_on)
- [reachy.turn_off()](#reachyturn_off)
- [reachy.turn_off_smoothly()](#reachyturn_off_smoothly)
- [reachy.is_on()](#reachyis_on)
- [reachy.is_off()](#reachyis_off)
- [reachy.goto_posture()](#reachygoto_posture)

#### reachy.connect()
Method to establish a connection with the robot.

```python
reachy.connect()
```
#### reachy.disconnect()
Method to disconnect from the robot.

```python
reachy.disconnect()
```
#### reachy.is_connected()
Method to check if the robot is connected.

```python
reachy.is_connected()
```
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
#### reachy.turn_off_smoothly()
Method to turn off the robot in a smooth way : the torques gradually decrease and the robot passes through an intermediate position to avoid brutal colliding with its vertical bars or with obstacles as tables. 

```python
reachy.turn_off_smoothly()
```
#### reachy.is_on()
Method to check if the robot is turned on.

```python
reachy.is_on()
```
#### reachy.is_off()
Method to check if the robot is turned off.

```python
reachy.is_off()
```
#### reachy.goto_posture()
Method to make the robot go to a specific posture ("default" or "elbow_90")

```python
reachy.goto_posture()
```

</details>