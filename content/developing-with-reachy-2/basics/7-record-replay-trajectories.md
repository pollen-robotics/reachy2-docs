---
title: "7. Record and replay trajectories"
description: "Trajectories with high-frequency control on Reachy 2"
lead: "Play, record, replay trajectories at high frequency"
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
seo:
  title: "How to Record and Replay High-Frequency Trajectories on Reachy 2"
  description: "Learn how to record, visualize, and replay smooth high-frequency joint trajectories on Reachy 2. Perfect for teleoperation, learning demos, or responsive robot control."
---

So far, you've seen how to use `goto()` to move Reachy to specific positions. While this is perfect for **high-level actions**, it’s **not meant for high-frequency control**, like following a fast-changing target, reacting continuously to sensor input, or replaying smooth demonstrations with precision.

That’s where **recording and replaying trajectories** comes in.

## Use of send_goal_positions()

When you want Reachy to follow a **continuous trajectory**—whether captured from teleoperation, a learned model, or an external controller—you need something more responsive than `goto()`.

The `send_goal_positions()` method sends the specified goal positions to all the joints you provided a `goal_position` for:
- It allows you to **send joint positions frame by frame**, at high frequency (e.g. 100 Hz).
- It gives you **low-latency, real-time-like control** of the robot’s motion.

**Unlike `goto()`**, this method **does not interpolate** between positions, and sends the goal_position immediately.


**⚠️ Important: Use only for continuous trajectories**  

{{< warning icon="🛑" text="When you use <code>send_goal_positions()</code>, Reachy will attempt to move to the goal position <b>as fast as it can</b>. This means you must only use it to send <b>small, continuous steps</b>, where each goal is close to the current position. <br>If the gap between the current and target joint positions is too large, this can result in unsafe movements." >}}

#### Examples of reachy.send_goal_positions() usage

**🦾 Example 1: Set all joints to 0°**  
Before calling `send_goal_positions()`, you must manually set `goal_position` for each joint you want to control.

> ⚠️ **Do not play this example on a real robot**
```python
# Set all joints to position 0
for joint in reachy.joints.values():
    joint.goal_position = 0

# Send the command to the robot
reachy.send_goal_positions()
```
---
**🦾 Example 2: Play a sine wave on r_arm elbow**  
This example simulates sending high-frequency control to create a smooth trajectory:

```python
import time
import math

# Parameters
frequency = 0.5  # Hz, so one full movement every 2 seconds
duration = 5     # seconds
update_rate = 0.01  # 100Hz

start_time = time.time()

while time.time() - start_time < duration:
    t = time.time() - start_time
    angle = -25 + 25 * math.sin(2 * math.pi * frequency * t)  # Range: 0° to -50°
    reachy.r_arm.elbow.pitch.goal_position = angle
    reachy.send_goal_positions()
    time.sleep(update_rate)
```
---

## Recording a trajectory

{{< alert icon="📝" text="These basic examples do not perform any kind of filtering or modification of the data. <br>In the following examples, we will assume that you are already connected to your robot and know how to control individual joints." >}}

To record a trajectory, we will simply get the current positions of individual motors at a predefined frequency, typically 100Hz. We will first define a list of motors that we want to record. In this example, we will only record the joints from the right arm, but you can similarly record a single joint or all joints of the robot at once.

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

<br>

---

**🏅 You’re now a movement expert on Reachy 2.**  
There’s no secret left when it comes to making the robot move with precision and style.

But movement alone isn’t enough—if you want Reachy to **interact with the world**, it needs to **see** and **hear** what's around it.

🎥 Up next: **Learn how to use Reachy’s cameras** and open the door to perception-driven interaction!