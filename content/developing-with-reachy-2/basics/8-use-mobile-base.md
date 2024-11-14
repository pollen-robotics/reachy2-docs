---
title: "8. Use the mobile base"
description: "First mobile base movements using the Python SDK"
lead: "First mobile base movements"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "SDK basics"
weight: 270
toc: true
---


## What is accessible on the mobile base
The following elements are accessible with *reachy.mobile_base*:
* mobile base version,
* battery level,
* odometry of the base,
* control and drive modes,
* goto and set_speed methods to make the mobile base move.

## Frames

### Robot frame
The robot frame or egocentric frame or base_link frame is **rigidly attached to the robot**. Its (0, 0) point is the projection on the floor of the center of the mobile base.
**X in front, Y to the left, Theta positive counterclockwise.**

{{< img-center "images/sdk/mobile-base/robot_frame.png" 400x "" >}}

*It follows ROS' conventions described in [REP 105 “Coordinate Frames for Mobile Platforms”](https://www.ros.org/reps/rep-0105.html)*

### Odom frame
The odom frame is a **world-fixed frame**. The position (x, y, theta) of the robot in the odom frame is continuously updated by the HAL through odometry calculations. These calculations currently only use the measurements from the wheels to estimate the movement of the robot. While the position of the robot is continuous, **it should never be relied upon for long-term reference as it will always drift.**

{{< img-center "images/sdk/mobile-base/odom_frame.png" 400x "" >}}

The initial position of the odom frame matches the position of the robot when the HAL was started. The odom frame can also be reset to the current position of the robot using:
  ```python
  reachy_mobile.mobile_base.reset_odometry()
  ```

## Moving the mobile base

### Using the goto method
The `goto()` method expects a goal position in the [odom frame]({{< ref "/developing-with-reachy-2/basics/8-use-mobile-base#odom-frame" >}}), composed of 3 elements: x in meters, y in meters and theta in degrees.

:warning: The most important thing to get used to, is the fact that the odom frame is world-fixed and that the position of the robot is always updated as long as the HAL is running (the HAL is automatically started during the robot boot-up). So by default, **if you ask for a ```goto(0, 0, 0)``` the robot will try to comeback to the position it was at boot-up.**

To perform a goto relative to the current position of the robot, use the method ```reset_odometry()```. For example, create an instance of reachy with:

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='your-reachy-ip')
```

Reset the odometry frame, and ask the robot to move 50cm in front of it:
```python
reachy.mobile_base.reset_odometry()
reachy.mobile_base.goto(x=0.5, y=0.0, theta=0.0)
```
Now, ask for a goto(0,0,0). The robot should go back to its previous position:
```python
reachy_mobile.mobile_base.goto(x=0.0, y=0.0, theta=0.0)
```

We recommend taking the time to play around with this concept.

> Note the **goto() method of the mobile base <u>does not</u> work like [moves methods explained previously]({{< ref "/developing-with-reachy-2/basics/8-use-mobile-base">}})**  


By default, the robot will always try to reach the goal position, meaning that even if the robot did reach its position and you push it, it will try to come back to the goal position again.

However, you can define two types of stop conditions through optional parameters.  

- A timeout, expressed in seconds. The robot stops the goto when the elapsed time since the start of the command is superior to the timeout. There is a **default timeout that scales with the distance asked by the goto**.  

- A spatial tolerance, expressed with 4 values: delta_x (the error in m along the X axis), delta_y (the error in m along the Y axis), delta_theta (the angle error in deg) and distance (the l2 distance between the current position and the goal position in m). The robot stops the goto when it is close enough to satisfy all 4 conditions simultaneously.

### Using the set_speed method
Since the mobile base is holonomic, the `set_speed()` method expects 3 speed commands expressed in the robot frame:
- x_vel, in m/s. The instantaneous speed positive in front of the robot.
- y_vel, in m/s. The instantaneous speed positive to the left of the robot.
- rot_vel, in deg/s. The instantaneous rotational speed positive counterclockwise.

See the [joy_controller code](https://github.com/pollen-robotics/mobile-base-sdk/blob/main/mobile_base_sdk/examples/scripts/joy_controller.py) for a working example.

:bulb: As a safety measure, the HAL will stop the wheels if it didn't receive a new goal speed in the last 200ms.

:bulb: The way this is implemented in the HAL is simply to listen to the /cmd_vel topic, apply some smoothing, perform the kinematic calculations and send the speed commands to the wheels. This makes it very easy to create control interfaces using ROS, see the [keyboard example](https://github.com/pollen-robotics/zuuu_hal/blob/main/examples/zuuu_teleop_keyboard.py) or the [joy controller example](https://github.com/pollen-robotics/zuuu_hal/blob/main/examples/zuuu_teleop_joy.py).

*Note: the HAL has a drive mode to set speed commands for variable amounts of time. Instead of relying on a topic, it creates a service. The niche usage didn't warrant the added complexity, so the interface with the SDK was not made. But if needed, it exists!*
