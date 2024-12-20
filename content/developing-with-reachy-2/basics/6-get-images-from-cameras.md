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
<br>

> You can choose to follow our online documentation or to see directly the images from your Reachy by following the [notebook n°5](https://github.com/pollen-robotics/reachy2-sdk/blob/develop/src/examples/5_cameras_images.ipynb). 


This section assumes that you went through the [Hello World]({{< ref "developing-with-reachy-2/basics/1-hello-world/" >}}) so that you know how to connect to the robot.

Reachy2 has 2 types of camera:
- the **teleop** cameras, with a left and right cameras, located in Reachy's head and used for the teleoperation
- the **depth** camera, equipped with a depth sensor, located in Reachy 2’s torso and mainly useful for manipulation tasks

Each camera can be accessed separately through *reachy.cameras*. Teleop cameras  have a right and left view, with the left and right sides considered from Reachy point of view, while the depth camera has a left (i.e. mono RGB) and depth view.  To be able to specify the view you want to get a frame from, you will need to import CameraView:

```python
from reachy2_sdk.media.camera import CameraView
```


## Get images

First, connect to your Reachy.

```python
from reachy_sdk import ReachySDK

reachy = ReachySDK(host='10.0.0.201')  # Replace with the actual IP

reachy.cameras
>>> <CameraManager intialized_cameras=
	<Camera name="depth" stereo=False> 
	<Camera name="teleop" stereo=True> 
>
```

The list of initialized cameras should contain both the teleop and depth cameras.  

For each camera, namely the teleop and the deoth ones, you must call the `get_frame()`function each time you want to get an image. 

### Teleop camera

#### RGB images

To get both views of the robot teleop cameras and the timestamp :
```python
from reachy2_sdk.media.camera import CameraView

l_frame, l_ts= reachy.cameras.teleop.get_frame(CameraView.LEFT)
r_frame, r_ts = reachy.cameras.teleop.get_frame(CameraView.RIGHT)
```

> By default, if you don't specify which camera you want, it will be the left one. 

Let's display the captured frame with PIL:

```python
from PIL import Image
Image.fromarray(l_frame[:,:,::-1])
```

#### Camera parameters
The intrinsic camera parameters, as defined [here](https://docs.ros.org/en/melodic/api/sensor_msgs/html/msg/CameraInfo.html), are available :

```python
height, width, distortion_model, D, K, R, P =  reachy.cameras.teleop.get_parameters(CameraView.LEFT)
```

As well as the extrinsic parameters (meaning the transformation of Reachy's origin in the camera's frame) : 
```python
T_cam_reachy = reachy.cameras.teleop.get_extrinsics()
>>> array([[-8.20152401e-04, -9.99999365e-01, -7.72635108e-04,
         3.25965794e-02],
       [ 2.65685388e-03,  7.70453615e-04, -9.99996174e-01,
         1.80999522e-01],
       [ 9.99996134e-01, -8.22202042e-04,  2.65622030e-03,
        -3.56420275e-02],
       [ 0.00000000e+00,  0.00000000e+00,  0.00000000e+00,
         1.00000000e+00]])
```



### Depth camera
The depth camera works exactly the same as the teleop camera, but you have more elements captured. In fact, it a RGBD camera, so you have both access to the RGB image and depth information.  

#### RGB image
You can use `get_frame()` to get the image : 

```python
from reachy_sdk import ReachySDK
from reachy2_sdk.media.camera import CameraView

reachy = ReachySDK(host='10.0.0.201')

rgb_frame, rgb_ts = reachy.cameras.depth.get_frame()
```

Let's display it with PIL:
```python
Image.fromarray(rgb_frame[:,:,::-1])

```

#### Depth informations

You can use `get_depth_frame()` to get the depth information and display it :

```python
depth_frame, depth_ts = reachy.cameras.depth.get_depth_frame()
Image.fromarray(depth_frame[:,:,::-1])
```

#### Camera parameters
The intrinsic camera parameters, as defined [here](https://docs.ros.org/en/melodic/api/sensor_msgs/html/msg/CameraInfo.html), are available :

```python
height, width, distortion_model, D, K, R, P =  reachy.cameras.depth.get_parameters()
>>> (720,
 1280,
 'rational_polynomial',
 array([ 6.69530872e-03, -5.04049882e-02,  3.94786854e-04,  6.92563481e-05,
         3.36577334e-02,  0.00000000e+00,  0.00000000e+00,  0.00000000e+00]),
 array([[692.074646  ,   0.        , 637.12384033],
        [  0.        , 691.86395264, 358.03106689],
        [  0.        ,   0.        ,   1.        ]]),
 array([[1., 0., 0.],
        [0., 1., 0.],
        [0., 0., 1.]]),
 array([[692.074646  ,   0.        , 637.12384033,   0.        ],
        [  0.        , 691.86395264, 358.03106689,   0.        ],
        [  0.        ,   0.        ,   1.        ,   0.        ]]))

```

As well as the extrinsic parameters (meaning the transformation of Reachy's origin in the camera's frame) : 
```python
T_cam_reachy = reachy.cameras.depth.get_extrinsics()
>>> array([[ 1.11022302e-16, -1.00000000e+00,  5.55111512e-17,
         9.98900000e-03],
       [-7.43144825e-01, -1.11022302e-16, -6.69130606e-01,
         6.23442696e-02],
       [ 6.69130606e-01,  5.55111512e-17, -7.43144825e-01,
        -4.88122743e-03],
       [ 0.00000000e+00,  0.00000000e+00,  0.00000000e+00,
         1.00000000e+00]])

```

That's it for the cameras  ! 
Now, we are going to record and replay movements.