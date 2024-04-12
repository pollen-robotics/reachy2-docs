---
title: "Find Reachy 2's IP"
description: "How to find Reachy 2 IP address"
lead: "How to find your robot's IP address."
date: 2023-07-26T08:46:47+02:00
lastmod: 2023-07-26T08:46:47+02:00
draft: false
images: []
type: docs
toc: true
weight: "50"
---

Here are 4 different options to find out the IP address of your robot.  
> Make sure your robot has already been connected to a network before trying to get its IP address.


## LCD display screen

If you haven't unplugged it, the LCD screen connected in Reachy's back should be diplaying its IP address.

{{< img-center "images/help/system/lcd-display.png" 400x "LCD display for IP" >}}

## Hard-wired connection

Use the appropriate cable and connect your computer directly to Reachy 2's computer. The cable has to be plugged in port (b) of Reachy 2's hardware interface.  

{{< img-center "images/help/system/serial-connection.png" 400x "serial connection port" >}}

We use `tio`for the serial connection. If you haven't installed it yet on your computer:
`apt install tio`

{{< alert icon="👉" text="Make sure <i>dialout</i> is in your groups, otherwise add it to your groups. To check it: <br> <code>>>> groups</code> <br>If it doesn't appear in the list, add it with: <br><code>>>> sudo usermod -aG dialout $USER</code>" >}}

Once connected, open a terminal on your computer and run:
```python
tio /dev/ttyUSB0
```
*Note that depending on the elements you connected to the robot, the port could be something else than ttyUSB0. Check other available serial ports with `ls /dev/ttyUSB*`*

{{< img-center "images/help/system/tio-terminal.png" 400x "tio connection terminal" >}}

{{< alert icon="👉" text="Login: <b>bedrock</b> <br>Password: <b>root</b>" >}}

You should then be connected to Reachy's computer via serial port.  
You can find the IP address with:
```python
ifconfig
```

{{< img "images/help/system/ifconfig.png" 400x "Square">}}
> In our case, Reachy 2's IP is *"192.168.86.56"*.

## Using the serial number

Find the serial number of your robot on its back, connect your computer on the same network as your robot, open a terminal and type:
```bash
ping <robot.serial.number>.local
```

>For example, if the serial number is reachy2-beta0003:
>```bash
>ping <reachy2-beta0003>.local
>```

## Using a smartphone

The **[Fing app](https://www.fing.com/products/fing-app)** let you scan IPs directly from your smartphone. 

To use it, install the app on your smartphone and connect your smartphone on the **same network** as the robot, then run an analysis of the network to find out the IPs connected. Reachy 2 must be one of them!
