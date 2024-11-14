---
title: "Stop Reachy 2"
description: "Turn off the robot"
lead: "At the end, stop your robot"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  getting-started:
    parent: "Setup Reachy 2"
weight: 230
toc: true
---

## Power off your robot

Power off your robot in the exact opposite order you turned it on!  

To stop your robot: 

1. From the dashboard, click on the Power Off button in the footer. 
2. Press the emergency stop button.
3. Press the mobile base button.
4. Wait for the led of the computer to turn off, then unplug the green port from the robot's computer.


## Understanding the power buttons and battery life good practices
The mobile base uses the 24V battery to power the wheels directly. DC-DC converters are used to generate 5V (emergency button power, USB HUB power and relay logic) and 12V for the upper body.
The 5V converter draws almost 100mA when idle and is necessary for the emergency button logic.

The emergency button and the mobile base button both need to be ON to turn on the power relay that shares the 24V with the rest of the robot. However, the mobile base button is the only one that, when turned OFF, shuts down the 5V converter.


> :warning: **WARNING!** :warning: When turning off the robot, always turn off the mobile base button to minimize the idle current consumption. If you turn off the robot with the emergency button and didn't press the mobile base button before storing your robot, the battery will deplate faster.

:bulb: Even with the mobile base button OFF, the battery screen will be powered (low consumption at around ~1mA). If you plan to store the robot for more than a month, we recommend unplugging one of the wires of the battery (like when you received the robot).


|                Configuration                | Storage time before depleting a full battery |
| :-----------------------------------------: | :------------------------------------------: |
| Mobile base button ON, emergency button OFF |                  A few days                  |
|           Mobile base button OFF            |                 A few months                 |
|           Unplugging the battery            |                 A few years                  |

