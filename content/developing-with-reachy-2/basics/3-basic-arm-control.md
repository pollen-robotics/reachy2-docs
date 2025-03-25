---
title: "3. Basic arm and gripper control"
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
slug: "3-basic-arm-control"
url: "/developing-with-reachy-2/basics/3-basic-arm-control/"
---
<br>

> You can choose to follow our online documentation or to make your Reachy move by following the [notebook n°3](https://github.com/pollen-robotics/reachy2-sdk/blob/develop/src/examples/3_arm_and_gripper.ipynb). 


## Arm presentation

Reachy's arm offers 7 degrees of freedom. It also gives access to one joint for the gripper.  
The **arm** is divided as follows:
- **shoulder**, composed of 2 joints (pitch and roll)
- **elbow**, composed of 2 joints (yaw and pitch)
- **wrist**, composed of 3 joints (roll, pitch, and yaw)
- **gripper**, composed of 1 joint for the default parallel gripper

We refer to the shoulder, elbow, wrist, and gripper as **actuators**.  

### The actuators 

Each actuator has a unique name and UID. To access a specific actuator, you can use the attribute under the part you are using. We do not provide direct access to all actuators. For the arms, the following actuators are available:

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='10.0.0.201')  # Replace with the actual IP
reachy.r_arm._actuators
>>> {'shoulder': <Orbita2d on=False joints=
 	<OrbitaJoint axis_type="pitch" present_position=5.0 goal_position=5.0 >
 	<OrbitaJoint axis_type="roll" present_position=16.7 goal_position=16.7 >
 >,
 'elbow': <Orbita2d on=False joints=
 	<OrbitaJoint axis_type="yaw" present_position=-6.41 goal_position=-6.41 >
 	<OrbitaJoint axis_type="pitch" present_position=-16.58 goal_position=-16.58 >
 >,
 'wrist': <Orbita3d on=False joints=
 	<OrbitaJoint axis_type="roll" present_position=-17.29 goal_position=-17.29 >
 	<OrbitaJoint axis_type="pitch" present_position=1.54 goal_position=1.54 >
 	<OrbitaJoint axis_type="yaw" present_position=-41.39 goal_position=-41.39 >
 >,
 'gripper': <ParallelGripper on=False joints=
 	<GripperJoint on=False present_position=57.57 goal_position=57.57 >
 >}
```

Because Orbita2d (shoulder and elbow) and Orbita3d (wrist) are parallel actuators, it often doesn't make sense to control one motor of an actuator without controlling the other motors of the same actuator.  

This is why actuators are, in most cases, the lowest degree of control we provide. Modifying *compliance*, *torque* or *speed* is not available at joint level.


### The joints

To access a specific joint, you can either use *reachy.joints* which has each joint of the robot as an attribute or access it via the actuators it belongs to. For example, to access the right arm shoulder roll: **`reachy.r_arm.shoulder.roll`**.

First, connect to your Reachy.

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='10.0.0.201')  # Replace with the actual IP

reachy.r_arm.shoulder.roll
<OrbitaJoint axis_type="roll" present_position=3.54 goal_position=3.55 >
```

Joints in Reachy are abstract elements that do not have a physical representation. A joint is controlled by several motors of the actuators. The only thing you can do at the joint level is read the **present_position** and send **goal_position**.  

You can access all arm's joints from the part:
```python
reachy.r_arm.joints
>>> {'shoulder.pitch': <OrbitaJoint axis_type="pitch" present_position=4.94 goal_position=5.0 >,
'shoulder.roll': <OrbitaJoint axis_type="roll" present_position=16.64 goal_position=16.7 >,
'elbow.yaw': <OrbitaJoint axis_type="yaw" present_position=-6.41 goal_position=-6.41 >,
'elbow.pitch': <OrbitaJoint axis_type="pitch" present_position=-16.58 goal_position=-16.58 >,
'wrist.roll': <OrbitaJoint axis_type="roll" present_position=-17.29 goal_position=-17.29 >,
'wrist.pitch': <OrbitaJoint axis_type="pitch" present_position=1.54 goal_position=1.54 >,
'wrist.yaw': <OrbitaJoint axis_type="yaw" present_position=-41.39 goal_position=-41.39 >,
'gripper': <GripperJoint on=False present_position=57.57 goal_position=57.57 >}
```

#### present_position

You can get the present position of each joint with this attribute.

```python
reachy.r_arm.shoulder.pitch.present_position
>>> 22.4
```

> `present_position` is returned in **degrees**.

#### goal_position

The *goal_position* attribute of a joint can be used to set a new joint's target position to make it move. However, we recommend using the [**goto() method**]({{< ref "developing-with-reachy-2/basics/3-basic-arm-control#goto" >}}) to move the motors, which provides better control of the joint's trajectories.  

Using `goal_position` will make the motor move **as fast as it can**, so be careful when using it.  
```python
reachy.r_arm.elbow.pitch.goal_position = -90
reachy.send_goal_positions()
```

> `goal_position` must be written in **degrees**.

### The gripper

Grippers are part of arms: this means that if the arm is turned on, so is the gripper.  
However, in most cases, the **gripper is controlled independently** from the rest of the arm.  

To get access to a gripper, you have to go through the corresponding arm: 
```python
reachy.r_arm.gripper 
>>> <ParallelGripper on=True joints=
	<GripperJoint on=True present_position=57.57 goal_position=57.57 >
>
```

A section is dedicated to the [Gripper control]({{< ref "developing-with-reachy-2/basics/3-basic-arm-control#gripper-control" >}}).

## Arm goto methods

Arms can be controlled in two spaces:

* the **joint space**, which allows reading and writing directly the angle values of each joint of the arm
* the **cartesian space**, which consists of controlling the end effector's position and orientation in Reachy's coordinate system

> Both spaces are quite different, and **we advise not to mix them** if you are not familiar with the output. 
In fact, values of the joint space are expressed in each actuator's coordinate system (shoulder, elbow, and wrist), whereas commands in Cartesian space are expressed in Reachy's coordinate system.

### goto()

Reachy 2's arm can be moved using the **`goto()`** method, which supports both **joint space** and **Cartesian space** commands.  
Depending on your needs, you can define target poses using a list of 7 joint values (joint space command) or a 4x4 matrix (Cartesian space command). 

#### In joint space 

The **`goto()`** method takes a `target` as a seven-elements-long list, with the angles in this order:
- r_arm.shoulder.pitch
- r_arm.shoulder.roll
- r_arm.elbow.yaw
- r_arm.elbow.pitch
- r_arm.wrist.roll
- r_arm.wrist.pitch
- r_arm.wrist.yaw

Example usage:

Let's define a list with **reachy.r_arm.elbow.pitch** at -90 degrees to set a right-angled position for the right arm:

```python
right_angled_pose = [0, 10, -10, -90, 0, 0, 0]
```

Then send the **`goto()`** command to the right arm after setting the motors in stiff mode: 
```python
reachy.r_arm.turn_on() 

reachy.r_arm.goto(right_angled_pose)
```

> To find out whether you have to send positive or negative angles, read the next page on the [arm kinematics]({{< ref "developing-with-reachy-2/basics/4-use-arm-kinematics" >}}).

#### In cartesian space

The **`goto()`** method takes a 4x4 matrix expressing the target pose of Reachy 2's end effector in Reachy 2 coordinate system.  

> Read the next section on [Use arm kinematics]({{< ref "developing-with-reachy-2/basics/4-use-arm-kinematics" >}}) to better understand the use of the `goto()` method.  

#### Goto parameters

As described in the page [Understand gotos in Reachy 2]({{< ref "developing-with-reachy-2/basics/2-understand-gotos" >}}), there are several parameters you can modify to customize your `goto()` movement on the arm:
- **standard goto parameters**:
    - **duration** *(float)* – Specifies the duration of the movement in seconds, which is of 2 seconds by default.
    - **wait** *(bool)* – If set to True, the method becomes blocking and waits until the movement is complete.
    - **interpolation_mode** *(str)* – Defines the trajectory profile used to reach the target. Available options are:  
        - 'minimum_jerk' (default) – Smooth motion with minimal jerk.  
        - 'linear' – Straightforward, linear interpolation.
        - 'elliptical' – interpolation following the trajectory of an ellipse, available in cartesian space only (see *arm specific goto parameters* below).  
<br>

- **joint space specific goto parameter**:
    - **degrees** *(bool)* – Specifies how long (in seconds) the motion should take.  
<br>

- **cartesian space specific goto parameters**:
    - **interpolation_space** *(str)* – Determines how the motion interpolation is performed. It accepts two possible values:  

        - **'joint_space'** (default): The interpolation is done independently on each joint, from its current position to its target position. This is a straightforward and efficient method, commonly used for most joint-based motions.  

        - **'cartesian_space'** : The interpolation is performed in cartesian space, between the gripper's current pose and its target pose. In this mode, the inverse kinematics (IK) solver is used to compute the intermediate joint configurations required to follow the cartesian path. **'elliptical'** interpolation mode is only supported in cartesian space interpolation.  

    - **arc_direction** *(for elliptical interpolation only)* – Defines the orientation of the arc—that is, the direction in which the motion will "bulge" along the elliptical path. Can be "right", "left", "front", "back", "above" or "below"

    - **secondary_radius** *(for elliptical interpolation only)* – Defines the secondary radius of the ellipse — essentially, how far the motion will deviate from a straight line in the direction specified by arc_direction. If secondary_radius is not specified, the motion will follow a half-circle arc between the current and target poses.

#### Examples of arm's goto() usage

 Here's a set of commented examples showcasing how to use `goto()` with Reachy 2's arm, covering both **joint space** and **Cartesian space**, along with various parameters like `duration`, `wait`, `interpolation_mode`, and Cartesian-specific options like `arc_direction` and `secondary_radius`.

---

**🦾 Example 1: Basic joint space motion**

Move the right arm to a predefined joint configuration with the elbow bent at 90°.

```python
right_angled_pose = [0, 10, -10, -90, 0, 0, 0]  # angles in degrees

reachy.r_arm.turn_on()
reachy.r_arm.goto(right_angled_pose)
```

**What it does:**  
Moves each joint independently to reach the specified angles. No waiting or timing is specified, so the default duration (2 seconds) is used.

---

**🦾 Example 2: Slower joint space motion with blocking behavior**

```python
reachy.r_arm.goto(
    [0, 0, 0, -45, 0, 20, 0],
    duration=3.0,
    wait=True
)
```

**What it does:**  
Moves the arm to a pose with a slightly bent elbow and raised wrist over 3 seconds. The `wait=True` parameter makes the function blocking, so the script waits for the movement to complete before continuing.

---

**🦾 Example 3: Joint space motion in radians**

```python
pose_in_radians = [0.0, 0.2, -0.3, -1.57, 0.0, 0.0, 0.0]

reachy.r_arm.goto(pose_in_radians, degrees=False)
```

**What it does:**  
Sends the same kind of joint space command, but the angles are given in **radians**.

---

**🦾 Example 4: Cartesian space motion with default interpolation**

```python
import numpy as np

# Move the gripper to a new 3D position and orientation (4x4 matrix)
target_pose = np.array([
    [0, 0, -1, 0.3],
    [0, 1, 0, -0.4],
    [1, 0, 0, -0.3],
    [0, 0, 0, 1]
])

reachy.r_arm.goto(target_pose)
```

**What it does:**  
Moves the end effector to the given pose in Cartesian space using the default interpolation mode (`minimum_jerk`) and joint space interpolation.

> 🧠 To better understand how to construct a correct 4x4 target_pose matrix for Cartesian movements, check out the next page: [Use arm kinematics]({{< ref "developing-with-reachy-2/basics/4-use-arm-kinematics" >}}).

---

**🦾 Example 5: Cartesian interpolation in Cartesian space**

```python
reachy.r_arm.goto(
    target_pose,
    interpolation_space='cartesian_space'
)
```

**What it does:**  
Instead of interpolating each joint directly, this uses Cartesian interpolation to smoothly move the gripper between poses, with IK computing intermediate joint positions.

---

**🦾 Example 6: Elliptical interpolation with upward arc**

```python
reachy.r_arm.goto(
    target_pose,
    interpolation_space='cartesian_space',
    interpolation_mode='elliptical',
    arc_direction='above'
)
```

**What it does:**  
Moves the gripper in an arc that curves **upward** between the current and target pose.

---

**🦾 Example 7: Custom elliptical interpolation with secondary radius**

```python
reachy.r_arm.goto(
    target_pose,
    interpolation_space='cartesian_space',
    interpolation_mode='elliptical',
    arc_direction='left',
    secondary_radius=0.1
)
```

**What it does:**  
Moves the gripper along a leftward elliptical arc, with a custom arc radius of 10 cm from the straight line connecting the start and end pose.

---

### translate_by() / rotate_by()

*Simplifying Cartesian motions with `translate_by()` and `rotate_by()`!*

When working in **Cartesian space**, you often need to compute a new 4×4 pose matrix to describe where you want the gripper to move. Manually building these matrices can be complex and error-prone—especially when dealing with rotations and different coordinate frames.

To make this easier, Reachy 2 SDK provides built-in helper functions:
- **`translate_by()`**: 
    This function allows you to move the gripper **relative to its current pose** by specifying a translation vector in meters.

    For example:
    ```python
    reachy.r_arm.translate_by(x=0, y=0, z=0.1, frame="robot")
    ```
    This moves the gripper **10 cm upward** in Reachy's base coordinate frame (positive z-axis of the robot).
    
    ---

- **`rotate_by()`**: 
    Similarly, `rotate_by()` lets you apply a **relative rotation** to the gripper’s current pose, using angles (in degrees by default, but you can use radians with `degrees=False`).

    For example:
    ```python
    reachy.r_arm.rotate_by(roll=0, pitch=0, yaw=20, frame="gripper")
    ```
    This rotates the gripper by **20° around its own z-axis**, meaning the motion is done in the **gripper's local frame**.

#### Frames of Reference

You can specify the frame in which the motion is applied using the `frame` parameter:
- `"robot"`: motion is relative to the **robot’s base**.
- `"gripper"`: motion is relative to the **gripper’s pose**.  


#### Goto-Based Functions

These functions compute the **necessary target pose** behind the scenes and send the appropriate **`goto()` command** for you — making it easier to chain natural translations or rotations without needing to manipulate matrices directly.  

Both `translate_by()` and `rotate_by()` are goto-based functions. This means:
- They follow the same internal mechanisms as `goto()`
- They are **stackable**: you can queue multiple motions
- They are **cancelable**: you can interrupt them using the appropriate cancel method
- They support most standard `goto()` parameters

**Important notes on relative behavior**  
These motions are computed relative to the target pose of the most recent `goto()` command — whether that command is currently executing or is queued.

If no `goto()` command is playing, the movement will be computed relative to the gripper’s current pose.


**⚠️ Warning: Effect of cancelled goto**  
If the last `goto()` command is canceled after being issued, any subsequent `translate_by()` or `rotate_by()` calls will still compute their motion based on the original target of the canceled command, not the actual gripper position at cancellation time or the previous `goto()`.  
This means:
- The computed motion remains unchanged even if the prior `goto()` was interrupted.
- The final pose will still be relative to the intended (but not reached) target of that canceled movement.  

---

## Read arm position

### Joint space: get_current_positions()

You can retrieve the values from each **arm joint** using the **`get_current_positions()`** method.  

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


### Cartesian space: forward_kinematics()

You can get the end effector position of Reachy in Reachy 2 coordinate system using forward kinematics.  

Call:
```python
reachy.l_arm.forward_kinematics()
```
to get the position of the left gripper in Cartesian space.

> Read next section on [Use arm kinematics]({{< ref "developing-with-reachy-2/basics/4-use-arm-kinematics" >}}) to better understand the use of the `forward_kinematics()` method.  

## Gripper control

The gripper can be controlled in different ways:  
- using its own **`goto()`** functions for configurable, queued motions
- or with simpler, immediate commands such as **`open()`**, **`close()`**, and **`set_opening()`** (which are not goto()-type functions).

> Note that there is a smart gripper control that will stop the gripper from reaching any closed / partially-closed position if an object is detected while closing.

### goto()

The gripper now has its own **`goto()`** method, which can be accessed using:

```python
reachy.r_arm.gripper.goto(50)
```

#### Standard gotos parameters
This method allows you to send a target position to the gripper and provides several parameters to customize its behavior, already seen in the page [2. Understand gotos in Reachy 2]({{< ref "developing-with-reachy-2/basics/2-understand-gotos" >}}):
- **duration** *(float)* – Specifies the duration of the movement in seconds, which is of 2 seconds by default.
```python
reachy.r_arm.gripper.goto(50, duration=3)
```
- **wait** *(bool)* – If set to True, the method becomes blocking and waits until the movement is complete.
For example this call will block until the gripper has fully completed its movement:

```python
reachy.r_arm.gripper.goto(50, wait=True)
```

- **interpolation_mode** *(str)* – Defines the trajectory profile used to reach the target. Two options are available:  
    - 'minimum_jerk' (default) – Smooth motion with minimal jerk.  
    - 'linear' – Straightforward, linear interpolation.

This command moves the gripper with a linear trajectory instead of the default smooth minimum jerk motion:
```python
reachy.r_arm.gripper.goto(30, interpolation_mode='linear')
```

#### Unit parameters
By default, the target value is interpreted in **degrees**. However, you are **not limited to degrees**—you can also choose to:

- Use **radians** by passing `degrees=False`:
```python
reachy.r_arm.gripper.goto(0.87, degrees=False)
```

- Use a **percentage** of opening with `percentage=True`:

```python
reachy.r_arm.gripper.goto(50, percentage=True)
```

This gives you flexible control over the gripper, depending on how you prefer to express its position: in degrees, radians, or as a percentage of full opening.



> Combine the options to make your own control:
>
>```python
>reachy.r_arm.gripper.goto(70, wait=True, interpolation_mode='linear')
>```
>
>This will:
>- move the gripper to 70 degrees (or 70% if `percentage=True` is used),
>- use linear interpolation for the motion,
>- and wait until the movement is complete before returning control to the program.

### open() / close()

To **open the grippers**, call the **`open()`** method on the desired gripper.  
It will open it entirely:
```python
reachy.r_arm.gripper.open()
```

To **close the grippers**, call the **`close()`** method on the desired gripper.  
It will close the gripper with the appropriate value, which means it will be entirely closed if there is no object to grasp, or set a suitable value if an object has been detected in the gripper during the closing:
```python
reachy.r_arm.gripper.close()
```

**⚠️ Important: These functions are **not** goto-type calls**

Be aware that the **`open()`** and **`close()`** methods controlling the gripper **are not** `goto()`-type functions. This means:

- They are **not stacked** like `goto()` calls.
- They **cannot be made blocking** using a `wait=True` parameter.

When you call one of these functions, it is executed **immediately**, regardless of any `goto()` motions that may already be queued for the gripper.  
<br>
> As a result, **it is strongly recommended to avoid mixing `goto()` calls and non-`goto()` commands**, as this may lead to unpredictable behavior.  

<br>

**🧩 Making `open()` / `close()` functions blocking**

These actions are non-blocking, meaning that the rest of your program won't wait for the action to complete. But you can manually wait for their execution to finish using the is_moving() method:

```python
reachy.r_arm.gripper.close()

# Wait for the gripper to finish opening
while reachy.r_arm.gripper.is_moving():
    time.sleep(0.05)

reachy.r_arm.gripper.open()
```

### set_opening()

The opening value corresponds to a **percentage of opening**, which means:
- 0 is closed
- 100 is open


You can control the opening of the gripper using the **`set_opening()`** method. 

Send your custom opening value, between 0 and 100, to the gripper with:
```python
reachy.r_arm.gripper.set_opening(50)  # half-opened
```

Like `open()` and `close()` functions, **these actions are  not goto-type calls**, so non-blocking, meaning that the rest of your program won't wait for the action to complete (see [open() / close() section]({{< ref "developing-with-reachy-2/basics/3-basic-arm-control#open--close" >}}) for more explanations).  
You can use the boolean `is_moving()` to make it blocking: 

```python
reachy.r_arm.gripper.set_opening(70)
while reachy.r_arm.gripper.is_moving(): 
  time.sleep(0.1)
reachy.r_arm.gripper.set_opening(10)
```

### Read gripper position

The default parallel gripper is a specific actuator with a single joint, so you can directly read its **present_position** doing:
```python
reachy.r_arm.gripper.present_position
>>> 50.04
```

You can also read the **opening** of the gripper, still as a percentage (0 is closed):

```python
reachy.r_arm.gripper.get_current_opening()
>>> 20  # almost closed
```
