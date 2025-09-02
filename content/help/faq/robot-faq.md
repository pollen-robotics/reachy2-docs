---
title : "Robot"
description: "Robot FAQ"
lead: "Frequently asked questions on the robot"
date: 2023-07-26T08:44:51+02:00
lastmod: 2023-07-26T08:44:51+02:00
draft: false
images: []
type: docs
menu:
  help:
    parent: "FAQ"
toc: true
weight: 200
seo:
  title: "Reachy 2 Connection & Troubleshooting Guide"
  description: "Learn how to connect to Reachy 2 via SSH, or hardwired; set WiFi, adjust volume, and troubleshoot motor, camera, or sound issues."
---

## Connection & Networks 

<details>
<summary>I cannot connect my robot to the network with an Ethernet cable
</summary>

### WiFi connection

Use the appropriate cable and connect your computer directly to Reachy 2's computer. The cable has to be plugged in the console port of Reachy 2's hardware interface.  

{{< img-center "images/docs/getting-started/serial-connection.png" 400x "Serial connection port" >}}

We use `tio`for the serial connection. If you haven't installed it yet on your computer:
`apt install tio`

{{< alert icon="👉" text="Make sure <i>dialout</i> is in your groups, otherwise add it to your groups. To check it: <br> <code>>>> groups</code> <br>If it doesn't appear in the list, add it with: <br><code>>>> sudo usermod -aG dialout $USER</code> <br>Then reboot your computer for the new group to be effective." >}}

Then, in a terminal on your computer, get access to the robot with:

```python
tio /dev/ttyUSB0
```

and press **Enter**. 

> Note that the connection could be on another USB port. Check all ports with `ls /dev/ttyUSB*`

{{< img-center "images/docs/getting-started/tio-terminal.png" 400x "tio connection terminal" >}}

{{< alert icon="👉" text="Login: <b>bedrock</b> <br>Password: <b>root</b>" >}}


Manually connect the robot to a WiFi with:
```bash
nmcli device wifi connect <wifi.name> password <your.password>
```

> For example, with the wifi *POLLEN-WIFI*, with password *superstrongpassword*:  
> `nmcli device wifi connect POLLEN-WIFI password superstrongpassword`

</details>

<details>
<summary>How to connect to my robot
</summary>

There are several ways to connect to your robot.

### SSH connection
Using the robot's name or its IP address (check [this section]({{< ref "/getting-started/setup-reachy2/connect-reachy2/#a-check-your-network" >}}) if you don't know how to find it), you can directly connect via ssh to Reachy 2's computer:

```bash
ssh bedrock@<Reachy.2.IP.address>
# the same as : 
ssh bedrock@<Reachy.2.name>.local
```

*For example, with robot's IP being 192.168.1.42 and name being r2-0000:*
```bash
ssh bedrock@192.168.1.42
# the same as : 
ssh bedrock@r2-0000.local
```

{{< alert icon="👉" text="<b>Password: root</b>" >}}

### Avahi connection

Find the serial number of your robot on its back, connect your computer on the same network as your robot, open a terminal and type:
```bash
ping bedrock@<robot.serial.number>.local
```

>For example, if the serial number is r2-0000:
>```bash
>ping bedrock@r2-0000.local
>```

### Hard-wired connection

Use the appropriate cable and connect your computer directly to Reachy 2's computer. The cable has to be plugged in the console port of Reachy 2's hardware interface.  

{{< img-center "images/docs/getting-started/serial-connection.png" 400x "Serial connection port" >}}

We use `tio`for the serial connection. If you haven't installed it yet on your computer:
`apt install tio`

{{< alert icon="👉" text="Make sure <i>dialout</i> is in your groups, otherwise add it to your groups. To check it: <br> <code>>>> groups</code> <br>If it doesn't appear in the list, add it with: <br><code>>>> sudo usermod -aG dialout $USER</code> <br>Then reboot your computer for the new group to be effective." >}}

Once connected, open a terminal on your computer and run:
```python
tio /dev/ttyUSB0
```
*Note that depending on the elements you connected to the robot, the port could be something else than ttyUSB0. Check other available serial ports with `ls /dev/ttyUSB*`*

{{< img-center "images/docs/advanced/tio-terminal.png" 500x "Tio connection port" >}}

{{< alert icon="👉" text="Login: <b>bedrock</b> <br>Password: <b>root</b>" >}}

You are then connected to Reachy 2 computer!

</details>

<details>
<summary>I can't connect to the wifi via the Dashboard
</summary>
You try to connect to your Wifi, but the connection seems to fail each time ? 

You can log in directly through your terminal, using ssh : 
```bash
ssh bedrock@<robot.ip.address>
# or use your robot name, written on the back of its neck :
ssh bedrock@<robot.name>.local
```
> password : root

then, manually connect the robot to a WiFi with:
```bash
nmcli device wifi connect <wifi.name> password <your.password>
```

> For example, with the wifi *POLLEN-WIFI*, with password *superstrongpassword*:  
> `nmcli device wifi connect POLLEN-WIFI password superstrongpassword`

Then **restart the reachy2-core service**. 

</details>

## Media 
*In all cases, you can check all logs of the reachy2-core and webrtc services in the Services section of the Dashboard.*

<details>
<summary>I can't have access to the cameras frames
</summary>
You are on the Dashboard, Media section and even when you press "Connect", you don't have any frames. 

#### Teleop camera
The camera is managed by the reachy2-core service if you're using the SDK Client and by the webrtc if you're using the teleoperation app. 
1. Try to restart the reachy2-core service or the webrtc, according to the application you're using.
2. If it's still not working, try to unplug/plug the first USB cable (port n°1)
3. Try to restart the robot completely. 

#### Depth camera (torso)
The camera is managed by the reachy2-core service. 
1. Try to restart the reachy2-core service. 
2. If it's still not working, try to restart the robot completely. 
</details>


<details>
<summary>I want to modify the sound volume</summary>

## Sound volume

If you want to change the volume, especially for the starting sound of your robot or the output sound when you teleoperate, you can go directly in the **Dashboard**, in the **Media** section and adjust the input and output rates. 

If that doesn't work, you can go on a terminal **when the webRTC service is running**: 

Run:
```console
$ ssh bedrock@your_robot_ip #password : root
$ docker exec -it webrtc_streaming_playback_ros bash
$ alsamixer -c 1 
```

Then, you can set the volume as you wish. 

</details>

## Motors

<details>
<summary> The launch sound is looping </summary>
If you hear the robot launch sound looping, it means that the core cannot run due to an error. You can check :
<ul>
  <li> the reachy2-core service logs in the dashboard, under Services.
  <li>that no red LEDs have appeared on any of the joint motors.
  <li>that the emergency stop button is not pressed.
</ul>

You can press the **emergency stop** button and return all joints to a neutral position, such as:
{{< img-center "/images/getting-started/setup-reachy2/start-reachy2/straight_posture.jpg" 200x "Reachy straight posture" >}} 

Then unpress it and let it calibrate again. 

If it's still not working, try **to shut down** your robot (meaning the emergency button + the bedrock button + the mobile base button) and switch it back on again.
</details>

{{< alert icon="👉" text="If your problem persists or is not listed in the FAQ, please contact the [support forum](https://forum.pollen-robotics.com/).">}}


