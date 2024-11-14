---
title: "Connect your robot to the WiFi"
description: "How to connect your robot to the WiFi without using the dashboard."
lead: "How to connect Reachy 2 to WiFi without the dashboard"
date: 2023-08-09T14:43:31+02:00
lastmod: 2023-08-09T14:43:31+02:00
draft: false
images: []
toc: true
hidden: true
---
## WiFi

On your first connection to a network, the simpliest is to connect your robot with an ethernet cable.  

If you cannot do this:

Use the appropriate cable and connect your computer directly to Reachy 2's computer. The cable has to be plugged in port (b) of Reachy 2's hardware interface.  

{{< img-center "images/docs/getting-started/serial-connection.png" 400x "Serial connection port" >}}

We use `tio`for the serial connection. If you haven't installed it yet on your computer:
`apt install tio`

{{< alert icon="👉" text="Make sure <i>dialout</i> is in your groups, otherwise add it to your groups. To check it: <br> <code>>>> groups</code> <br>If it doesn't appear in the list, add it with: <br><code>>>> sudo usermod -aG dialout $USER</code> <br>Then reboot your computer for the new group to be effective." >}}

Then, in a terminal on your computer, get access to the robot with:

```python
tio /dev/ttyUSB0
```

> Note that the connection could be on another USB port. Check all ports with `ls /dev/ttyUSB*`

{{< img-center "images/docs/getting-started/tio-terminal.png" 400x "tio connection terminal" >}}

{{< alert icon="👉" text="Login: <b>bedrock</b> <br>Password: <b>root</b>" >}}


Manually connect the robot to a WiFi with:
```bash
nmcli device wifi connect <wifi.name> password <your.password>
```

> For example, with the wifi *POLLEN-WIFI*, with password *superstrongpassword*:  
> `nmcli device wifi connect POLLEN-WIFI password superstrongpassword`

{{< my-button link="/getting-started/setup-reachy2/connect-reachy2/" label="< Back to network connection" >}}