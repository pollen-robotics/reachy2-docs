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

To guide you through the SDK's functionalities, you can follow this written documentation (which is more complete) as well as the provided notebooks, allowing you to learn interactively with your robot. 

#### Find the Notebooks
<details>
<summary>If you cloned the reachy2_sdk repository</summary>

You can find the example notebooks in `reachy2_sdk/src/examples`.
</details>

<details>
<summary>If you installed the reachy2_sdk from PyPI</summary>

The examples are not installed by default. Clone the folder with the following commands in your desired directory. This will add an `examples_sdk` folder containing all notebooks.

```bash
git clone --no-checkout https://github.com/pollen-robotics/reachy2-sdk.git examples_sdk
cd examples_sdk
git sparse-checkout init --cone
git sparse-checkout set src/examples
git checkout develop
mv src/examples/* .
rm -rf src/
```
</details>

#### Follow the Notebooks

<details>
<summary>If you encounter issues with the notebooks, follow these steps:</summary>

1. Navigate to the folder containing the notebooks:
   ```bash
   cd path/to/folder
   ```

2. Open your code editor:
   ```bash
   code .
   ```

3. Execute the first cell. If prompted, install Jupyter and Python extensions by clicking "Yes."

4. Select the appropriate kernel:
   - Choose a Python environment and select your virtual environment.

   {{< img-center "images/sdk/first-moves/python_env.png" 600x "Select Python environment" >}}
   {{< img-center "images/sdk/first-moves/reachy_env.png" 600x "Select Reachy environment" >}}

5. Allow access if prompted by a Windows security popup:
   {{< img-center "images/sdk/first-moves/firewall.png" 300x "Firewall permission" >}}

6. Install the `ipykernel` package to run the notebooks:
   {{< img-center "images/sdk/first-moves/pykernel.png" 600x "Install ipykernel" >}}

You are now ready to proceed!
</details>

<br>

## Be Ready to Move

### 1. Connect to the Robot

Follow the instructions in ["Connect to Reachy 2"]({{< ref "developing-with-reachy-2/getting-started-sdk/connect-reachy2" >}}) to find Reachy's IP address. Connect to the robot with:
*(type `python` first in your terminal)*

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='10.0.0.201')  # Replace with the actual IP
```

<details>
<summary>Check the Connection</summary>

Verify the connection:
```python
reachy.is_connected()
>>> True
```

If the connection is lost and the issue is resolved, reconnect with:
```python
reachy.connect()
```
</details>

### 2. Turn On / Turn Off Motors

#### The Whole Robot

When starting, the robot is in compliant mode, allowing manual manipulation of its parts. In this mode, the robot won't respond to any command you send to it. To activate motor control:
```python
reachy.turn_on()
```

At the end of your session, return to compliant mode:
```python
reachy.turn_off()
```
This will act on all parts of your robot, including the mobile base.

:warning: Turning off can be a bit brutal, especially if the arms are raised. You can use `reachy.turn_off_smoothly()` for torques to gradually decrease:
```python
reachy.turn_off_smoothly()
```
All parts are detailed below in [ReachySDK attributes]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachy-attributes" >}}).

At any time, you can check the state of your robot using the `is_on()` or `is_off()` method. Note that it will return True only if **all parts** are in the requested state. This means both methods can return False if the right arm is ON but not the left one for example.

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

The *reachy* object has 10 attributes and numerous methods which you can find in the [documentation](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html). 

If you want to have an overview, you can browse the basic attributes and methods below. 

{{< img-center "images/sdk/first-moves/reachy_methods.png" 400x "" >}}

<details id="reachy-attributes">
<summary><b>Reachy's attributes </b></summary>

The *reachy* detailed attributes give access to info, parts and sensors of the robot.

#### List of attributes

[reachy.audio]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyaudio" >}})  
[reachy.audit]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyaudit" >}})  
[reachy.cameras]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachycameras" >}})  
[reachy.head]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyhead" >}})  
[reachy.info]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyinfo" >}})  
[reachy.joints]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyjoints" >}})  
[reachy.l_arm]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyl_arm" >}})  
[reachy.mobile_base]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachymobile_base" >}})  
[reachy.r_arm]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachyr_arm" >}})  
[reachy.tripod]({{< ref "developing-with-reachy-2/basics/1-hello-world#reachytripod" >}})

#### reachy.audio


#### reachy.audit
```python
reachy.audit
>>> {'r_arm': {'shoulder': 'Ok', 'elbow': 'Ok', 'wrist': 'Ok', 'gripper': None}, 'l_arm': {'shoulder': 'Ok', 'elbow': 'Ok', 'wrist': 'Ok', 'gripper': None}, 'head': {'neck': 'Ok', 'l_antenna': None, 'r_antenna': None}}
```

#### reachy.cameras

[Camera object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.cameras) containing both cameras of Reachy (teleop and depth one).

```python
reachy.cameras
>>> <CameraManager intialized_cameras=
        <Camera name="depth" stereo=False> 
        <Camera name="teleop" stereo=True> 
>
```

#### reachy.head

[Head object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.head) containing the three joints composing the Orbita actuator along with methods for its kinematics or to control it.

```python
reachy.head
>>> <Head on=False actuators=
        neck: <Orbita3d on=False joints=
        <OrbitaJoint axis_type="roll" present_position=4.76 goal_position=4.76 >
        <OrbitaJoint axis_type="pitch" present_position=-14.26 goal_position=-14.26 >
        <OrbitaJoint axis_type="yaw" present_position=19.11 goal_position=19.11 >
>
        l_antenna: <Antenna on=False joints=
        <DynamixelMotor on=False present_position=54.32 goal_position=54.32 >
>
        r_antenna: <Antenna on=False joints=
        <DynamixelMotor on=False present_position=-52.73 goal_position=-52.73 >
>
>
```

#### reachy.info

[Info object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/config/reachy_info.html) containing Reachy's informations

```python
reachy.info
>>> <ReachyInfo mode="REAL" 
	robot_serial_number="reachy2-pvt01" 
	hardware_version="" 
	core_software_version="1.7.4.11" 
 	robot_api_version="1.0.18"
	battery_voltage=30.0 >
 ```

 #### reachy.joints

[Joint object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.joints) containing every joint of the robot, from its arms to its head. This is useful when you want to get information, like the position, from all joints at once.

```python
reachy.joints
>>> {'r_arm.shoulder.pitch': <OrbitaJoint axis_type="pitch" present_position=2.93 goal_position=2.93 >,
	'r_arm.shoulder.roll': <OrbitaJoint axis_type="roll" present_position=16.06 goal_position=16.06 >,
	'r_arm.elbow.yaw': <OrbitaJoint axis_type="yaw" present_position=9.9 goal_position=9.9 >,
	'r_arm.elbow.pitch': <OrbitaJoint axis_type="pitch" present_position=-9.23 goal_position=-9.23 >,
	'r_arm.wrist.roll': <OrbitaJoint axis_type="roll" present_position=-13.98 goal_position=-13.98 >,
	'r_arm.wrist.pitch': <OrbitaJoint axis_type="pitch" present_position=-2.85 goal_position=-2.85 >,
	'r_arm.wrist.yaw': <OrbitaJoint axis_type="yaw" present_position=-18.11 goal_position=-18.11 >,
	'r_arm.gripper': <GripperJoint on=False present_position=129.81 goal_position=129.81 >,
	'l_arm.shoulder.pitch': <OrbitaJoint axis_type="pitch" present_position=-0.31 goal_position=-0.31 >,
	'l_arm.shoulder.roll': <OrbitaJoint axis_type="roll" present_position=-15.01 goal_position=-15.01 >,
	'l_arm.elbow.yaw': <OrbitaJoint axis_type="yaw" present_position=-5.86 goal_position=-5.86 >,
	'l_arm.elbow.pitch': <OrbitaJoint axis_type="pitch" present_position=-4.81 goal_position=-4.81 >,
	'l_arm.wrist.roll': <OrbitaJoint axis_type="roll" present_position=-3.49 goal_position=-3.49 >,
	'l_arm.wrist.pitch': <OrbitaJoint axis_type="pitch" present_position=18.09 goal_position=18.09 >,
	'l_arm.wrist.yaw': <OrbitaJoint axis_type="yaw" present_position=9.01 goal_position=9.01 >,
	'l_arm.gripper': <GripperJoint on=False present_position=128.5 goal_position=128.5 >,
	'head.neck.roll': <OrbitaJoint axis_type="roll" present_position=4.76 goal_position=4.76 >,
	'head.neck.pitch': <OrbitaJoint axis_type="pitch" present_position=-14.26 goal_position=-14.26 >,
	'head.neck.yaw': <OrbitaJoint axis_type="yaw" present_position=19.11 goal_position=19.11 >,
	'head.l_antenna': <DynamixelMotor on=False present_position=54.32 goal_position=54.32 >,
	'head.r_antenna': <DynamixelMotor on=False present_position=-52.73 goal_position=-52.73 >}

```

#### reachy.l_arm

[Arm object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.l_arm) containing every joint in the left arm along with its kinematics methods.

```python
reachy.l_arm
>>> <Arm on=False actuators=
        shoulder: <Orbita2d on=False joints=
        <OrbitaJoint axis_type="pitch" present_position=-0.31 goal_position=-0.31 >
        <OrbitaJoint axis_type="roll" present_position=-15.01 goal_position=-15.01 >
>
        elbow: <Orbita2d on=False joints=
        <OrbitaJoint axis_type="yaw" present_position=-5.86 goal_position=-5.86 >
        <OrbitaJoint axis_type="pitch" present_position=-4.81 goal_position=-4.81 >
>
        wrist: <Orbita3d on=False joints=
        <OrbitaJoint axis_type="roll" present_position=-3.49 goal_position=-3.49 >
        <OrbitaJoint axis_type="pitch" present_position=18.09 goal_position=18.09 >
        <OrbitaJoint axis_type="yaw" present_position=9.01 goal_position=9.01 >
>
        gripper: <ParallelGripper on=False joints=
        <GripperJoint on=False present_position=128.5 goal_position=128.5 >
>
>
```

#### reachy.mobile_base

[Mobile_base object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.mobile_base) containing the informations about the mobile base. 

```python
reachy.mobile_base
>>> <MobileBase on=True 
 lidar_safety_enabled=True 
 battery_voltage=26.6>
```

#### reachy.r_arm

[Arm object](https://pollen-robotics.github.io/reachy2-sdk/reachy2_sdk/reachy_sdk.html#ReachySDK.r_arm) containing every joint in the right arm along with its kinematics methods.

```python
reachy.r_arm
>>> <Arm on=False actuators=
        shoulder: <Orbita2d on=False joints=
        <OrbitaJoint axis_type="pitch" present_position=2.93 goal_position=2.93 >
        <OrbitaJoint axis_type="roll" present_position=16.06 goal_position=16.06 >
>
        elbow: <Orbita2d on=False joints=
        <OrbitaJoint axis_type="yaw" present_position=9.9 goal_position=9.9 >
        <OrbitaJoint axis_type="pitch" present_position=-9.23 goal_position=-9.23 >
>
        wrist: <Orbita3d on=False joints=
        <OrbitaJoint axis_type="roll" present_position=-13.98 goal_position=-13.98 >
        <OrbitaJoint axis_type="pitch" present_position=-2.85 goal_position=-2.85 >
        <OrbitaJoint axis_type="yaw" present_position=-18.11 goal_position=-18.11 >
>
        gripper: <ParallelGripper on=False joints=
        <GripperJoint on=False present_position=129.81 goal_position=129.81 >
>
>
```





#### reachy.tripod
```python
reachy.tripod
>>> <Tripod height=0.996 >
```

</details>

<details>
<summary><b>Reachy's basic methods</b></summary>

The *reachy* object has several methods, 9 of them being basic methods useful to start using the robot. The other methods are related to robot movements, and will be detailed in a more advanced section.

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