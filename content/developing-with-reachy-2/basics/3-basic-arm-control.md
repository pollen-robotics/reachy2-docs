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

## Arm presentation

Reachy's arm offers 7 degrees of freedom. It also gives access to one joint for the gripper.  
The **arm** is divided as follow:
- **shoulder**, composed of 2 joints (pitch and roll)
- **elbow**, composed of 2 joints (yaw and pitch)
- **wrist**, composed of 3 joints (roll, pitch and yaw)

We refer to the shoulder, elbow and wrist as **actuators**.  
For some actions, such as changing the compliance, is the the lowest level of control you will have.

### The actuators 

Each actuator has a unique name and uid. To access a specific actuator, you can use the attribute under the part you are using. We don't not provide a direct access to all actuators. For the arms, the following actuators are available:

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='192.168.0.42')  # Replace with the actual IP

reachy.r_arm._actuators
>>> <Joint name="r_shoulder_pitch" pos="27.98" mode="compliant">
```

Because they are parallel actuators, it often doesn't have sense to control one motor of an actuator without controlling the other motors of the same actuator.  

This is why actuators are for several cases the lowest degree of control we give. At the actuator level, you can then:
- modify the actuator compliance
- modify torques
- modify speed


### The joints

Each joint has a unique name and uid. To access a specific joint, you can either use *reachy.joints* which has each joint of the robot as attribute or access it via the actuators it belongs to. For example, to access the right arm shoulder roll : *reachy.r_arm.shoulder.roll*.

First, connect to your Reachy.

```python
from reachy_sdk import ReachySDK

reachy = ReachySDK(host='192.168.0.42')  # Replace with the actual IP

reachy.r_arm.shoulder.roll
>>> <Joint name="r_shoulder_pitch" pos="27.98" mode="compliant">
```
The name and the id are attributes of the returned Joint object.

```python 
reachy.r_arm.r_shoulder_pitch.name
>>> 'r_shoulder_pitch'
reachy.r_arm.r_shoulder_pitch.uid
>>> 8
```

Joints in Reachy are abstract elements that do not have a physical element. A joint is controlled by several motors of the actuators. The only thing you can do at joint level is reading the **present_position** and send **goal_position**.

#### present_position

You can get the present position of each joint with this attribute.

```python
reachy.r_arm.r_shoulder_pitch.present_position
>>> 22.4
```

> present_position is returned in **degrees**.

#### goal_position

The *goal_position* attribute of a joint can be used to set a new joint's target position to make it move. However, we recommend using the [**goto_joints() method**]({{< ref "developing-with-reachy-2/basics/3-basic-arm-control#goto_joints" >}}) to move the motors which provides better control on the joint's trajectories.  

Using goal_position will make the motor move **as fast as it can**, so be careful when using it.  
```python
reachy.r_arm.r_elbow_pitch.goal_position = -90
```

> goal_position must be written in **degrees**.

### The gripper

## Arm moves methods
### goto_joints()

The **`goto_joints()`** method takes a seven-elements-long list, with the angles in this order:
- r_arm.shoulder.pitch
- r_arm.shoulder.roll
- r_arm.elbow.yaw
- r_arm.elbow.pitch
- r_arm.wrist.roll
- r_arm.wrist.pitch
- r_arm.wrist.yaw

Let's see an example of how to use it. 

You will use the `goto_joints()` methods to place the right arm at a right-angled position. First, make sure that the Reachy's right arm is placed on a cleared table and that there will not be obstacles during its movement.

The setup should look like this: 

{{< img-center "images/sdk/first-moves/base_pos.jpg" 500x "" >}}

Let's define a list with **reachy.r_arm.elbow.pitch** at -90 degrees to the set a right-angled position for the right arm:

```python
right_angled_pose = [0, 0, 0, -90, 0, 0, 0]
```

Then send the `goto_joints()` commands to the right arm:
Set the right arm motors in stiff mode.

```python
reachy.r_arm.turn_on()  # don't forget to turn the arm on

reachy.r_arm.goto_joints(right_angled_pose)
```

You can use the 


The result should look like this:

<p align="center">
    {{< video "videos/sdk/goto.mp4" "80%" >}}
</p>

Don't forget to put the right arm's joints back to the compliant mode. Place your hand below the right arm's gripper to prevent the arm from falling hard on the table.

```python
reachy.r_arm.turn_off()
```

> To find out whether you have to send positive or negative angles, read next section on the arm kinematics.

### goto_matrix()

The **`goto_matrix()`** method takes a 4x4 matrix expressing the target pose of Reachy 2's end effector in Reachy 2 coordinate system.  

> Read next section on [Use arm kinematics]({{< ref "developing-with-reachy-2/basics/4-use-arm-kinematics" >}}) to better understand the use of the `goto_matrix()` method.  

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

You can read the opening of the gripper through the opening attribute:
```python
reachy.r_arm.gripper.opening
>>> 20  # almost closed
```

You can also control the opening of the gripper, using the **`set_opening()`** method. 

Send your custom opening value, still between 0 and 100, to the gripper with:
```python
reachy.r_arm.gripper.set_opening(50)  # half-opened
```

> Note that there is an smart gripper control that will avoid the gripper from reaching the opening position if an object has been detected while closing the gripper.


## Read arm position

### get_joints_position()

You can retrieve the values from each **arm joints** using the **`get_joints_position()`** method.  

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
reachy.l_arm.rotate_to(20, 30, -10)

reachy.head.get_joints_position()
>>> [7, 10, 4, -50, 4, 5, 7]

#  r_arm.shoulder.pitch=7, 
#  r_arm.shoulder.roll=10, 
#  r_arm.elbow.yaw=4,
#  r_arm.elbow.pitch=-50,
#  r_arm.wrist.roll=4,
#  r_arm.wrist.pitch=5,
#  r_arm.wrist.yaw=7,
```


### End effector position

You can get the end effector position of Reachy 2 in Reachy 2 coordinate system using forward kinematics.  

Call:
```python
reachy.l_arm.forward_kinematics()
```
to get the position of the left gripper in cartesian space.

> Read next section on [Use arm kinematics]({{< ref "developing-with-reachy-2/basics/4-use-arm-kinematics" >}}) to better understand the use of the `forward_kinematics()` method.  
