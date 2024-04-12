---
title: "Use Reachy 2 properly"
description: "Guidelines to use Reachy 2 safely, for you and the robot"
date: 2023-07-26T08:45:34+02:00
lastmod: 2023-07-26T08:45:34+02:00
draft: false
images: []
type: docs
toc: true
weight: "60"
---


{{< warning icon="👉🏾" text="Reachy 2 is much more powerful than the previous version. To avoid any accident, please follow carefully the safety guidelines. </br>Non-compliance to these guidelines can lead to severe injuries or death." >}}

> There is currently **no internal security** on the robot: it won't stop if hitting anything or anyone, even itself. Remain constantly watchful when using it.

## Users

### Attention and reaction

Users must be in **full possession of their physical and mental powers at all times** when using the robot. Reachy 2 must never be used by someone having consumed substances that could affect their reactions, such as medication, drugs or alcohol.  

Users must **keep attention focused** on the robot at any time, especially if they are near the robot workspace, and imperatively if they are in its workspace or if they are responsible for the [emergency stop button]({{< ref "/sdk/getting-started/safety#emergency-stop-button" >}}).  

### Qualified users

The robot must not be used if no qualified user is present.  

People using the robot or interacting with it must all be aware of the risks and be explicitly informed of the robot capabilities, limitations and restrictions. They must all be able to act with the appropriate behavior using the robot.  

{{< alert icon="👉" text="No one should use the robot without knowing the safety guidelines." >}}

## Emergency stop button

The robot is delivered with an emergency stop button.  

Pressing the emergency stop button will **immediately power off all motors**, from the arms to the mobile base wheels. Nevertheless it won't power off the computer, which means <u>you won't lose anything running on the computer</u>.  

> If at anytime you feel that you're losing control of the robot's movements or notice an unexpected behavior, **never hesitate to press the emergency stop button**.

Someone must be holding the emergency stop button at any time when using the robot, being ready to press the button if needed, and keep its attention focused on the robot.

{{< alert icon="👉" text="Objects may fall out of the grippers when pressing the emergency stop button. Make sure they cannot cause injuries." >}}

## Don't harm yourself...

Reachy 2 is a powerful robot that may hurt you if it is misused.  

If you do not respect the safety guidelines, you expose yourself to the following risks:
- pinching
- crushing
- punches
- electrical hazard

### Alertness

People interacting with the robot or present in its workspace must always look at the robot.

### Appropriate behavior

Do not expose yourself to dangerous punches:

Never place your head in between or underneath segments of the robot.  

If you are in the workspace of the robot, always stay in a position that allows you to quickly retract or recoil.

### Free space for retracting

If people are standing in the robot workspace, make sure they have **sufficient space to retract or recoil**, and that this space is free of obstacles.  

People must never be blocked between the robot and a wall or furniture.

### Objects manipulation with Reachy 2

Be careful with the objects you manipulate with the robot. Sharp and pointed object manipulation is dangerous, do not get close to the robot if it manipulates such objects.  

For all manipulation tasks, users are responsible for assessing the hazards and risks relative to the objects they manipulated with the robot. 

### Manipulate the robot

When the robot is in use, never manipulate robot parts at the same time.  

Do not put your fingers in the actuators or between robot parts to avoid pinching or crushing.

### Hardware intervention

Never make any hardware intervention on the robot, such as screwing on unscrewing something on it, if it is powered on.

## and don't harm Reachy 2!

There are a few things you need to know to make sure that your Reachy doesn't get damaged when using it.

### Carrying heavy objects

Be careful of the position of the arms when lifting heavy objects with the robot.  
Avoid carrying the object to far from the robot torso, mainly to avoid risk of front toppling.  

Do not try to lift objects over 3kg (6.6lb).

### Pulling/pushing

Do not try to pull or push elements with too much opposition!  

This may result in a robot toppling.

### Obstacles

Be aware of obstacles!  

When you are sending movements instructions to Reachy, be careful to obstacles the robot can meet. The robot will try to reach the positions you asked for as hard as it can, whether or not there is something on its way.  

Because of the force of the robot, and depending on the weigh or fragility of the object, two things may occur:
- make the object fall and/or break it
- make Reachy 2 tumble

### Self-collision

When you are moving both arms simultaneously, there are no safety measures implemented to prevent them from hitting each other.  
Nothing will neither prevent Reachy's arms from hitting its chest if you ask them to.  

If situations like these happen, do not hesitate to turn off the motors so that Reachy's motors will stop trying to reach a position they can't get to.

### Anti-collision LIDAR safety

:warning: The anti-collision LIDAR safety has been deactivated.