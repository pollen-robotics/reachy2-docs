---
title: "Simulation installation"
description: "How to install a simulation of Reachy 2"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "Simulation"
weight: 400
toc: true
---

> Whether you **don’t have a Reachy 2 robot** yet or simply want to **prototype without using the real robot**, the simulation is the perfect place to start. 
 
We provide a preconfigured **Docker image** that lets you explore and develop for Reachy 2 on any operating system. In just a few steps, you’ll be able to interact with a fully simulated robot, ideal for testing behaviors, building applications, or just getting familiar with the platform.

You can set up the simulation in two ways:
- Pull the [ready-to-use image from Docker Hub](https://hub.docker.com/r/pollenrobotics/reachy2)
- Pull it yourself from our [GitHub repository](https://github.com/pollen-robotics/docker_reachy2_core) *(not available yet)*

## From Docker Hub

### 1. Install Docker
Follow the installation instructions for [Docker Desktop](https://www.docker.com/products/docker-desktop/)⁠.  
You don't need to be logged in, as the image is open.

### 2. Run the Robot Simulation

#### Option 1: Via Docker Desktop (GUI)

#### Option 2: Via Command Line Interface


### 3. Accessing the Displays
#### Rviz/Gazebo
To access Rviz or Gazebo, open the following URL in your web browser: [localhost:6080/vnc.html?autoconnect=1&resize=remote⁠](http://localhost:6080/vnc.html?autoconnect=1&resize=remote⁠)

#### Jupyter Notebook
To access the notebook interface, go to: [localhost:8888/tree](http://localhost:8888/tree⁠)⁠

## From GitHub
We will thus assume that you already have docker installed and setup.

Clone the sources of our docker, and pull the sources:
```python
git clone git@github.com:pollen-robotics/docker_reachy2_core.git  
cd docker_reachy2_core  
./sources checkout stable  
```

Then download the configuration files:
```python
git clone git@github.com:pollen-robotics/reachy_config_example.git
cp -r reachy_config_example/.reachy_config ~/
```

In your docker_reachy2_core folder, compose a container with:
```python
docker compose -f mode/dev.yaml up -d core
```
> This can take a few minutes to compose.

Build:
```python
full_build
cbuilds
```


In a first terminal, launch the robot server:
```python
# terminal 1
docker exec -it core bash
ros2 launch reachy_bringup reachy.launch.py fake:=true start_sdk_server:=true start_rviz:=true
```
Keep this terminal open, and in a second terminal:
```python
# terminal 2
docker exec -it core bash
python3 dev/reachy2-sdk/src/example/draw_square.py
```
> If you have the Python SDK installed on your computer, you can launch the example outside the container.
