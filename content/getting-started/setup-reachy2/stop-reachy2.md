---
title: "Stop Reachy"
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
weight: 240
toc: true
seo:
  title: "How to Completely Power Off Reachy 2 – Power Consumption and Shutdown Guide"
  description: "Follow these steps to power off Reachy 2 completely, manage its power consumption, and maximize battery life for long-term storage."
---

## Steps to Completely Turn Off Your Robot

To power off your robot completely:

**A) Turn off Reachy’s computer from the dashboard.**  
Click on the shutdown button in the upper right corner of the dashboard.

**B) Press the Emergency Stop Button.**  
This will stop the power supply to the motors.

**C) Press the Button Located on Reachy’s Back.**  
This will stop the power supply to the computer and the devices powered by USB.

**D) Stop the Mobile Base Button.**  
The screen will remain ON for 2 seconds; do not be surprised.

## Understanding the Power Consumption

### Power Supply and Buttons

The mobile base uses the 24V battery to power the wheels directly. DC-DC converters are used to generate 5V (emergency button power, USB HUB power, and relay logic) and 12V for the upper body. The 5V converter draws almost 100mA when idle and is necessary for the emergency button logic.

The emergency button and the mobile base button both need to be ON to turn on the power relay that shares the 24V with the rest of the robot. However, the mobile base button is the only one that, when turned OFF, shuts down the 5V converter.

{{< alert icon="⚠️" text="When turning off the robot, always turn off the mobile base button to minimize the idle current consumption. If you turn off the robot with the emergency button and didn’t press the mobile base button before storing your robot, the battery will deplete faster." >}}

### Battery Life Good Practices

| Configuration | Time Before Depleting a Full Battery |
| --- | --- |
| Mobile base button ON, emergency button OFF | A few days |
| Mobile base button OFF | A few months |
| Unplugging the battery | A few years |

> 💡 Even with the mobile base button OFF, the battery screen will be powered (low consumption at around ~1mA). If you plan to store the robot for more than a month, we recommend unplugging the battery.
