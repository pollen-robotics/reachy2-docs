---
title: "Hello World"
description: "First SDK connection with your Reachy"
date: 2023-07-25T18:50:04+02:00
lastmod: 2023-07-25T18:50:04+02:00
draft: false
images: []
type: docs
toc: true
weight: "40"
---

## Enable cameras for the SDK

### SR camera
The SR camera is unplugged by default.  
If you want to use it, plug the SR camera on the robot's computer remaining USB port (2).

{{< img-center "images/sdk/getting-started/plugged-sr.png" 400x "" >}}

> Make sure to unplug it if you want to use the teleoperation.

### Teleop cameras
The teleop cameras are shared between the teleop service and the SDK server, and can only be used by one at the same time.  
In order to be able to use the teleop cameras with the SDK:
1. Go to the dashboard
2. Stop [webrtc service in the services tab]({{< ref "/dashboard/content/services" >}})

{{< img-center "images/sdk/first-moves/stop-webrtc-service.png" 600x "" >}}

## Connect to your robot

Now you should be able to connect to your Reachy 2 and check that everything is ok. As we spoiled in the previous section, to connect to your robot, you simply need to run the following code:

```python
from reachy2_sdk import ReachySDK

# Replace with the actual IP you've found.
reachy = ReachySDK(host='the.reachy.ip.found.')
```

Before diving into the next chapters that will guide you in the depth of what you can do with the Reachy SDK, here is a quick preview.

## Getting joints state

To make sure everything is working fine, let's check the position of its joints. We won't go into details here as we will detail everything later.

To get the state of a joint, you can access the *joints* attribute that contains all joints and iterate over its content:

```python
for name, joint in reachy.joints.items(): 
    print(f'Joint "{name}" is at pos {joint.present_position} degree.') 
```

Will show something like:
```python
Joint "r_arm.shoulder.pitch" is at pos -3.6 degree.
Joint "r_arm.shoulder.roll" is at pos 1.5 degree.
Joint "r_arm.elbow.yaw" is at pos -3.1 degree.
Joint "r_arm.elbow.pitch" is at pos 2.0 degree.
Joint "r_arm.wrist.roll" is at pos -54.4 degree.
Joint "r_arm.wrist.pitch" is at pos -0.9 degree.
Joint "r_arm.wrist.yaw" is at pos -20.7 degree.
Joint "l_arm.shoulder.pitch" is at pos 43.0 degree.
Joint "l_arm.shoulder.roll" is at pos 0.8 degree.
Joint "l_arm.elbow.yaw" is at pos 0.5 degree.
Joint "l_arm.elbow.pitch" is at pos 1.2 degree.
Joint "l_arm.wrist.roll" is at pos 0.1 degree.
Joint "l_arm.wrist.pitch" is at pos 0.1 degree.
Joint "l_arm.wrist.yaw" is at pos 1.1 degree.
Joint "head.neck.roll" is at pos 4.5 degree.
Joint "head.neck.pitch" is at pos -0.7 degree.
Joint "head.neck.yaw" is at pos -1.9 degree.
```

Note that we have accessed the attribute *present_position* to get the joint actual position. You can access the position of a specific joint by using its full name (meaning the part it is attached to plus its name). For instance, to get the position of the 'left shoulder pitch':

```python
>>> print(reachy.l_arm.shoulder.pitch.present_position)
-3.6
```

You can also get a resume of the joint state by doing:
```python
>>> print(reachy.l_arm.shoulder.pitch)
<OrbitaJoint axis_type="pitch" present_position=-3.6 goal_position=0.0>
```

If you did not run anything else, your robot should be compliant (meaning you can freely move it). You can try to move it and re-run the code above. You should see that without doing anything specific, the positions are automatically updated.

## Seeing through Reachy 2's cameras

Assuming, you are still connected (otherwise, simply reconnect), we will now display what Reachy sees as an [OpenCV window](https://opencv.org). 

```python
import cv2 as cv

while reachy.cameras.teleop.capture():
    l_frame = reachy.cameras.teleop.get_frame(CameraView.LEFT)
    r_frame = reachy.cameras.teleop.get_frame(CameraView.RIGHT)
    cv2.imshow("left", l_frame)
    cv2.imshow("right", r_frame)
    cv2.waitKey(1)
```

You should now see what Reachy sees!

To stop the code, press Ctrl-C.

