---
title: "Introduction"
description: "What to expect from Reachy 2 simulation"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "Simulation"
weight: 30
toc: true
seo:
  title: "How to Run Reachy 2 Simulation with Docker: Step-by-Step Setup Guide"
  description: "Learn how to set up and run the Reachy 2 simulation using a preconfigured Docker image. Follow detailed steps for Windows, macOS, or Linux to prototype and test robot behaviors without hardware."
---

## Why using the simulation?

Whether you **don’t have a Reachy 2 robot** yet or you simply want to **prototype without using the real robot**, the simulation is the perfect place to start. 
 
The simulation environment replicates the behavior of the real Reachy 2 robot, allowing you to prototype and test your programs — even if you don’t have a physical robot.  

It behaves similarly to the **fake mode** of the **core service** available on a real Reachy 2, meaning you can control the robot as if it were real, but without any hardware dependencies.

## What is available in the simulation?

✅ **What works:**
- Full compatibility with the **Python SDK**
- Access to the **ROS 2 interface**, just like with the real robot
- Accurate simulation of **robot movements** and **responses**


🚫 **What’s not included:**
- **Camera access** is not available yet in simulation (*coming soon*)
- The **WebRTC service** is not simulated, meaning teleoperation features are not supported
- *Mobile base is not available yet in MuJoCo*


## Simulation platforms

2 platforms are currently supported for simulation:
- **Gazebo**
- **MuJoCo** (*still a work in progress*)


## Supported OS

To use simulation, we provide a preconfigured [**Docker image**](https://hub.docker.com/r/pollenrobotics/reachy2) that let you explore and develop for Reachy 2 on **any operating system**.  
In just a few steps, you’ll be able to interact with a fully simulated robot, ideal for testing behaviors, building applications, or just getting familiar with the platform.