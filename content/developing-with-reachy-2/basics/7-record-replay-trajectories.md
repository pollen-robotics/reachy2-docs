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

All examples given below will show trajectories record on each of the robot joints. The position of each motor will be stored at a predefined frequency (typically 100Hz). Similarly, the replay will set new target position using the same frequency. Those basics examples does not perform any kind of filtering or modification of the data.

In the following examples, we will assume that you are already connected to your robot and know how to control individual motors.

## Recording a trajectory

To record a trajectory, we will simply get the current positions of individual motors at a predefined frequency. We will first define a list of motors that we want to record. In this example, we will only record the joints from the right arm, but you can similarly record a single motor, or all motors of the robot at once.

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
    # We here get the present position for all of recorded joints
    current_point = [joint.present_position for joint in recorded_joints]
    # Add this point to the already recorded trajectories
    trajectories.append(current_point)

    time.sleep(1 / sampling_frequency)
```
If you want to record a demonstration on the robot, first make sure the robot is compliant. Then, put it in the starting position. Run the code, and start moving the robot. After 5 seconds, the loop will stop and the movements you have made on Reachy will be recorded. 

Depending on your uses, you can define another duration. You can also choose not to use a specify duration but maybe use start and stop event to record. In such case, the easiest way is probably to run the loop within a thread or an asynchronous fonction, so it can run in background.

## Visualise your recordings

The trajectories you recorded can be converted to numpy array for more complex processings:

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

Replaying the recorded trajectory basically uses the same loop but set the goal position instead of reading the present position. 

But before actually replaying the trajectory, there are a few key points that you should take care of:

- First, make sure the joints you are going to move are stiff.
- Then, if the arm is not in the same position than the one you use as a start position of your recording, the beginning of the replay will be really brutal. It will try to go to the starting position as fast as possible.

To avoid that, you can use the goto function to first go to the first point of your trajectories:

```python
# Set all used joint stiff
reachy.r_arm.turn_on()

# Create a dict associating a joint to its first recorded position
first_point = dict(zip(recorded_joints, trajectories[0]))

# Goes to the start of the trajectory in 3s
reachy.r_arm.goto(first_point, duration=3.0)
```

Now that we are in position, we can actually play the trajectory. To do that, we simply loop over our recordings and set the goal position of each joints then send all the commands at the same frequency:

```python
import time

for joints_positions in trajectories:
    for joint, pos in zip(recorded_joints, joints_positions):
        joint.goal_position = pos
    reachy.send_goal_positions(check_positions=False)
    time.sleep(1 / sampling_frequency)
```

> The check_positions parameter is used to check that the goal positions have been reached after the command has been sent, and that there has been no problem with an unreachable position. That process can take time et slow your replaying. Since it's a recording, all poses are necessarily reachable, so there's no need to waste process time on this check. 


Now all we have to do is move the mobile base!