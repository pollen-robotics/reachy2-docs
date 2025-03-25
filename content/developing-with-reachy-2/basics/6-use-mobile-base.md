---
title: "6. Use the mobile base"
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
weight: 250
toc: true
---
<br>

> You can choose to follow our online documentation or directly test the mobile base movements on your Reachy by following the [notebook n°6](https://github.com/pollen-robotics/reachy2-sdk/blob/develop/src/examples/6_mobile_base.ipynb). 

## What is accessible on the mobile base
The following elements are accessible through *reachy.mobile_base*:
* Battery level
* Odometry of the base
* Lidar
* Control and drive modes
* `goto`, `translate_by`, `rotate_by`, and `set_speed` methods to make the mobile base move.

## Information

You can find details by calling the `mobile_base` attribute directly:
```python
reachy.mobile_base
>>> <MobileBase on=True 
 lidar_safety_enabled=True 
 battery_voltage=25.5>
```

You can retrieve the odometry by calling the `get_current_odometry()` function:
```python
reachy.mobile_base.get_current_odometry()
>>> {'x': 0.0018306385027244687,
 'y': 0.0533282645046711,
 'theta': -7.456543983885954,
 'vx': 0.0,
 'vy': 0.0,
 'vtheta': 0.0}
```

## Frames

### Robot frame
The robot frame, also called the egocentric or `base_link` frame, is **rigidly attached to the robot**. Its (0, 0) point is the projection on the floor of the center of the mobile base.
**X points forward, Y points left, and Theta increases counterclockwise.**

{{< img-center "images/sdk/mobile-base/robot_frame.png" 400x "" >}}

*It follows ROS' conventions described in [REP 105 “Coordinate Frames for Mobile Platforms”](https://www.ros.org/reps/rep-0105.html)*

### Odom frame
The odom frame is a **world-fixed frame**. The position (x, y, theta) of the robot in the odom frame is continuously updated by the HAL through odometry calculations. These calculations currently rely solely on wheel measurements to estimate the robot's movement. While the robot's position is continuous, **it should never be used as a long-term reference due to inevitable drift.**

{{< img-center "images/sdk/mobile-base/odom_frame.png" 400x "" >}}

The initial position of the odom frame matches the robot's position at startup. The odom frame can be reset to the robot's current position using:
```python
reachy_mobile.mobile_base.reset_odometry()
```

## Moving the mobile base

### Using the `goto` method
The `goto()` method expects a goal position in the [odom frame]({{< ref "/developing-with-reachy-2/basics/6-use-mobile-base#odom-frame" >}}), consisting of three elements: x (meters), y (meters), and theta (degrees).

:warning: **Important:** The odom frame is world-fixed, and the robot's position is continuously updated as long as the HAL is running (the HAL starts automatically when the robot boots). By default, **if you ask for a `goto(0, 0, 0)`, the robot will attempt to return to its position at boot-up.**

To perform a `goto` relative to the robot's current position, use the `reset_odometry()` method. For example, create an instance of Reachy with:

```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='your-reachy-ip')
```

Reset the odometry frame and move the robot 50 cm forward:
```python
reachy.mobile_base.reset_odometry()
reachy.mobile_base.goto(x=0.5, y=0.0, theta=0.0)
```
Now, request `goto(0, 0, 0)`. The robot will return to its previous position:
```python
reachy_mobile.mobile_base.goto(x=0.0, y=0.0, theta=0.0)
```

We recommend experimenting with this concept to get familiar.

> **Note:** The `goto()` method for the mobile base does **not** work like the [move methods explained earlier]({{< ref "/developing-with-reachy-2/basics/3-basic-arm-control#goto" >}}).

Mobile base `goto` commands are always blocking. This means subsequent code will not execute until the `goto` finishes. 

By default, the robot will continuously try to maintain the goal position. For example, if the robot reaches the target and is then pushed, it will attempt to return to the goal position.

You can define two types of stop conditions through optional parameters:
- **Timeout:** Stops the `goto` after a specified duration (in seconds). There is a **default timeout** that scales with the distance of the `goto` command.
- **Spatial tolerance:** Stops the `goto` when the robot is within specified tolerances for x, y, theta, and Euclidean distance.

### Using the `translate_by` / `rotate_by` methods

Unlike the `goto` method, which relies on the odometric frame, the `translate_by` and `rotate_by` methods configure translations and rotations relative to the robot's **current position**.

> These methods work similarly to `goto` but use a different frame.

To rotate the robot by 90° and move 30 cm forward:
```python
reachy.mobile_base.rotate_by(theta=90)
time.sleep(2)
reachy.mobile_base.translate_by(x=0.3, y=0.0)
```

With these methods, there is no need to reset the odometry before performing movements.

### Using the `set_speed` method
Since the mobile base is holonomic, the `set_goal_speed()` method expects three speed commands in the robot frame:
- **x_vel:** Linear speed in m/s along the X-axis (positive forward).
- **y_vel:** Linear speed in m/s along the Y-axis (positive left).
- **rot_vel:** Rotational speed in deg/s (positive counterclockwise).

```python
# Set the speed
reachy.mobile_base.set_goal_speed(x=1.0, y=1.0, theta=2)
# Send the speed command
reachy.mobile_base.send_speed_command()
```

:bulb: For safety, the HAL will stop the wheels if it doesn’t receive a new speed command within 200 ms.

:bulb: The HAL implementation listens to the `/cmd_vel` topic, applies smoothing, performs kinematic calculations, and sends speed commands to the wheels. This makes it easy to create control interfaces using ROS. See the [keyboard example](https://github.com/pollen-robotics/zuuu_hal/blob/main/examples/zuuu_teleop_keyboard.py) or the [joy controller example](https://github.com/pollen-robotics/zuuu_hal/blob/main/examples/zuuu_teleop_joy.py).

*Note: The HAL includes a drive mode for speed commands with variable durations. While it creates a service instead of relying on a topic, the niche use case did not warrant SDK integration. However, it exists if needed!*

## Lidar

A safety measure prevents the robot from approaching obstacles detected by its lidar. The mobile base slows down as it nears an obstacle and stops completely if the obstacle gets too close.

If you need to get closer, you can disable this safety feature via the SDK:

```python
reachy.mobile_base.lidar.safety_enabled(False)
```

Congratulations! You now know all the basics of Reachy's SDK! Let's move on to implementing complex behaviors! 
