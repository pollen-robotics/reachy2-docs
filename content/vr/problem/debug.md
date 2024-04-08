---
title: "Debug"
description: "Meeting a problem with teleoperation? Find out what can cause this and how to resolve the situation by yourself"
date: 2023-07-26T09:00:50+02:00
lastmod: 2023-07-26T09:00:50+02:00
draft: false
images: []
type: docs
toc: true
weight: "120"
---

## Check the info on the app!
Connect to the robot to get more information on the connection status and the status of the robot. Open the "info" menu on the left of the mirror.

{{< img "images/vr/problem/mirror-info.png" 600x "Mirror Info">}}

The connection status give you information about the communication with the robot. Existing connection status are the following:
* **Connected to a remote Reachy** *(green)*: everything seems to be working fine
* **Connected to a remote Reachy. No restart available** *(yellow)*: you do not have access to the restart service, but can use normally teleoperation
* **Connected to a remote Reachy. Mobile base unavailable** *(purple)*: the configuration of your robot declares a mobile base, but no mobility service is available. You can still teleoperate the robot with no mobility.
* **Trying to connect** *(blue)*: the app is looking for the connection with the robot
* **Robot connection failed** *(orange)*: you are connected to a remote robot, but either the camera feed or the data stream failed. Teleoperation is not possible
* **Unable to connect to remote server** *(red)*: no robot or service is detected after trying to connect

You can also check which services are available:
* **Camera**: camera service from the cameras. ***Mandatory for teleoperation (except for single arm configuration)***
* **Joints data**: joints services for sending and receiving data from the robot's joints. ***Mandatory for teleoperation***
* **Mobility**: services to control the mobile base, available only on robots equipped with a mobile base

## The app doesn't connect to the robot

If you are not connected to the robot, the reason can be one of the following:
* you are not connected to the right IP address
* the robot is not connected to the network
* the services are not working on the robot (either not launched or crashed)
* your computer is not connected to the network
* the connection is not stable enough for the app to stay connected to the robot

## Reachy never comes to be ready

First of all, check that the application managed to connect to the robot.  
The connection status with the robot is indicated at the top of the mirror.
Camera view (top right) is not available if the connection failed.

|Connected to the robot|Unable to connect to the robot|
|----------------------|------------------------------|
|{{< img "images/vr/problem/connected.png" 300x "Connected to Robot">}}| {{< img "images/vr/problem/notconnected.png" 300x "Not connected to Robot">}}|


## The robot doesn't move properly
**Reachy movements are shifted from my real movements**  
Your head was probably not correctly aligned with your body when you fixed your position, or you moved since the validation step.  
Come back to the mirror and validate your choices again to be able to fix a new position.  

**Reachy movements are jerky**  
The **connection is not fast enough** between the robot and your computer, or another program may be alterating the reactivity.  
A warning message may also be displayed during teleoperation indicated the network is either unstable or has low speed.

**The movements of the robot seem not correlated anymore with mine**  
If a motor is overheating, it may have **stopped working**, which can lead in movements looking very different than yours. In reality, the arm is still trying to move according to yours, but the unmoving joints make the configuration of the arm hard to understand.  
In most of the cases, an **error message** should be displayed in the teleoperation, telling that at least 1 motor is in critical error.  
Nevertheless it may happen that no error message is displayed, if the motor stopped working before having time to send the information to the teleoperation app: in that case, you received a warning message telling at least 1 motor was heating up previously during teleoperation. Check the **temperature of the motors** in the **Info panel** of the transition room.

## The mobile base doesn't move
Several elements can make the mobile base unreactive to your inputs.  
* If you are too close to a wall or object, the LIDAR anti-collision safety unables the mobile base to go closer to the obstacle. The mobile base will therefore not move in this direction, but you can still go in other directions. [More information on the anti-collision safety](https://docs.pollen-robotics.com/sdk/mobile-base/safety/)
* The mobility button has been disabled: to check the status of the mobility button, go in the help panel in the menu (welcome page). Set the mobility to ON.
{{< img "images/vr/problem/mirror-settings.png" 600x "Mirror Setttings">}}
* The mobility services are unavailable: check the status of the service in the help panel of the menu. The status of the mobility services is displayed in the info menu. 
* The configuration of your robot does not declare a mobile base, therefore the teleoperation application does not provide any mobility service. Check if a mobile base is expected in the Robot detected configuration section.

