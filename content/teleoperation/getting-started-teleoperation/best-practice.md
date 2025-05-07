---
title: "Best practice"
description: "Safety guidelines and other best practice for a safe teleoperation"
lead: "Safety guidelines and other best practice for a safe teleoperation"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  teleoperation:
    parent: "Getting started with teleoperation"
weight: 220
toc: true
seo:
  title: "Important Teleoperation Guidelines for Safely Using Reachy 2"
  description: "Learn essential guidelines for safe, smooth teleoperation of Reachy 2 to avoid damage and ensure precise, reliable robot control."
---


{{< warning icon="👉🏾" text="This page contains really important information about the use of the teleoperation app. <b>Please make sure you read it carefully before teleoperating Reachy.</b>" >}}

Using teleoperation application has nothing complicated, but you need to respect a few guidelines to avoid damaging the robot when using it. This page goes through the main elements you need to keep in mind while teleoperating Reachy. The guidelines are not exhaustive, but should give you a good start on how to safely use the application.

## Ideal use of teleoperation

The ideal position to start teleoperation may depend on the surrounding of Reachy. Nevertheless, if the robot environment is compatible with it, we advise to start with the elbows at 90 degrees, lightly away from the torso.

{{< img "images/vr/use-teleop/idealPosFaceReduced.jpg" 300x "ideal position face">}}
{{< img "images/vr/use-teleop/idealPosProfReduced.jpg" 300x "ideal position side">}}

<br />
<br />
Here is a video of movements and positions that are suitable for teleoperation:
<br />
<br />

{{< video "videos/vr/use-teleop/ChestOk.mp4" "80%" >}}

<br />
Follow all the elements described in the next sections to teleoperate Reachy in the best conditions! 

## All guidelines in video
Watch this quick video to have an overview of the main guidelines to use teleoperation:  

{{< youtube bK7th6zY8Rg >}}

<br />
The next sections go deeper into each guideline presented in the video and the risks of not following them.

## Keep the right position 
The mapping between your position and the robot is made when holding (A) to start teleoperation. The position and rotation of your headset <b>at this moment</b> are used to calibrate the system. If you move (i.e. change either your body position or orientation), the controllers positions will still be calculated in this coordinate system, and Reachy movements won't look like like yours anymore.  For these reasons, you must:

- <b>Not move your feet</b> when teleoperating Reachy: they must stay static on the floor.

{{< video "videos/vr/use-teleop/FeetOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/FeetNotOk.mp4" "40%" >}}


- <b>Not rotate your torso</b>.
In fact, Reachy's torso won't move, only the arms will try to reach the positions, and this may lead to collision between the Reachy's arms and torso.

{{< video "videos/vr/use-teleop/ChestOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/ChestNotOk.mp4" "40%" >}}

## Avoid movements discontinuities
Reachy doesn't have the exact same degrees of freedom as you have, neither the same range for each joints. When a position cannot be reached, either because of the position or the orientation, the inverse kinematics gives the closest arm configuration found. The closest configuration found for the next position may be:

- the same as the previous one, so the arm won't move and you have the impression Reachy is not following your movements anymore
- quite different from the previous one, which will lead to sudden changes of the arm position

All this contribute to give movements that seem incontrollable, due to discontinuities in the arm's inverse kinematics.

**To avoid this situation:**

- Avoid using extreme joints orientations while teleoperating Reachy
- Avoid unusual arm positions, there are probably above Reachy's joints limits

{{< video "videos/vr/use-teleop/MovementsOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/MovementsNotOk.mp4" "40%" >}}

- The most limiting joint is the elbow: avoid working to close to your chest, the elbow will be at the limit of its range of motion

{{< video "videos/vr/use-teleop/TorsoArmOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/TorsoArmNotOk.mp4" "40%" >}}

- If the robot seems to stop following your movements, do not continue to move in this direction, you have already reached its workspace limit. Go back to a position you know can be reached.


## Avoid damaging motors
Reachy's arms have been designed to manipulate objects at a table level and nearby.
Some positions away from this nominal area can require a lot of effort from the motors to be maintained, and cause them to overheat fast. Moreover, manipulating objects requires more effort from the motors.

**To avoid damaging motors:**

- Avoid doing movements above your head
- Avoid keeping your arms straight ahead horizontally to the floor, where the shoulders motors have to carry all the weight of the arms in a static position

{{< video "videos/vr/use-teleop/AboveHeadOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/AboveHeadNotOk.mp4" "40%" >}}

- Do not let the motors in stiff mode when you are in the menu if you are not going to teleoperate the robot soon
- Do not try to lift objects that are above Reachy's capabilities. If you try to lift an object and see that Reachy's arm can follow your movement or if you head some crackling noise coming from the motors, it probably means that the object is too heavy for Reachy's arm.

{{< video "videos/vr/use-teleop/WeightOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/WeightNotOk.mp4" "40%" >}}

## Avoid damaging 3D parts
Hitting Reachy's arms on objects can break 3D parts of the robot. It may happen even if the arms crash into something at moderate speed.

**To avoid damaging 3D parts:**
- Check the environment surrounding the robot before starting the teleoperation. Make sure you have enough space around the robot and that there is no object to be hit by the robot (this may also save your object from being broken...)

{{< video "videos/vr/use-teleop/CheckSpaceRobotOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/CheckSpaceRobotNotOk.mp4" "40%" >}}

- Stop teleoperation close to the position which will be reached when the motors will be compliant, so that the arms won't fall from high.

{{< video "videos/vr/use-teleop/StopArmOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/StopArmNotOk.mp4" "40%" >}}

## Use teleop safely
- Check the environment around you before starting teleoperation.

{{< video "videos/vr/use-teleop/CheckSpaceOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/CheckSpaceNotOk.mp4" "40%" >}}

- Stop teleoperation before removing your headset! You must be back in the menu before dropping the controllers and removing your headset, because Reachy will continue following your movements until you stop it.

{{< video "videos/vr/use-teleop/RemoveHeadsetOk.mp4" "40%" >}}

{{< video "videos/vr/use-teleop/RemoveHeadsetNotOk.mp4" "40%" >}}


## Familiarize yourself with the robot
- Before teleoperating the actual robot, familiarize yourself with its movements, its workspace and its joints limits. The virtual robot in the mirror scene is a good opportunity for that.
- Stay near the robot for your first trials: listen to the motors sounds, be aware of your workspace and field of view in a environment you know, try to manipulate light objects.
- Explore your own workspace with small and quite slow movements to see how the robot reacts and better understand the relation between your movements and its.


{{< alert icon="💡" text="You may feel like being in a video game at some point, but never forget that your movements are reproduced in real life!" >}}