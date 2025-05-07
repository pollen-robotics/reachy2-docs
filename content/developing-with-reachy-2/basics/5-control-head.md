---
title: "5. Control the head"
description: "First head movements using the Python SDK"
lead: "First head movements"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "SDK basics"
weight: 240
toc: true
seo:
  title: "How to Control Reachy 2’s Head and Antennas: Look At, Rotate, and Animate"
  description: "Learn to control Reachy 2’s head and antennas using look_at, goto, and rotate_by commands. Master pitch, roll, yaw movements, antenna animations, and read positions in joint and Cartesian space."
---
<br>

> You can choose to follow our online documentation or to make your Reachy move by following the [notebook n°4](https://github.com/pollen-robotics/reachy2-sdk/blob/develop/src/examples/4_head_control.ipynb). 


## Head presentation

Reachy 2's head is mounted on an Orbita3D actuator, referred to as the **neck**.  

The complete **head** is composed of the following elements:
- **neck**, a 3-degree-of-freedom actuator (Orbita3D) that controls the orientation of the head (pitch, roll, and yaw)
- **l_antenna**, the left antenna, modeled as an actuator with a single joint.
- **r_antenna**, the right antenna, modeled as an actuator with a single joint.  


<p align="center">
    {{< video "videos/sdk/orbita.mp4" "80%" >}}
</p>

### The actuators

Before starting to control it, connect to your Reachy and turn it on. As in the other pages, let's check the head part:

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='10.0.0.201')  # Replace with the actual IP

reachy.head
>>> <Head on=False actuators=
	neck: <Orbita3d on=False joints=
	<OrbitaJoint axis_type="roll" present_position=0.24 goal_position=0.24 >
	<OrbitaJoint axis_type="pitch" present_position=-8.44 goal_position=-8.44 >
	<OrbitaJoint axis_type="yaw" present_position=14.01 goal_position=14.01 >
>
	l_antenna: <Antenna on=False joints=
	<DynamixelMotor on=False present_position=2.37 goal_position=2.37 >
>
	r_antenna: <Antenna on=False joints=
	<DynamixelMotor on=False present_position=-5.54 goal_position=-5.54 >
>
>

reachy.head.turn_on()  # Turn on only the head, making neck and both antennas stiff
```

You could, of course, turn on the whole robot by calling `reachy.turn_on()` directly.

### The joints

It works exactly the same as for the arms, you can access each joint from the actuator it belongs to, for example `reachy.head.neck.pitch`.  
As said previously, the antennas are actuators with a single joint, that is directly accessed at the antenna'a level.  

```python
reachy.head.joints
>>> {'neck.roll': <OrbitaJoint axis_type="roll" present_position=0.24 goal_position=0.24 >,
'neck.pitch': <OrbitaJoint axis_type="pitch" present_position=-8.44 goal_position=-8.44 >,
'neck.yaw': <OrbitaJoint axis_type="yaw" present_position=14.01 goal_position=14.01 >,
'l_antenna': <DynamixelMotor on=True present_position=2.37 goal_position=2.37 >,
'r_antenna': <DynamixelMotor on=True present_position=-5.54 goal_position=-5.54 >}
```

There are several ways to control the head movements:
- Using the `look_at()`, `goto()`, and `rotate_by()` methods, called directly at the **head** level. These methods work as [goto commands described previously]({{< ref "developing-with-reachy-2/basics/2-understand-gotos" >}}).
- Controlling the joints' goal positions, namely **reachy.head.neck.roll**, **reachy.head.neck.pitch**, and **reachy.head.neck.yaw**.

## Head goto methods

In most cases, when referring to **head movement commands**, we are actually referring to **neck movements**. All motion-related functions available under `reachy.head` affect the **neck**, which is responsible for controlling the orientation of the head.

The **antennas**, while also part of the head, are controlled separately:
- Use `reachy.head.l_antenna` to control the **left antenna**.
- Use `reachy.head.r_antenna` to control the **right antenna**.

Each antenna is treated as an independent actuator with its own motion commands.   
A section is dedicated to the [Antennas control]({{< ref "developing-with-reachy-2/basics/5-control-head#antennas-control" >}}).

The 3 following methods `look_at()`, `goto()` and `rotate_by()` are **goto-based**, meaning they are, as seen in the [Understand gotos in Reachy 2 section]({{< ref "developing-with-reachy-2/basics/2-understand-gotos" >}}):
- **Stackable** (queued in order)
- **Interruptible**
- Support parameters like:
    - `duration`
    - `wait`
	- `interpolation_mode`
	- `degrees` (for joint space)

### look_at()

The **`look_at()`** method makes the head orient itself to **face a 3D point**, expressed in **Reachy’s coordinate system**, in meters. The coordinate system is the one we have seen previously:

* The X axis corresponds to the forward arrow.
* The Y axis corresponds to the right-to-left arrow.
* The Z axis corresponds to the up arrow.

The origin of this coordinate system is located in the upper part of the robot trunk.

{{< img-center "images/sdk/first-moves/reachy_frame.jpg" 400x "" >}}

**🦾 Example 1: Look forward**  
If you want Reachy to look forward, you can send it the following: 

```python
reachy.head.turn_on() # Don't forget to put the head in stiff mode
reachy.head.look_at(x=0.5, y=0, z=0.2, duration=1.0)
```

You can use multiple `look_at()` calls to chain head movements or even chain them with the `rotate_by()` and `goto()` functions described below.

**🦾 Example 2: Chaining look_at**  
<p align="center">
    {{< video "videos/sdk/look.mp4" "80%" >}}
</p>

Here is the code to reproduce this:

```python
import time

look_right = reachy.head.look_at(x=0.5, y=-0.5, z=0.1, duration=1.0)
look_down = reachy.head.look_at(x=0.5, y=0, z=-0.4, duration=1.0)
look_left = reachy.head.look_at(x=0.5, y=0.3, z=-0.3, duration=1.0)
look_front = reachy.head.look_at(x=0.5, y=0, z=0, duration=1.0)
```

The best way to understand how to use the `look_at()` function is to experiment with it. Picture a position you would like Reachy's head to be in, guess a point for the `look_at()` coordinates, and check if you got it right!

**🦾 Example 3: Follow Reachy's hand**  
Another cool thing is combining Reachy's kinematics with the `look_at()` so that Reachy's head follows its hand while you're moving it!

<p align="center">
    {{< video "videos/sdk/look_at_hand.mp4" "80%" >}}
</p>

```python
x, y, z = reachy.r_arm.forward_kinematics()[:3, -1]
reachy.head.look_at(x=x, y=y, z=z, duration=1.0, wait=True)

while True:
    x, y, z = reachy.r_arm.forward_kinematics()[:3, -1]
    reachy.head.look_at(x=x, y=y, z=z, duration=0.1, wait=True)
```

This code calculates the [forward kinematics of Reachy's right arm]({{< ref "developing-with-reachy-2/basics/5-control-head#forward-kinematics" >}}). The x, y, z coordinates of Reachy's right end-effector in Reachy's coordinate system are used as the target for `look_at()`. The loop with a blocking movement (parameter `wait=True`) ensures the head follows the hand at a frequency of 10Hz.

### goto()

The `goto()` function is another way to control the head. There are two ways to use it:
- From joint positions (in joint space).
- From the desired orientation as a quaternion (in cartesian space).

#### In joint space

You directly control the joints of the neck, giving the [roll, pitch, yaw] angles (in degrees by default). The rotation is performed in the order: roll, pitch, yaw, within the Orbita3D coordinate system.

{{< img-center "images/sdk/first-moves/orbita_rpy.png" 300x "" >}}

**🦾 Example 1: Look slightly down**  
To make the robot look slightly downward:
```python
reachy.head.turn_on() # Don't forget to put the head in stiff mode
reachy.head.goto([0, 10, 0], duration=1.0)
```

**🦾 Example 2: Cancel all executing and pending head motions**  
Do not forget you can use all the goto functions described in [Understand gotos in Reachy 2]({{< ref "developing-with-reachy-2/basics/2-understand-gotos" >}}), for example to cancel the moves on Reachy's head:
```python
# Queue up several motions
reachy.head.look_at(x=0.5, y=-0.3, z=0.2, duration=2.0)
reachy.head.goto(roll=-5 , pitch=10, yaw=0, duration=1.0)

# Cancel all head movements
reachy.head.cancel_all_goto()
```

**🦾 Example 3: Use radians instead of degrees**  

```python
# Define a target pose in radians: [roll, pitch, yaw]
# Example: slight downward tilt (pitch = 0.3 rad ≈ 17°)
target_pose_radians = [0.0, 0.3, 0.0]

# Send the command
reachy.head.goto(
    target_pose_radians,
    degrees=False,         # Use radians instead of degrees
    duration=1.5,
    wait=True,
    interpolation_mode='minimum_jerk'
)
```

#### In cartesian space

You can control the head with a quaternion. Use the [pyquaternion library](https://kieranwynn.github.io/pyquaternion/) to create suitable quaternions for this method.

**🦾 Example: Tilt head to the right**  
```python
from pyquaternion import Quaternion

q = Quaternion(axis=[1, 0, 0], angle=3.14159265 / 4) # Tilt head about 45° to the right
reachy.head.goto(q)
```

### rotate_by()

The `rotate_by()` method lets you apply a relative rotation (in degrees by default) from the current pose of the head. Specify angular degree values for roll, pitch, and yaw in either Reachy's or the head's frame. 

#### Frames of Reference

You can specify the frame in which the rotation is applied using the `frame` parameter:
- `"robot"`: motion is relative to the **robot’s base**.
- `"head"`: motion is relative to the **head’s local frame**.  
→ Default frame is "robot"

**🦾 Example 1: Rotations in different frames**  
```python
# Rotate 20° yaw in the head's local frame
reachy.head.rotate_by(yaw=20, frame='head')

# Rotate -30° roll in the robot frame
reachy.head.rotate_by(roll=-30, frame='robot')
```

**🦾 Example 2: Chain look_at() with rotate_by() and goto() (joint space)**  

```python
# Look slightly to the right and wait
reachy.head.look_at(x=0.5, y=-0.3, z=0.1, duration=1.0, wait=True)

# Then rotate head 15° more to the right from its current orientation
reachy.head.rotate_by(yaw=15, frame='head', duration=1.0, wait=True)

# Then use joint-space goto to tilt head slightly down (pitch = 15°)
reachy.head.goto([0, 15, 0], duration=1.5, wait=True, interpolation_mode='linear')
```


**Important notes on relative behavior**  
These motions are computed relative to the target pose of the most recent `goto()` command — whether that command is currently executing or is queued.

If no `goto()` command is playing, the movement will be computed relative to the head’s current pose.

<details id="cancelled-head-goto">
<summary><b>⚠️ Warning: Effect of cancelled goto</b></summary>

If the last `goto()` command is canceled after being issued, any subsequent `rotate_by()` calls will still compute their motion based on the original target of the canceled command, not the actual head orientation at cancellation time or the previous `goto()`.  
This means:
- The computed motion remains unchanged even if the prior `goto()` was interrupted.
- The final pose will still be relative to the intended (but not reached) target of that canceled movement. 

</details>


## Joint's goal_position

The `goal_position` attribute of a joint can be used to set a new joint target position to make it move. However, we recommend using the `goto()` method, which provides better control over the joint's trajectories.

Using `goal_position` will make the motor move **as fast as it can**, so use it carefully.

```python
reachy.head.neck.roll.goal_position = 30
reachy.send_goal_positions()
```

:warning: `goal_position` must be written in **degrees**.

## Read head position

You can read the head positions using:

- **Joint space**: `get_current_positions()` will give the neck's roll, pitch, and yaw `present_position`.
- **Cartesian space**: `get_current_orientation()` will give the head orientation as a quaternion in the robot's frame.


:warning: *There is a 10-degree offset between cartesian space and joint space, as shown in the [hardware guide]({{< ref "hardware-guide/specifications/general#neck" >}}). We recommend avoiding mixing them.*

### Joint space: get_current_positions()

If you prefer using roll, pitch, yaw angles rather than working with quaternions, you can retrieve those values from the **neck joints**.

```python
reachy.head.get_current_positions()
>>> [11.881595589573665, -8.976164597791765, 22.07170507647743]
```

### Cartesian space: get_current_orientation()

```python
reachy.head.get_current_orientation()
>>> Quaternion(0.9794632485822068, 0.10189819035488734, -0.01081920496959773, 0.17364172391166605)
```


Now that we can move the head, let's focus on its cameras!

## Antennas control

Reachy 2's head includes two expressive antennas—**left** and **right**—which can be controlled independently. Each antenna is a simple actuator with **one degree of freedom**, and can be used for animations.

You can access the antennas via:
- `reachy.head.l_antenna` — Left antenna
- `reachy.head.r_antenna` — Right antenna

### goto()
They both expose a `goto()` method, with the same standard parameters and behavior as other actuators in joint space:
- **target** *(float)* – Target position, in degrees by default.
- **duration** *(float)* – Movement duration in seconds.
- **degrees** *(bool)* – If False, interpret the position in radians.
- **wait** *(bool)* – Whether to block until the motion is complete.
- **interpolation_mode** *(str)* – 'minimum_jerk' (default) or 'linear'.

--- 

**🦾 Example 1: Move left antenna to 45° in 1 second**  
```python
reachy.head.l_antenna.goto(45, duration=1.0)
```

---

**🦾 Example 2: Wiggle both antennas at the same time**
```python
# Raise both antennas
reachy.head.l_antenna.goto(60, duration=0.5)
reachy.head.r_antenna.goto(60, duration=0.5)

# Lower both antennas
reachy.head.l_antenna.goto(0, duration=0.5)
reachy.head.r_antenna.goto(0, duration=0.5)
```
---

**🦾 Example 3: Move one antenna after the other and use radians**
```python
import math

# Smooth flick with minimum jerk
reachy.head.l_antenna.goto(90, duration=0.7, interpolation_mode='minimum_jerk', wait=True)
# Move right antenna to π/4 radians (~45°)
reachy.head.r_antenna.goto(math.pi / 4, degrees=False, duration=0.3, interpolation_mode='minimum_jerk')
```


### Read antennas positions

The antenna is an actuator with a single joint, so you can directly read its **present_position** doing:
```python
reachy.head.r_antenna.present_position
>>> 50.04

reachy.head.l_antenna.present_position
>>> 29.03
```

<br>

---

👀 **Still with us?**  
Awesome—just **one more part to go**!  
Discover how to use the mobile base on the next page.