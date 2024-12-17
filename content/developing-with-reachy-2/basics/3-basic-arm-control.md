---
title: "3. Basic arm control"
description: "First moves of the arms using the Python SDK"
lead: "First moves of the arms using the Python SDK"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "SDK basics"
weight: 220
toc: true
---

> You can choose to follow our online documentation or to make your Reachy move by following the [notebook n°3](https://github.com/pollen-robotics/reachy2-sdk/blob/develop/src/examples/3_arm_and_gripper.ipynb). 


## Arm presentation


Reachy's arm offers 7 degrees of freedom. It also gives access to one joint for the gripper.  
The **arm** is divided as follow:
- **shoulder**, composed of 2 joints (pitch and roll)
- **elbow**, composed of 2 joints (yaw and pitch)
- **wrist**, composed of 3 joints (roll, pitch and yaw)

We refer to the shoulder, elbow and wrist as **actuators**.  

### The actuators 

Each actuator has a unique name and uid. To access a specific actuator, you can use the attribute under the part you are using. We don't not provide a direct access to all actuators. For the arms, the following actuators are available:

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='10.0.0.201')  # Replace with the actual IP
 reachy.r_arm._actuators
{'shoulder': <Orbita2d on=False joints=
        <OrbitaJoint axis_type="pitch" present_position=4.38 goal_position=4.38 >
        <OrbitaJoint axis_type="roll" present_position=14.31 goal_position=14.31 >
>, 'elbow': <Orbita2d on=False joints=
        <OrbitaJoint axis_type="yaw" present_position=19.74 goal_position=19.74 >
        <OrbitaJoint axis_type="pitch" present_position=-19.9 goal_position=-19.9 >
>, 'wrist': <Orbita3d on=False joints=
        <OrbitaJoint axis_type="roll" present_position=-9.81 goal_position=-9.81 >
        <OrbitaJoint axis_type="pitch" present_position=16.29 goal_position=16.29 >
        <OrbitaJoint axis_type="yaw" present_position=-28.78 goal_position=-28.78 >}
```

Because they are parallel actuators, it often doesn't have sense to control one motor of an actuator without controlling the other motors of the same actuator.  

This is why actuators are for several cases the lowest degree of control we give. At the actuator level, you can then:
- modify the actuator compliance
- modify torques
- modify speed


### The joints

To access a specific joint, you can either use *reachy.joints* which has each joint of the robot as attribute or access it via the actuators it belongs to. For example, to access the right arm shoulder roll : *reachy.r_arm.shoulder.roll*.

First, connect to your Reachy.

```python
from reachy_sdk import ReachySDK

reachy = ReachySDK(host='10.0.0.201')  # Replace with the actual IP

reachy.r_arm.shoulder.roll
<OrbitaJoint axis_type="roll" present_position=3.54 goal_position=3.55 >
```

Joints in Reachy are abstract elements that do not have a physical element. A joint is controlled by several motors of the actuators. The only thing you can do at joint level is reading the **present_position** and send **goal_position**.

#### present_position

You can get the present position of each joint with this attribute.

```python
reachy.r_arm._shoulder.pitch.present_position
>>> 22.4
```

> present_position is returned in **degrees**.

#### goal_position

The *goal_position* attribute of a joint can be used to set a new joint's target position to make it move. However, we recommend using the [**goto() method**]({{< ref "developing-with-reachy-2/basics/3-basic-arm-control#goto" >}}) to move the motors which provides better control on the joint's trajectories.  

Using goal_position will make the motor move **as fast as it can**, so be careful when using it.  
```python
reachy.r_arm._elbow.pitch.goal_position = -90
reachy.send_goal_positions()
```

> goal_position must be written in **degrees**.

### The gripper

Grippers are part of arms: this means that if the arm is switched on, so is the gripper.

To get access to a gripper, you have to go through the corresponding arm : 
```python
reachy.r_arm.gripper 
>>> <Hand on=True opening=99.65 >
```
The opening corresponds to a percentage. 


## Arm moves methods

Arms can be controlled in two spaces:

* the **joint space**, which allows to read and write directly the angle values of each joint of the arm
* the **cartesian space**, which consists in controlling the end effector position and orientation in Reachy's coordinate system

> Both spaces are quite different, and **we advise not to mix them** if you are not familiar with the output.
In fact, values of the joint space are expressed in each actuator's coordinate system (respectively shoulder, elbow and wrist), whereas commands in cartesian space are expressed in Reachy's coordinate system

### goto()

The goto method can be used in joint and cartesian space, it depends on the input parameter, respectively a list of 7 joint values or a 4x4 matrix. 

#### In joint space 

The **`goto()`** method takes a seven-elements-long list, with the angles in this order:
- r_arm.shoulder.pitch
- r_arm.shoulder.roll
- r_arm.elbow.yaw
- r_arm.elbow.pitch
- r_arm.wrist.roll
- r_arm.wrist.pitch
- r_arm.wrist.yaw

Let's see an example of how to use it. 

Let's define a list with **reachy.r_arm.elbow.pitch** at -90 degrees to the set a right-angled position for the right arm:

```python
right_angled_pose = [0, 10, -10, -90, 0, 0, 0]
```

Then we can send the `goto` commands to the right arm, after setting the motors in stiff mode : 
```python
reachy.r_arm.turn_on() 

reachy.r_arm.goto(right_angled_pose)
```

> To find out whether you have to send positive or negative angles, read next section on the arm kinematics.

#### In cartesian space

The **`goto()`** method takes a 4x4 matrix expressing the target pose of Reachy 2's end effector in Reachy 2 coordinate system.  

> Read next section on [Use arm kinematics]({{< ref "developing-with-reachy-2/basics/4-use-arm-kinematics" >}}) to better understand the use of the `goto` method.  


## Gripper control

### open()

To **open the grippers**, call the **`open()`** method on the wanted gripper.  
It will open it entirely:
```python
reachy.r_arm.gripper.open()
```

### close()

To **close the grippers**, call the **`close()`** method on the wanted gripper.  
It will close the gripper with the appropriate value, which means it will be entirely closed if there is no object to grasp, or set a suitable value if an object has been detected in the gripper during the closing:
```python
reachy.r_arm.gripper.close()
```

### opening

The opening value corresponds to a **percentage of opening**, which means:
- 0 is close
- 100 is open

You can read the opening of the gripper :

```python
reachy.r_arm.gripper.get_current_opening()
>>> 20  # almost closed
```

You can also control the opening of the gripper, using the **`set_opening()`** method. 

Send your custom opening value, still between 0 and 100, to the gripper with:
```python
reachy.r_arm.gripper.set_opening(50)  # half-opened
```

Those actions are non-blocking, meaning that the rest of your program won't wait the end of the action to continue. 
You can use the boolean `is_moving()` for that : 

```python
reachy.r_arm.gripper.close()
while reachy.r_arm.gripper.is_moving() : 
  time.sleep(0.1)
reachy.r_arm.gripper.open()
```

> Note that there is an smart gripper control that will avoid the gripper from reaching the opening position if an object has been detected while closing the gripper.


## Read arm position

### In joint space : get_current_positions()

You can retrieve the values from each **arm joints** using the **`get_current_positions()`** method.  

This method returns a seven-elements-long list, with the angles in this order:
- r_arm.shoulder.pitch
- r_arm.shoulder.roll
- r_arm.elbow.yaw
- r_arm.elbow.pitch
- r_arm.wrist.roll
- r_arm.wrist.pitch
- r_arm.wrist.yaw

> Angles are returned in **degrees** by default.

```python
reachy.goto_posture()
reachy.r_arm.get_current_positions()
>>> [0, 10, -10, 0, 0, 0, 0]

#  r_arm.shoulder.pitch=0, 
#  r_arm.shoulder.roll=10, 
#  r_arm.elbow.yaw=-10,
#  r_arm.elbow.pitch=0,
#  r_arm.wrist.roll=0,
#  r_arm.wrist.pitch=0,
#  r_arm.wrist.yaw=0
```


### In cartesian space : forward_kinematics()

You can get the end effector position of Reachy in Reachy 2 coordinate system using forward kinematics.  

Call:
```python
reachy.l_arm.forward_kinematics()
```
to get the position of the left gripper in cartesian space.

> Read next section on [Use arm kinematics]({{< ref "developing-with-reachy-2/basics/4-use-arm-kinematics" >}}) to better understand the use of the `forward_kinematics()` method.  
