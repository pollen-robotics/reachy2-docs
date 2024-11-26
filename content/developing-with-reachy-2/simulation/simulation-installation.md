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

If you want to try movements on the robot without using the real robot, you can install a simulated Reachy 2 on your computer, and run it the same way the real robot is run. The easiest way is using a docker image. We will thus assume that you already have docker installed and setup.

Clone the sources of our docker, and pull the sources:
```python
git clone git@github.com:pollen-robotics/docker_reachy2_core.git  
cd docker_reachy2_core  
./pull_sources.sh beta  
```

Then download the configuration files:
```python
git clone git@github.com:pollen-robotics/reachy_config_example.git
cp -r reachy_config_example/.reachy_config ~/
```

In your docker_reachy2_core folder, compose a container with:
```python
docker compose -f dev.yaml up -d core
```
> This can take a few minutes to compose.

Build:
```python
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
python3 ../dev/reachy2-sdk/src/example/test_goto.py
```
> If you have the Python SDK installed on your computer, you can launch the example outside the container.
