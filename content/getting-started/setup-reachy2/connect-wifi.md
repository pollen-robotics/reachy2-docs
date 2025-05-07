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
seo:
  title: "How to Connect Reachy 2 to WiFi – Serial and Network Setup Guide"
  description: "Learn how to connect Reachy 2 to WiFi via serial connection and network setup, with detailed instructions for configuring your robot’s network connection."
---

## WiFi

On your first connection to a network, the simplest method is to connect your robot with an Ethernet cable.  

If you cannot do this:

Use the appropriate cable and connect your computer directly to Reachy 2's computer. The cable must be plugged into port (b) of Reachy 2's hardware interface.  

{{< img-center "images/docs/getting-started/serial-connection.png" 400x "Serial connection port" >}}

We use `tio` for the serial connection. If you haven't installed it yet on your computer:
```bash
apt install tio
```

{{< alert icon="👉" text="Make sure <i>dialout</i> is in your groups. Otherwise, add it to your groups. To check it: <br> <code>>>> groups</code> <br>If it doesn't appear in the list, add it with: <br><code>>>> sudo usermod -aG dialout $USER</code> <br>Then reboot your computer for the new group to be effective." >}}

Then, in a terminal on your computer, access the robot with:

```bash
tio /dev/ttyUSB0
```

> Note: The connection could be on another USB port. Check all ports with:
> ```bash
> ls /dev/ttyUSB*
> ```

{{< img-center "images/docs/getting-started/tio-terminal.png" 400x "tio connection terminal" >}}

{{< alert icon="👉" text="Login: <b>bedrock</b> <br>Password: <b>root</b>" >}}

Manually connect the robot to a WiFi network with:
```bash
nmcli device wifi connect <wifi.name> password <your.password>
```

> For example, with the WiFi *POLLEN-WIFI* and password *superstrongpassword*:  
> ```bash
> nmcli device wifi connect POLLEN-WIFI password superstrongpassword
> ```

{{< my-button link="/getting-started/setup-reachy2/connect-reachy2/" label="< Back to network connection" >}}
