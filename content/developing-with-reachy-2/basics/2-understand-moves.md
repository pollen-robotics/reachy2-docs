---
title: "2. Understand gotos in Reachy 2"
description: "How gotos work"
lead: "How gotos work to create movements sequences"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "SDK basics"
weight: 210
toc: true
---

<br>

> You can choose to follow our online documentation or to make your Reachy move by following the [notebook n°2](https://github.com/pollen-robotics/reachy2-sdk/blob/develop/src/examples/2_goto_introduction.ipynb). 

## Gotos methods

ReachySDK for Reachy 2 offers you methods to make movements with the arms and head, controlling the target position in several ways, choosing the duration of the movement, or even the interpolation mode. We called them **Goto**.  

Those methods work the same way on different robot's parts, such the arms, the head or the mobile base.  


The methods to use in order to control the robot are:  

-  **for the arms :**
    - **`goto()`**: depending on the parameter entered, you can control either :
        - the joint value of each joint in degrees : *list of 7 values (joint space)*
        - the end-effector position in the robot frame of reference : *4x4 homogeneous matrix (cartesian space)*

    - **`translate_by()`** and **`rotate_by()`** : you can translate or rotate the position of the end-effector in space, in robot frame or gripper frame.
<br>
<br>
- **for the head :**
    - **`goto()`**: depending on the parameter entered, you can control either :
        - the joint value of each head joint in degrees : *list of  3 values (joint space)*
        - the head orientation in the robot frame : *quaternion (cartesian space)*
        <br>
        :warning: between the joint and cartesian spaces, there is a 10-degree difference in pitch : to have the head looking forward, in joint space you have to put rpy = [0,10,0] whereas in cartesian space, it's the equivalent of [0,0,0].
   <br>
   <br>
    - **`look_at()`**: you control the head by giving a point in the robot coordinate system the head will look at

    - **`rotate_by()`**: you can rotate the head in relation to its current position, by setting roll, pitch and yaw values in degrees, either in relation to the robot's frame of reference or to the head.
<br>
<br>
- **for the mobile base:**
    - **`goto()`**: you control the mobile base by giving a position to reach in the odometry frame of the mobile base


Grippers and antennas also support goto commands:

- **for the grippers:**
    - **`goto()`**: you control the position or opening of the gripper
<br>
<br>
- **for the antennas:**
    - **`goto()`**: you control the position of the antennas

<br>

> The following tutorial only shows examples for the arms, head and mobile_base, but most of the description is also true for the goto commands on the grippers and antennas.

## Goto commands - arms and head

A goto command can be sent on parts:
- reachy.l_arm
- reachy.r_arm
- reachy.head

It can also be sent to grippers as antennas, as mentioned earlier:
- reachy.r_arm.gripper
- reachy.l_arm.gripper
- reachy.head.r_antenna
- reachy.head.l_antenna

It is defined by 3 parameters: 
- the **joint commands**, as a list of articular degree values (7 for the arms and 3 for the head)
- the **duration**, in seconds - *set to 2 by default*
- the **interpolation mode**, 'linear' or 'minimum_jerk' - *set to 'minimum_jerk' by default*


### Goto duration 

You can give a custom duration for the execution of the movements, as shown in the examples above : 

```python
reachy.head.goto([20, 20, -10], duration = 3)
reachy.l_arm.goto([0, -10, 10, -90, 0, 0, 0], duration = 5)

# Doing:
reachy.l_arm.goto([0, -10, 0, 0, 0, 0, 0])
# will lead to the same result as:
reachy.l_arm.goto([0, -10, 0, 0, 0, 0, 0], duration = 2)
```

> Default duration is **2 seconds**.

You **cannot set a duration to 0 second**. This will raise an exception in your code!


```python
reachy.l_arm.goto([0, 0, 0, 0, 0, 0, 0], duration = 0) # raises an exception
```

### Goto interpolation mode

The goto methods generates a trajectory between the present position and the goal position. This trajectory is then interpolated at a predefined frequency (150Hz) to compute all intermediary target positions that should be followed before reaching the final goal position. Depending on the interpolation mode chosen, you can have a better control over speed and acceleration.

Two interpolation modes are available when sending a goto command:
- the **linear** interpolation mode
- the **minimum-jerk** interpolation mode

Both trajectories start and finish at the same point but don't follow the same intermediate positions. The minimum jerk will slowly accelerate at the begining and slowly decelerate at the end. This makes the movements more natural.

You can specify the interpolation mode by setting the **`interpolation_mode`** argument when calling the method:


```python
reachy.head.goto([20, 0, -10], interpolation_mode='linear')
reachy.l_arm.goto([0, -10, 10, -90, 0, 0, 0], interpolation_mode='linear')
```

> Default interpolation mode is **minimum_jerk**.


```python
# Doing:
reachy.l_arm.goto([0, -10, 0, 0, 0, 0, 0])
# will lead to the same result as:
reachy.l_arm.goto([0, -10, 0, 0, 0, 0, 0], interpolation_mode='minimum_jerk')

```

## Goto commands - mobile_base

The goto parameters for the mobile base are a little different, as you cannot ask the mobile base to reach a target position in a given time. Instead of trying to reach the given position in a given time, the robot will take as long as needed to reach its goal, or be interrupted by the timeout you can set as parameter.

The parameters are:
- the **x** target, in meters
- the **y** target, in meters
- the **theta** target, in degrees by default
- the **distance_tolerance** and **angle_tolerance**, to define how close to your target the robot must be to consider the target has been reached
- a **timeout** value, to stop the movement if the target has been reached after a certain amount of time

```python
# Rotation to reach a 90-degrees-rotation around the odom coordinate system
reachy.mobile_base.goto(x=0, y=0, theta=90)
```

### Goto tolerances

You can modify the tolerances around the goal position you want to reach. Tuning the tolerances will modify the precision of the position at arrival, but also modify the time the mobile base will take before considering its movement over. You will learn more about these tolerances in the mobile_base tutorial.

### Goto timeout

You don't have any duration parameters to control the mobile base, but you can use the timeout to stop the mobile base goto after a certain amount of time.
The movement is stopped if the target has not been reached after the duration of this timeout. In the case the target has been reached before the timeout is over, the timeout will have no impact.

```python
# Set back the robot in position 0
reachy.mobile_base.goto(x=0, y=0, theta=0)

# Move forward by 30cm
reachy.mobile_base.goto(x=0.3, y=0, theta=0)
```

If we print the current position of the robot once it has stopped, we can see it has reached the goal position:
```python
print(f"x: {round(reachy.mobile_base.odometry['x'], 1)}")
print(f"y: {round(reachy.mobile_base.odometry['y'], 1)}")
print(f"theta: {round(reachy.mobile_base.odometry['theta'], 1)}")
```

Let's do the same movement by adding a timetout to the forward goto:
```python
# Set back the robot in position 0
reachy.mobile_base.goto(x=0, y=0, theta=0)

# Move forward by 30cm, with a timeout of 0.5 seconds
reachy.mobile_base.goto(x=0.3, y=0, theta=0, timeout=0.8)
```
If we print the current position, we can see the robot was stopped before reaching the target:

```python
print(f"x: {round(reachy.mobile_base.odometry['x'], 1)}")
print(f"y: {round(reachy.mobile_base.odometry['y'], 1)}")
print(f"theta: {round(reachy.mobile_base.odometry['theta'], 1)}")
```

> Default timeout is **100 seconds**.


## Goto execution

There are two important concepts to be aware of : 
- gotos are stacked for a part (i.e. they run one after another),
- but each part is independent (i.e. a goto for the left arm will run in parallel with a goto for the right arm).

### Gotos are non-blocking for other parts 

It means you can send a goto command on different parts, it won't wait for the movement to be executed on the first part to execute the other one, but will follow the timing of your code.

```python
reachy.l_arm.goto([0, 0, 10, -90, 0, 0, 15], duration = 3)
time.sleep(1)
reachy.r_arm.goto([0, 0, -10, -90, 0, 0, -15], duration = 2)
```

This sequence will take 3 seconds to execute, as the right arm will start its movement 1 second after the left arm has started its own movement. They will finish at the same time.

### Gotos are stacked for a part

It means that you can send several goto commands on a part one after another without any delay, they will be played in this order, but will wait for the previous goto to be finished.  

```python
reachy.l_arm.goto([0, 0, 15, -90, 0, 0, 15], duration = 3)
reachy.l_arm.goto([0, -10, 0, 0, 0, 0, 0], duration = 2)
reachy.l_arm.goto([0, 0, 15, -90, 0, 0, 15], duration = 3)
```

This sequence will take 8 seconds to execute, as each movement on the left arm will wait for the previous before starting.  

Nevertheless, you can still send goto commands to other parts.


```python

reachy.l_arm.goto([0, 0, 15, -90, 0, 0, 15], duration = 3)  #1
time.sleep(1)
reachy.l_arm.goto([0, -10, 0, 0, 0, 0, 0], duration = 2)  #2
reachy.l_arm.goto([0, 0, 15, -90, 0, 0, 15], duration = 3)  #3
reachy.r_arm.goto([0, 0, -15, -90, 0, 0, -15], duration = 2)  #4
```

This sequence will still take 8 seconds to execute:
- commands #1, #2 and #3 are sent to the left arm. They will be stacked on the left arm, and the `time.sleep(1)` won't have any effect . When received, command #2 will simply wait 2 seconds rather than 3 secondes in the previous example.
- commands #4 is sent on the right arm, where no movement is processed. It will then start 1 second after command #1 has started, and will then be over approximatively at the same time.

The sequence execution order is #1, #4, #2, #3.

So how can a left arm goto wait for a right arm move? That's simple using the parameter *wait* in goto functions ! 

### Wait parameter

We can set the parameter *wait = True* in goto functions for the execution of the program to wait for the end of the movement before going on. 


```python
goto_1 = reachy.r_arm.goto([0, 5, -15, 0, 0, 0, -10], duration = 2, wait = True)
goto_2 = reachy.l_arm.goto([0, -5, 15, -90, 0, 0, 10], duration = 2, wait = True)
```

The left arm move will start only at the end of the right arm one. 

### Goto state

For a specific goto, you may want to know its current state. Each gotos returns an id, that you can use to get information or cancel this movement. Store this id in a variable to be able to use it further. 

You can get information on the goto given its id with 2 methods available at reachy's level:

- **`is_goto_finished()`**: return True if the movement is over, but also if it won't be played because it has been cancelled for example
- **`get_goto_joints_request()`**: will return the joints goal positions sent to the part by the corresponding goto command 


Let's take an example:


```python
goto_1 = reachy.l_arm.goto([0, 0, 0, -60, 0, 0, 0], duration = 3)
if reachy.mobile_base is not None:
    goto_2 = reachy.mobile_base.goto(0.2, 0, 0)

time.sleep(1)

# Goto is currently being played
goto1_is_finished = reachy.is_goto_finished(goto_1)
print(f'After 1 second, goto 1 is finished : {goto1_is_finished}\n')
>>> False

time.sleep(3)

# Goto is now over
goto1_is_finished = reachy.is_goto_finished(goto_1)
print(f'After 4 seconds, goto 1 is finished : {goto1_is_finished}')
>>> True
```

We then have for the l_arm the goto_1

```python
print(f"Part: {reachy.get_goto_request(goto_1).part}")
print(f"Request: {reachy.get_goto_request(goto_1).request}")
```

And the mobile base the second one:
```python
if reachy.mobile_base is not None:
    print(f"Part: {reachy.get_goto_request(goto_2).part}")
    print(f"Request: {reachy.get_goto_request(goto_2).request}")
else: 
    print("Cell content ignored, no mobile_base is available")
```

You get information on the part involved, the target joint values, the duration of the movement, and the interpolation mode. 


### Part execution state

As the sequence can become complex, you can get information for each part on its current status, to know which movement is being played and know which orders are waiting to be played.
For each part, the following methods are available:
- **`get_goto_playing()`**: will return the id of the currently played goto on the part
- **`get_goto_queue()`**: will return the ids of all stacked goto commands waiting to be played on the part

Those methods are called at the part level, to get info on the state of the part.  

Let's take an example. 


```python
# Write a sequence for the left arm
goto_1 = reachy.l_arm.goto([0, -15, 15, -90, 0, 0, 0], duration = 3)
goto_2 = reachy.l_arm.goto([0, -10, 0, 0, 0, 0, 0], duration = 2)
goto_3 = reachy.l_arm.goto([0, -15, 15, -90, 0, 0, 0], duration = 3)

print(f'goto 1: {goto_1.id}, goto 2: {goto_2.id}, goto 3: {goto_3.id}')
>>> goto 1: 45, goto 2: 46, goto 3: 47

# Goto #1 is currently playing
current_goto = reachy.l_arm.get_goto_playing()
print(f'current goto : {current_goto.id}')
print(f'l_arm queue length: {len(reachy.l_arm.get_goto_queue())} gotos waiting to be played.')
>>> current goto : 45
>>> l_arm queue length : 2 gotos waiting to be played. 
```

## Goto cancellation

If you want to modify the queue of goto commands on a part, or interrupt the movement being played, you can cancel goto commands at any time.  

### Single goto cancellation

To cancel a single movement, currently playing or stacked in a part's queue, use its id and call `cancel_goto_by_id()` from reachy. It will stop the robot at its current position.


```python
goto_1 = reachy.l_arm.goto([0, 15, 15, -90, 10, 0, 0], duration = 3)
goto_2 = reachy.head.goto([30, 0, 0], duration = 3)

time.sleep(1)
reachy.cancel_goto_by_id(goto_1)
```

### Multiple gotos cancellation

To cancel all gotos at once, you can call the `cancel_all_goto()` methods.  
This method can be called at the level you want to act, which can be either **reachy** or a **specific part**. 

#### All gotos

For example, if you want to cancel all gotos on all parts:


```python
# Send a sequence of gotos
reachy.head.goto([20, 30, -10], duration = 3)
reachy.l_arm.goto([0, 0, 0, -90, 0, 0, 0], duration = 3)
reachy.l_arm.goto([0, 0, 0, 0, 0, 0, 0], duration = 3)

time.sleep(1.5)

# Cancel all gotos
reachy.cancel_all_goto()

print(f"Length of l_arm goto queue : {len(reachy.l_arm.get_goto_queue())}")
>>> Length of l_arm goto queue : 0
```

All movements are cancelled, even the movement stacked in the left arm queue which will never be played.  

#### All gotos for one part

If you only want to cancel movement on the left arm:


```python
# Send a sequence of gotos
reachy.head.goto([20, 30, -10], duration=3)
reachy.l_arm.goto([0, 0, 0, -90, 0, 0, 0], duration = 3)
reachy.l_arm.goto([0, 0, 0, 0, 0, 0, 0], duration = 2)

time.sleep(1)

# Cancel gotos on left arm only
reachy.l_arm.cancel_all_goto()
```

The movement on the head will continue, but all the movements of the left will be stopped and the left arm queue cleaned.