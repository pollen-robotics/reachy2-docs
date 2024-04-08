---
title: "5. Control the head"
description: "Control the head"
lead: ""
date: 2023-07-25T17:38:48+02:00
lastmod: 2023-07-25T17:38:48+02:00
draft: false
type: docs
images: []
toc: true
weight: "110"
---

## Head presentation

Reachy 2's head is mounted on an Orbita3D actuator, referred to as the **neck** actuator, giving 3 degrees of freedom to control the head orientation.  
> Note : the antennas are not motorized for the moment

<p align="center">
    {{< video "videos/sdk/orbita.mp4" "80%" >}}
</p>

The complete head's specifications are given [here]({{< ref "advanced/specifications/head-specs" >}}).

Before starting to control it, connect to your Reachy and turn it on. As in the other pages:

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='192.168.0.42')  # Replace with the actual IP

reachy.head
>>> <Head ??>

reachy.head.turn_on()  # we turn on only the head
```

You could of course turn on the whole robot by calling `reachy.turn_on()` directly.

There are several ways to control the head movements:
- using the `look_at()`, `rotate_to()` and `orient()` methods, called directly at the **head** level. These methods works as [move commands described previously]({{< ref "sdk/first-moves/moves" >}}).
- controlling the joints goal positions, namely **reachy.head.neck.roll**, **reachy.head.neck.pitch** and **reachy.head.neck.yaw**.

## Head moves methods

### look_at()

You can use the `look_at()` function to make the head look at a specific point in space. This point must be given in Reachy 2's coordinate system in **meters**. The coordinate system is the one we have seen previously:

* the X axis corresponds to the foward arrow,
* the Y axis corresponds to the right to left arrow,
* the Z axis corresponds to the up arrow.

The origin of this coordinate system is located in the upper part of the robot trunk.

{{< img-center "images/sdk/first-moves/reachy_frame.jpg" 400x "" >}}

If you want Reachy to look forward you can send it the following.

```python
reachy.head.turn_on() # Don't forget to put the hand in stiff mode
reachy.head.look_at(x=0.5, y=0, z=0.2, duration=1.0)
```

You can use multiple *look_at* to chain head movements, or even chain them with the `rotate_to()` and `orient()` functions described below. As seen in the [Understand moves in Reachy 2 section]({{< ref "sdk/first-moves/moves" >}}), the commands on the head will be stacked.

<p align="center">
    {{< video "videos/sdk/look.mp4" "80%" >}}
</p>

Here is the code to reproduce this.

```python
import time

look_right = reachy.head.look_at(x=0.5, y=-0.5, z=0.1, duration=1.0)
look_down = reachy.head.look_at(x=0.5, y=0, z=-0.4, duration=1.0)
look_left = reachy.head.look_at(x=0.5, y=0.3, z=-0.3, duration=1.0)
look_front = reachy.head.look_at(x=0.5, y=0, z=0, duration=1.0)
```

The best way to understand how to use the *look_at* is to play with it. Picture a position you would like Reachy's head to be in, guess a point which could match for the *look_at* and check if you got it right!

Another cool thing is that we can combine Reachy's kinematics with the *look_at* so that Reachy's head follows its hand!

<p align="center">
    {{< video "videos/sdk/look_at_hand.mp4" "80%" >}}
</p>

```python
reachy.turn_on('head')

x, y, z = reachy.r_arm.forward_kinematics()[:3, -1]
reachy.head.look_at(x=x, y=y, z=z, duration=1.0)

time.sleep(0.5)

while True:
    x, y, z = reachy.r_arm.forward_kinematics()[:3, -1]
    reachy.head.look_at(x=x, y=y, z=z, duration=0.1)
```

What the code says is that we compute the [forward kinematics of Reachy's right arm]({{< ref "sdk/first-moves/kinematics#forward-kinematics" >}}), and the x, y, z of Reachy's right end-effector in the Reachy's coordinates system will be the coordinates of the point used by the *look_at*.

### rotate_to()

The `rotate_to()` function is another way to control the head. You directly control the joint of the neck, giving the roll, pitch and yaw angles in degrees. The rotation is made in the order: roll, pitch, yaw, in the Orbita3D coordinate system.

{{< img-center "images/sdk/first-moves/orbita_rpy.png" 400x "" >}}

To make the robot looks a little down:
```python
reachy.head.turn_on() # Don't forget to put the hand in stiff mode
reachy.head.rotate_to(roll=0, pitch=-10, yaw=0, duration=1.0)
```

### orient()

The last method to control the head is the `orient()` method. You can control the head with a quaternion.

You can use [pyquaternion library](https://kieranwynn.github.io/pyquaternion/) to create suitable quaternion for this method.

```python
from pyquaternion import Quaternion

q = Quaternion(axis=[1, 0, 0], angle=3.14159265)
reachy.head.turn_on()
reachy.head.orient(q)
```

## Joint's goal_position


## Read head position

You can read the head orientation in two different ways:

- using the `get_orientation()` method, which returns a quaternion
- using the `get_joints_positions()` method, which the neck's roll, pitch and yaw present_position.

### get_orientation()

```python
q = reachy.head.get_orientation()
print(q)
>>> ??
```

### get_joints_positions()

In case you feel more comfortable using roll, pitch, yaw angles rather than working with quaternions, you can retrieve those values from the **neck joints**.

```python
reachy.head.rotate_to(20, 30, -10)
time.sleep(2)
reachy.head.get_joints_positions()
>>> [20, 30, -10]   #  roll=20, pitch=30, yaw=-10
```

Be careful that contrary to the quaternion that offers a unique representation of a rotation, it is not the case of the euler angles. Several angles combination can lead to the same orientation in space. For example:

```python
reachy.head.rotate_to(70, -100, 80)  #  roll=70, pitch=-100, yaw=80
time.sleep(2)
reachy.head.get_joints_positions()
>>> [-110, -80, -100]   #  roll=-110, pitch=-80, yaw=-100
```

The values are different, nevertheless it is the same final orientation. You can convince yourself doing:
```python
reachy.head.rotate_to(-110, -80, -100)
```
The head won't move.