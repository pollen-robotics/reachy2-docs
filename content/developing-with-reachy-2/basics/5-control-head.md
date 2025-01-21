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
---
<br>

> You can choose to follow our online documentation or to make your Reachy move by following the [notebook n°4](https://github.com/pollen-robotics/reachy2-sdk/blob/develop/src/examples/4_head_control.ipynb). 


## Head presentation

Reachy 2's head is mounted on an Orbita3D actuator, referred to as the **neck** actuator, giving 3 degrees of freedom to control the head orientation.  

> Note: The antennas control will soon be integrated into the SDK! Stay tuned!

<p align="center">
    {{< video "videos/sdk/orbita.mp4" "80%" >}}
</p>

Before starting to control it, connect to your Reachy and turn it on. As in the other pages:

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='10.0.0.201')  # Replace with the actual IP

reachy.head
>>> <Head on=True actuators= 
neck: <Orbita3d on=True joints=
	<OrbitaJoint axis_type="roll" present_position=-0.0 goal_position=0.0 >
	<OrbitaJoint axis_type="pitch" present_position=-10.0 goal_position=-10.0 >
	<OrbitaJoint axis_type="yaw" present_position=0.0 goal_position=0.0 >


reachy.head.turn_on()  # Turn on only the head
```

You could, of course, turn on the whole robot by calling `reachy.turn_on()` directly.

There are several ways to control the head movements:
- Using the `look_at()`, `goto()`, and `rotate_by()` methods, called directly at the **head** level. These methods work as [move commands described previously]({{< ref "developing-with-reachy-2/basics/2-understand-moves" >}}).
- Controlling the joints' goal positions, namely **reachy.head.neck.roll**, **reachy.head.neck.pitch**, and **reachy.head.neck.yaw**.

## Head moves methods

### look_at()

You can use the `look_at()` function to make the head look at a specific point in space. This point must be given in Reachy 2's coordinate system in **meters**. The coordinate system is the one we have seen previously:

* The X axis corresponds to the forward arrow.
* The Y axis corresponds to the right-to-left arrow.
* The Z axis corresponds to the up arrow.

The origin of this coordinate system is located in the upper part of the robot trunk.

{{< img-center "images/sdk/first-moves/reachy_frame.jpg" 400x "" >}}

If you want Reachy to look forward, you can send it the following: 

```python
reachy.head.turn_on() # Don't forget to put the head in stiff mode
reachy.head.look_at(x=0.5, y=0, z=0.2, duration=1.0)
```

You can use multiple `look_at()` calls to chain head movements or even chain them with the `rotate_by()` and `goto()` functions described below. As seen in the [Understand moves in Reachy 2 section]({{< ref "developing-with-reachy-2/basics/2-understand-moves" >}}), the commands on the head will be stacked.

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

#### From joint positions

You directly control the joints of the neck, giving the roll, pitch, and yaw angles in degrees. The rotation is performed in the order: roll, pitch, yaw, within the Orbita3D coordinate system.

{{< img-center "images/sdk/first-moves/orbita_rpy.png" 400x "" >}}

To make the robot look slightly downward:
```python
reachy.head.turn_on() # Don't forget to put the head in stiff mode
reachy.head.goto([0, 10, 0], duration=1.0)
```

#### From quaternion

You can control the head with a quaternion. Use the [pyquaternion library](https://kieranwynn.github.io/pyquaternion/) to create suitable quaternions for this method.

```python
from pyquaternion import Quaternion

q = Quaternion(axis=[1, 0, 0], angle=3.14159265 / 4) # Tilt head about 45° to the right
reachy.head.goto(q)
```

### rotate_by()

You can rotate the head from its current position using the `rotate_by()` function. Specify angular degree values for roll, pitch, and yaw in either Reachy's or the head's frame. 

```python
reachy.head.rotate_by(roll=0, pitch=0, yaw=20, frame='head')

reachy.head.rotate_by(roll=-30, pitch=0, yaw=0, frame='robot')
```

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

- **Cartesian space**: `get_current_orientation()` will give the head orientation as a quaternion in the robot's frame.
- **Joint space**: `get_current_positions()` will give the neck's roll, pitch, and yaw `present_position`.

:warning: *There is a 10-degree offset between cartesian space and joint space. We recommend avoiding mixing them.*

### In cartesian space:

```python
reachy.head.get_current_orientation()
>>> Quaternion(0.9794632485822068, 0.10189819035488734, -0.01081920496959773, 0.17364172391166605)
```

### In joint space:

If you prefer using roll, pitch, yaw angles rather than working with quaternions, you can retrieve those values from the **neck joints**.

```python
reachy.head.get_current_positions()
>>> [11.881595589573665, -8.976164597791765, 22.07170507647743]
```

Now that we can move the head, let's focus on its cameras!
