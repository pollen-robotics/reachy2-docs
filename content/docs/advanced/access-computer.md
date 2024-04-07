---
title: "Access Reachy 2 computer"
description: "How to connect to the robot's embedded computer"
lead: "How to connect to the robot's embedded computer"
date: 2023-08-09T14:43:24+02:00
lastmod: 2023-08-09T14:43:24+02:00
draft: false
images: []
toc: true
---
There are several ways to connect to your robot.

## SSH connection
Using the robot's IP address (check [Find Reachy 2's IP]({{< ref "help/system/find-my-ip" >}}) if you don't know it), you can directly connect via ssh to Reachy 2's computer:

```python
ssh bedrock@<Reachy.2.IP.address>
```

> For example, with robot's IP being 192.168.1.42:
> ```python
> ssh bedrock@192.168.1.42
> ```

{{< alert icon="👉" text="<b>Password: root</b>" >}}

## Hard-wired connection

Use the appropriate cable and connect your computer directly to Reachy 2's computer. The cable has to be plugged in port (b) of Reachy 2's hardware interface.  

{{< img-center "images/docs/advanced/serial-connection.png" 500x "Serial connection port" >}}

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

## Avahi connection

Find the serial number of your robot on its back, connect your computer on the same network as your robot, open a terminal and type:
```bash
ping <robot.serial.number>.local
```

>For example, if the serial number is reachy2-beta1:
>```bash
>ping <reachy2-beta1>.local
>```