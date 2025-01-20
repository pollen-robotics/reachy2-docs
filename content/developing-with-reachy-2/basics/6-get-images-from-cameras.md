---
title: "6. Get images from cameras"
description: "Images acquisition using the Python SDK"
lead: "Images acquisition "
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

This section assumes that you went through the [Hello World]({{< ref "developing-with-reachy-2/getting-started-sdk/connect-reachy2" >}}) so that you know how to connect to the robot.

Reachy 2 has 2 types of camera:
- the **teleop** cameras, with a right and left cameras, located in Reachy 2's head and used for the teleoperation
- the **SR** camera, which is a depth camera, located in Reachy 2's torso and mainly useful for manipulation tasks

Each camera can be accessed separately through *reachy.cameras*. They both have a right and left view, with the left and right sides considered from Reachy point of view. To be able to specify the view you want to get a frame from, you will need to import CameraView:

```python
from reachy2_sdk.media.camera import CameraView
```

## Enable teleop cameras for the SDK

### SR camera
The SR camera is unplugged by default.  
If you want to use it, plug the SR camera on the robot's computer remaining USB port (2).

{{< img-center "images/sdk/first-moves/plugged-sr.png" 400x "" >}}

> Make sure to unplug it if you want to use the teleoperation.

### Teleop cameras
The teleop cameras are shared between the teleop service and the SDK server, and can only be used by one at the same time.  
In order to be able to use the teleop cameras with the SDK:
1. Go to the dashboard
2. Stop webrtc service in the services tab of the dashboard

{{< img-center "images/sdk/first-moves/stop-webrtc-service.png" 600x "" >}}

## Get images

First, connect to your Reachy.

```python
from reachy_sdk import ReachySDK

reachy = ReachySDK(host='192.168.0.42')  # Replace with the actual IP

reachy.cameras
>>> ??
```

The list of initialized cameras should contain both the teleop and SR camera.  

### Teleop camera

To get both views of the robot teleop cameras:
```python
from reachy2_sdk import ReachySDK
from reachy2_sdk.media.camera import CameraView

reachy = ReachySDK(host='192.168.0.42')

l_frame = reachy.cameras.teleop.get_frame(CameraView.LEFT)
r_frame = reachy.cameras.teleop.get_frame(CameraView.RIGHT)
```

Let's display the captured frame with opencv:
```python
import cv2

cv2.imshow("left", l_frame)
cv2.imshow("right", r_frame)
cv.waitKey(0)
cv.destroyAllWindows()
```

### SR camera
The SR camera works exactly the same as the teleop camera, but you have more elements captured. In fact, it a RGBD camera, so you have both access to the RGB images and depth information.  

#### RGB images

```python
from reachy_sdk import ReachySDK
from reachy2_sdk.media.camera import CameraView

reachy = ReachySDK(host='192.168.0.42')

l_frame = reachy.cameras.SR.get_frame(CameraView.LEFT)
r_frame = reachy.cameras.SR.get_frame(CameraView.RIGHT)
```

Let's display them with opencv:
```python
import cv2

cv2.imshow("left", l_frame)
cv2.imshow("right", r_frame)
cv.waitKey(0)
cv.destroyAllWindows()
```

#### Depth information

The SR camera is a depth camera, you can then diplay a left or right **depth frame** using `get_depth_frame()`, but also the **depthmap** and the **disparity**.   

You first have to capture all, then you can read the frame and get the information you want:
```python
from reachy_sdk import ReachySDK
from reachy2_sdk.media.camera import CameraView

reachy = ReachySDK(host='192.168.0.42')

l_depth_frame = reachy.cameras.SR.get_depth_frame(CameraView.LEFT)
r_depth_frame = reachy.cameras.SR.get_depth_frame(CameraView.RIGHT)
depth = reachy.cameras.SR.get_depthmap()
disparity = reachy.cameras.SR.get_disparity()
```

Let's display them with opencv:
```python
import cv2

cv2.imshow("sr_depthNode_left", l_depth_frame)
cv2.imshow("sr_depthNode_right", r_depth_frame)
cv2.imshow("depth", depth)
cv2.imshow("disparity", disparity)
cv.waitKey(0)
cv.destroyAllWindows()
```
