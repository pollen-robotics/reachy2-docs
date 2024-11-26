---
title: "2. Understand moves in Reachy 2"
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


## Moves methods

ReachySDK for Reachy 2 offers you methods to make movements with the arms and head, controlling the target position in several way, choosing the duration of the movement, or even the interpolation mode.  

Those methods work the same way on the left and right arms and on the head, **but not on the mobile base**.  


The methods to use in order to control the robot are:  

-  for the arms:  
    - **`goto_joints()`**: you control directly the goal position of each joint of the arm, in degrees
    - **`goto_from_matrix()`**: you control the target pose of the end effector in the robot's coordinate system, from a 4x4 homogeneous matrix  
- for the head:  
    - **`look_at()`**: you control the head by giving a point in the robot coordinate system the head will look at
    - **`rotate_to()`**: you control directly the roll, pitch and yaw goal positions of the neck, in degrees
    - **`orient()`**: you control the head orientation with a quaternion

## Moves properties

### Moves IDs

The previous methods all return an id, that you can use to get information on this movements or to cancel this movement. Store this id in a variable to be able to use it further.  

```python
move_1 = reachy.r_arm.goto_joints([10, -10, 0, -90, 0, 0, 0])

print(move_1)
>>> ??
```

### Moves execution

Move commands can only be sent on parts:
- reachy.l_arm
- reachy.r_arm
- reachy.head

#### Moves are non-blocking for other parts 
It means you can send a move command on different parts, it won't wait for the movement to be executed on the first part to execute the other one, but will follow the timing of your code.  

Let's take an example with the following sequence:
```python
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)
time.sleep(1)
reachy.r_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 2)
```
This sequence will take 3 seconds to execute, as the right arm will start its movement 1 second after the left arm has started its own movement. They will finish at the same time.

#### Moves are blocking and stacked for a part
It means that you can send several move commands on a part one after another without any delay, they will be played in this order, but will wait for the previous move to be finished.  

Let's take an example with the following sequence:
```python
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)
reachy.l_arm.goto_joints([0, 0, 0, 0, 0, 0, 0], duration = 2)
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)
```
This sequence will take 8 seconds to execute, as each movement on the left arm will wait for the previous before starting.  

Nevertheless, you can still send move commands to other parts.  
For example:
```python
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)  #1
time.sleep(1)
reachy.l_arm.goto_joints([0, 0, 0, 0, 0, 0, 0], duration = 2)  #2
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)  #3
reachy.r_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 2)  #4
```

This sequence will still take 8 seconds to execute:
- commands #1, #2 and #3 are sent to the left arm. They will be stacked on the left arm, and the `time.sleep(1)` won't have any effect . When received, command #2 will simply wait 2 seconds rather than 3 secondes in the previous example.
- commands #4 is sent on the right arm, where no movement is progress. It will then start 1 second after command #1 has started, and will then be over approximatively at the same time.

The sequence execution order is #1, #4, #2, #3

### Part execution state
As the sequence can become complex, you can get information for each part on its current status, to now which movementis being played and know which others are waiting to be played.  
For each part, the following methods are available:
- **`get_move_playing()`**: will return the id of the currently playing move on the part
- **`get_moves_queue()`**: will return the ids of all stacked move commands waiting to be played on the part

Those methods are called at the part level, to get info on the state of the part.  
For example:
```python
# Write a sequence for the left arm
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)  # id=1
reachy.l_arm.goto_joints([0, 0, 0, 0, 0, 0, 0], duration = 2)  # id=2
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)  # id=3

# Move #1 is currently playing
current_move = reachy.l_arm.get_move_playing()
print(current_move)
>>> ??

# 2 move commands, #2 and #3, are waiting to be played
print(len(reachy.l_arm.get_moves_queue()))
>>> 2
```

### Moves state

For a specific move, you may want to know its current state. You can get information on the moves given its id with 3 methods available at reachy's level:
- **`is_move_playing()`**: return True if the movement is currently being played
- **`is_move_finished()`**: return True if the movement is over, but also if it won't be played because it has been cancelled for example
- **`get_move_joints_request()`**: will return the joints goal positions sent to the part by the corresponding move command 

Let's take an example:
```python
move_1 = reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)

time.sleep(1)

# Move is currently being played
reachy.is_move_playing(move_1)
>>> True
reachy.is_move_finished(move_1)
>>> False

time.sleep(3)

# Move is now over
reachy.is_move_playing(move_1)
>>> False
reachy.is_move_finished(move_1)
>>> True

# Get joint goal position of the move
reachy.get_move_joints_request(move_1)
>>> ??
```

### Cancel moves

If you want to modify the queue of move commands on a part, or interrupt the movement being played, you can cancel move commands at any time.  

#### Single move cancellation

To cancel a single movement, currently playing or stacked in a part's queue, use its id and call `cancel_move_by_id()` from reachy.

```python
move_1 = reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)

time.sleep(1)
reachy.cancel_move_by_id(move_1)
```

#### Cancel all moves at once

To cancel all moves at once, you can call the `cancel_all_moves()` methods.  
This method can be called at the level you want to act, which can be either **reachy** or a **specific part**. 

##### All robot moves

For example, if you want to cancel all moves on all parts:
```python
# Send a sequence of moves
reachy.head.rotate_to(20, 30, -10, duration=3)
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)
reachy.l_arm.goto_joints([0, 0, 0, 0, 0, 0, 0], duration = 2)

# Cancel all moves
reachy.cancel_all_moves()
```

All movements are cancelled, even the movement stacked in the left arm queue which will never be played.  

##### All part moves

If you only want to cancel movement on the left arm:
```python
# Send a sequence of moves
reachy.head.rotate_to(20, 30, -10, duration=3)
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 3)
reachy.l_arm.goto_joints([0, 0, 0, 0, 0, 0, 0], duration = 2)

# Cancel moves on left arm only
reachy.l_arm.cancel_all_moves()
```

The movement on the head will continue, but all the movements of the left will be stopped and the left arm queue cleaned.


## Moves duration

For each methods mentioned in [Moves methods]({{< ref "developing-with-reachy-2/basics/2-understand-moves#moves-methods" >}}), you can give a custom duration for the execution of the movements. 

Simply specify the **`duration`** argument **in seconds** when calling the method, as shown in the move examples above:
```python
reachy.head.rotate_to(20, 30, -10, duration=3)
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], duration = 5)


# Doing:
reachy.l_arm.goto_joints([0, 0, 0, 0, 0, 0, 0])
# will lead to the same result as:
reachy.l_arm.goto_joints([0, 0, 0, 0, 0, 0, 0], duration = 2)
```

> Default duration is 2 seconds.

You **cannot set a duration to 0 second**. This will raise an exception in your code:
??


## Moves interpolation mode

The moves methods generates a trajectory between the present position and the goal position. This trajectory is then interpolated at a predefined frequency (100Hz) to compute all intermediary target positions that should be followed before reaching the final goal position. Depending on the interpolation mode chosen, you can have a better control over speed and acceleration.

Two interpolation modes are available when sending a move command:
- the **linear** interpolation mode
- the **minimum-jerk** interpolation mode

{{< img-center "images/sdk/first-moves/interpolation.png" 400x "" >}}

Both trajectories start and finish at the same point but don't follow the same intermediate positions. The minimum jerk will slowly accelerate at the begining and slowly decelerate at the end. This makes the movements more natural.

You can specify the interpolation mode by setting the **`interpolation_mode`** argument when calling the method:
```python
reachy.head.rotate_to(20, 30, -10, interpolation_mode='linear')
reachy.l_arm.goto_joints([0, 0, 0, -90, 0, 0, 0], interpolation_mode='linear')


# Doing:
reachy.l_arm.goto_joints([0, 0, 0, 0, 0, 0, 0])
# will lead to the same result as:
reachy.l_arm.goto_joints([0, 0, 0, 0, 0, 0, 0], interpolation_mode='minimum_jerk')
```

> Default interpolation mode is minimum-jerk.