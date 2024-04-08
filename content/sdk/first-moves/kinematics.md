---
title: "4. Use arms kinematics"
description: "Presentation of Reachy's forward and inverse kinematics."
lead: ""
date: 2023-07-25T17:39:00+02:00
lastmod: 2023-07-25T17:39:00+02:00
draft: false
type: docs
images: []
toc: true
weight: "100"
---

> Note : Make sure you checked the [safety page]({{< ref "sdk/getting-started/safety" >}}) before controlling the arm.

## Arm coordinate system

### Joint coordinates

If you remember the [`goto_joint()` function]({{< ref "sdk/first-moves/arm#goto_joints" >}}), to generate a trajectory for the arm, you need to pass a list of joints with the requested position as argument.

For example, to place the right arm in a right angled position, we defined the following list: 

```python
right_angled_position = [0, 0, 0, -90, 0, 0, 0]
```

and then call the function with is:

```python
reachy.r_arm.goto_joints(right_angled_position)
```

In this basic arm control, we used what is called **joint coordinates** to move Reachy. This means that we controlled each joint separately.

Controlling a robot in joint coordinates can be hard and is often far from what we actually do as humans. When we want to grasp an object in front of us, we think of where we should put our hand, not how to flex each individual muscle to reach this position. This approach relies on the cartesian coordinates: the 3D position and orientation in space, this is where the **kinematic model** comes into play.

### Kinematic model

The **kinematic model** describes the motion of a robot in mathematical form without considering the forces and torque affecting it. It only focuses on the geometric relationship between elements.

We have defined the whole kinematic model of the arm. This means the translation and rotation required to go from one joint to the next one. On a right arm equipped with a gripper this actually look like this:

|Motor|Translation|Rotation|
|-----|-----------|--------|
|r_arm.shoulder.pitch|(0, -0.019, 0)|(0, 1, 0)
|r_arm.shoulder.roll|(0, 0, 0)|(1, 0, 0)
|r_arm.elbow.yaw|(0, 0, -0.280)|(0, 0, 1)
|r_arm.elbow.pitch|(0, 0, 0)|(0, 1, 0)
|r_arm.wrist.roll|(0, 0, -0.120)|(0, 0, 1)
|r_arm.wrist.pitch|(0, 0, 0)|(0, 1, 0)
|r_arm.wrist.yaw|(0, 0, 0)|(1, 0, 0)
|r_gripper|(0, ??, ??)|(0, 0, 0)


To use and understand the kinematic model, you need to know how Reachy coordinate system is defined (from Reachy's perspective), see below:

{{< img-center "images/sdk/first-moves/arm_axis.png" 400x "" >}}

* the X axis corresponds to the forward arrow,
* the Y axis corresponds to the right to left arrow,
* the Z axis corresponds to the up arrow.

The origin of this coordinate system is located in the upper part of the robot trunk, inside Reachy.
 Basically, if you imagine a segment going from the left shoulder to the right shoulder of the robot, the origin is the middle of this segment, which corresponds to behind the center of Pollen's logo on Reachy's torso.

{{< img-center "images/sdk/first-moves/reachy_frame.jpg" 400x "" >}}

> Units in this coordinate system are **meters**. So the point (0.3, -0.2, 0) is 30cm in front of the origin, 20cm to the right and at the same height.


### End effector location

We consider the end-effector to be in a virtual joint located in the gripper and referred as *'right_tip'* or *'left_tip'* in the [urdf file](https://github.com/pollen-robotics/reachy_kinematics/blob/master/reachy.URDF), as shown below.

{{< img-center "images/sdk/first-moves/eef.png" 400x "" >}}

The red dot corresponds to the *'right_tip'*.

You can see the right and left end-effectors animated below.

<p align="center">
    {{< video "videos/sdk/eef.mp4" "80%" >}}
</p>

### Switching between joint and cartesian coordinates

Forward and inverse kinematics are a way to go from one coordinates system to the other:

* **forward kinematics: joint coordinates –> cartesian coordinates**,
* **inverse kinematics: cartesian coordinates –> joint coordinates**.

## Forward kinematics

Using the kinematic model defined above, we can compute the 3D position and orientation of the right or left end-effector with the **`forward_kinematics()`** method.

### forward_kinematics()

Each arm has a **`forward_kinematics()`** method. To use it, you first need to connect to your Reachy.

```python
from reachy_sdk import ReachySDK

reachy = ReachySDK(host='192.168.0.42')  # Replace with the actual IP

reachy.r_arm.forward_kinematics()
>>> array([[ 0.04622308, -0.03799621, -0.99820825,  0.31144822],
       [ 0.10976691,  0.99341829, -0.03273101, -0.19427524],
       [ 0.99288199, -0.1080573 ,  0.05008958, -0.4255104 ],
       [ 0.        ,  0.        ,  0.        ,  1.        ]])
```

The method returns a 4x4 matrix indicating the position and orientation of the end effector in Reachy 2's coordinate system.  

> By specifying no argument, it will give the current 3D position and orientation of the end effector.

You can compute the forward kinematics of the arm for other joints positions, by giving as an argument a seven-element-long list, as for the `goto_joints()`method. The arm will not move, but you can get the target position and orientation of the arm in this configuration.  

For example, for the right arm right angled position:
```python
reachy.r_arm.forward_kinematics([0, 0, 0, -90, 0, 0, 0])
>>> array([[ 0.04622308, -0.03799621, -0.99820825,  0.31144822],
       [ 0.10976691,  0.99341829, -0.03273101, -0.19427524],
       [ 0.99288199, -0.1080573 ,  0.05008958, -0.4255104 ],
       [ 0.        ,  0.        ,  0.        ,  1.        ]])
```

### Understand the result
The 4x4 matrix returned by the **`forward_kinematics()`** method is what is often called a **pose**. It actually encodes both the 3D translation (as a 3D vector) and the 3D rotation (as a 3x3 matrix) into one single representation.

$$\begin{bmatrix}
R_{11} & R_{12} & R_{13} & T_x\\\\\\
R_{21} & R_{22} & R_{23} & T_y\\\\\\
R_{31} & R_{32} & R_{33} & T_z\\\\\\
0 & 0 & 0 & 1
\end{bmatrix}$$

The instruction

```python
reachy.r_arm.forward_kinematics()
```

returns the current pose of the right end-effector, based on the present position of every joint in the right arm.

You can also compute the pose for a given joints position, to do that just pass the list of position as argument of forward_kinematics. Be careful to respect the order of the position you give and to give all the joints in the arm kinematic chain (i.e. from *shoulder_pitch* to *wrist_roll*).

For example, we can compute the forward kinematics for the right-angle position we defined earlier.

```python
reachy.r_arm.forward_kinematics(right_angle_position)
>>> array([[ 0.    ,  0.    , -1.    ,  0.3675],
       [ 0.    ,  1.    ,  0.    , -0.202 ],
       [ 1.    ,  0.    ,  0.    , -0.28  ],
       [ 0.    ,  0.    ,  0.    ,  1.    ]])
```

With this result, we can tell that when the right arm is in the right angle position, the right end-effector is 37cm in front of the origin, 20cm to the left and 28cm below the origin.

As of the rotation matrix, the identity matrix corresponds to the zero position of the robot which is when the hand is facing toward the bottom.

Here we obtained the rotation matrix

$$\begin{bmatrix}
0 & 0 & -1\\\\\\
0 & 1 & 0 \\\\\\
1 & 0 & 0
\end{bmatrix}$$

We can use scipy to understand what this matrix represents.

```python
from scipy.spatial.transform import Rotation as R
import numpy as np

R.from_matrix([
    [0, 0, -1],
    [0, 1, 0],
    [1, 0, 0],
]).as_euler('xyz', degrees=True)
>>> array([  0.        , -89.99999879,   0.        ])
```
So scipy tells us that a rotation of -90° along the y axis has been made to get this matrix, which is coherent with the result because having the hand facing forward corresponds to this rotation according to Reachy's xyz axis that we saw above.

## Inverse kinematics

The inverse kinematics is the exact opposite of the forward kinematics. From a 4x4 pose in Reachy 2 coordinate system, it gives you a list of joints positions to reach this target.

Knowing where you arm is located in the 3D space can be useful but most of the time what you want is to move the arm in cartesian coordinates. You want to have the possibility to say: “move your hand to [x, y, z] with a 90° rotation around the Y axis”. This is what **`goto_matrix()`** 

### inverse_kinematics()

Each arm has an **`inverse_kinematics()`** method. To use it, you first need to connect to your Reachy.  
You need to specify as an argument a target pose in Reachy coordinate system.  

Let's for example ask for the inverse kinematics of the current pose, using the forward kinematics.

```python
from reachy_sdk import ReachySDK

reachy = ReachySDK(host='192.168.0.42')  # Replace with the actual IP

reachy.r_arm.inverse_kinematics(reachy.r_arm.forward_kinematics())
>>> [0, 0, 0, -90, 0, 0, 0] ??
```

The method returns a seven-element-long list indicating the position of each arm joint, in the usual order:
- r_arm.shoulder.pitch
- r_arm.shoulder.roll
- r_arm.elbow.yaw
- r_arm.elbow.pitch
- r_arm.wrist.roll
- r_arm.wrist.pitch
- r_arm.wrist.yaw

Contrary to the forward kinematics which has a unique answer (giving all joints values will always put the end effector at the same target position), inverse kinematics can have an infinite number of answers (for a target position of the end effector, several combinations of joints angles are possible).  

#### Using a q0 value
The inverse kinematics returns one solution, but you may want to custom the position from which the computation is done to get another result.  
To do so, specify a **q0** value when calling the `inverse_kinematics()` method. The **`q0`** argument must be a seven-element-long list as well:
```python
reachy.r_arm.inverse_kinematics(
    reachy.r_arm.forward_kinematics(), 
    q0=[0, 0, 0, 0, 0, 0, 0])
>>> [0, 0, 0, -90, 0, 0, 0] ??
```


### Example: square movement with goto_matrix()

#### Defining the poses

To make this more concrete, let's first try with a simple example. We will make the right hand draw a square in 3D space. To draw it, we will define the four corners of a square and Reachy's right hand will go to each of them.

The virtual corner is represented below.

{{< img-center "images/sdk/first-moves/square_setup.jpg" 400x "" >}}

For our starting corner A, let's imagine a point in front of the robot, on its right and below its base. With Reachy coordinate system, we can define such a point with the following coordinates:

$$A = \begin{pmatrix}0.3 & -0.4 & -0.3\end{pmatrix}$$

The coordinates of B should match A except the z component wich should be higher. Hence 

$$B = \begin{pmatrix}0.3 & -0.4 & 0.0\end{pmatrix}$$

For the corner C, we want a point on the same z level as B in the inner space of Reachy and in the same plane as A and B so we only need to change the y component of B. We can take for example 

$$C = \begin{pmatrix}0.3 & -0.1 & 0.0\end{pmatrix}$$

And to complete our corners we can deduce D from A and C. D coordinates should match C except its z component which must the same as A. Hence

$$D = \begin{pmatrix}0.3 & -0.1 & -0.3\end{pmatrix}$$

> **Remember that you always have to provide poses to the inverse kinematics that are actually reachable by the robot.** If you're not sure whether the 3D point that you defined is reachable by Reachy, you can move the arm with your hand in compliant mode, ask the forward kinematics and check the 3D translation component of the returned pose. 

But having the 3D position is not enough to design a pose. You also need to provide the 3D orientation via a rotation matrix. The rotation matrix is often the tricky part when building a target pose matrix.

Keep in mind that the identity rotation matrix corresponds to the zero position of the robot which is when the hand is facing toward the bottom. So if we want the hand facing forward when drawing our virtual square, we need to rotate it from -90° around the y axis, as we saw in the forward kinematics part.

We know from before which rotation matrix corresponds to this rotation, but we can use scipy again to generate the rotation matrix for given rotations.

```python
print(np.around(R.from_euler('y', np.deg2rad(-90)).as_matrix(), 3))
>>> [[ 0. -0. -1.]
 [ 0.  1. -0.]
 [ 1.  0.  0.]]
```

We got the rotation matrix that we expected!

As mentionned, building the pose matrix can be hard, so don't hesitate to use scipy to build your rotation matrix. You can also move the arm with your hand where you want it to be and use the forward kinematics to get an approximation of the target pose matrix you would give to the inverse kinematics.

Here, having the rotation matrix and the 3D positions for our points A and B, we can build both target pose matrices.

```python
A = np.array([
  [0, 0, -1, 0.3],
  [0, 1, 0, -0.4],  
  [1, 0, 0, -0.3],
  [0, 0, 0, 1],  
])

B = np.array([
  [0, 0, -1, 0.3],
  [0, 1, 0, -0.4],  
  [1, 0, 0, 0.0],
  [0, 0, 0, 1],  
])

C = np.array([
  [0, 0, -1, 0.3],
  [0, 1, 0, -0.1],  
  [1, 0, 0, 0.0],
  [0, 0, 0, 1],  
])

D = np.array([
  [0, 0, -1, 0.3],
  [0, 1, 0, -0.1],  
  [1, 0, 0, -0.3],
  [0, 0, 0, 1],  
])
```

#### Sending the movements commands

As before, we use the **`goto_matrix()`** to send moving instructions to the arm.


```python
import time
# put the joints in stiff mode
reachy.r_arm.turn_on()

# use the goto_matrix() method
reachy.r_arm.goto_matrix(A)
reachy.r_arm.goto_matrix(B)
reachy.r_arm.goto_matrix(C)
reachy.r_arm.goto_matrix(D)

# put the joints back to compliant mode
# use turn_off_smoothly to prevent the arm from falling hard
reachy.r_arm.turn_off()
```

The result should look like this:

<p align="center">
    {{< video "videos/sdk/goto_ik.mp4" "80%" >}}
</p>