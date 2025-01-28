---
title: "7. Record and replay trajectories"
description: "Record and replay trajectories using the Python SDK"
lead: "Record and replay trajectories"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "SDK basics"
weight: 260
toc: true
---
<br>

You can easily record joint trajectories directly on Reachy, store and replay them later. This page will show you how to implement such mechanisms. 

All examples given below will show trajectory recordings on each of the robot's joints. The position of each motor will be stored at a predefined frequency (typically 100Hz). Similarly, the replay will set new target positions using the same frequency. These basic examples do not perform any kind of filtering or modification of the data.

In the following examples, we will assume that you are already connected to your robot and know how to control individual motors.

## Recording a trajectory

To record a trajectory, we will simply get the current positions of individual motors at a predefined frequency. We will first define a list of motors that we want to record. In this example, we will only record the joints from the right arm, but you can similarly record a single motor or all motors of the robot at once.

```python
# assuming we run something like this before:
# reachy = ReachySDK(host='10.0.0.201') 

recorded_joints = [
    reachy.r_arm._shoulder.pitch,
    reachy.r_arm._shoulder.roll,
    reachy.r_arm._elbow.yaw,
    reachy.r_arm._elbow.pitch,
    reachy.r_arm._wrist.roll,
    reachy.r_arm._wrist.pitch,
    reachy.r_arm._wrist.yaw,
]
```

Now let's define our frequency and record duration:

```python
sampling_frequency = 100  # in Hz
record_duration = 5  # in sec.
```

Our record loop can then be defined as such:

```python
import time

trajectories = []

start = time.time()
while (time.time() - start) < record_duration:
    # Here we get the present position for all recorded joints
    current_point = [joint.present_position for joint in recorded_joints]
    # Add this point to the already recorded trajectories
    trajectories.append(current_point)

    time.sleep(1 / sampling_frequency)
```
If you want to record a demonstration on the robot, first make sure the robot is compliant. Then, put it in the starting position. Run the code, and start moving the robot. After 5 seconds, the loop will stop and the movements you have made on Reachy will be recorded. 

Depending on your use case, you can define another duration. You can also choose not to use a specific duration but instead use start and stop events to control recording. In such cases, the easiest way is probably to run the loop within a thread or an asynchronous function so it can run in the background.

## Visualize your recordings

The trajectories you recorded can be converted to a numpy array for more complex processing:

```python
import numpy as np

traj_array = np.array(trajectories)
```

If you are familiar with matplotlib, you can also plot it via:

```python
from matplotlib import pyplot as plt

plt.figure()
plt.plot(trajectories)
```

## Replay a recorded trajectory

Replaying the recorded trajectory basically uses the same loop but sets the goal position instead of reading the present position. 

Before actually replaying the trajectory, there are a few key points to consider:

- First, make sure the joints you are going to move are stiff.
- Then, if the arm is not in the same position as the one you used as a starting position for your recording, the beginning of the replay will be abrupt. It will try to go to the starting position as fast as possible.

To avoid this, you can use the `goto` function to first go to the initial point of your trajectories:

```python
# Set all used joints to stiff mode
reachy.r_arm.turn_on()

# Create a dict associating a joint to its first recorded position
first_point = dict(zip(recorded_joints, trajectories[0]))

# Go to the start of the trajectory in 3 seconds
reachy.r_arm.goto(first_point, duration=3.0)
```

Now that we are in position, we can actually play the trajectory. To do this, we simply loop over our recordings, set the goal position of each joint, and then send all the commands at the same frequency:

```python
import time

for joints_positions in trajectories:
    for joint, pos in zip(recorded_joints, joints_positions):
        joint.goal_position = pos
    reachy.send_goal_positions(check_positions=False)
    time.sleep(1 / sampling_frequency)
```

> The `check_positions` parameter is used to verify that the goal positions have been reached after the command has been sent and that there have been no problems with unreachable positions. This process can take time and slow your replay. Since this is a recording, all poses are necessarily reachable, so there's no need to waste processing time on this check. 

Now all we have to do is move the mobile base!
