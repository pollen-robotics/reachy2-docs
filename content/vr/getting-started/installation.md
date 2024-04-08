---
title: "Installation"
description: ""
lead: "How to install the VR teleoperation application"
date: 2023-08-21T16:00:11+02:00
lastmod: 2023-08-21T16:00:11+02:00
type: docs
draft: false
images: []
toc: true
weight: "40"
---

{{< alert icon="⬇️" text="<a href=\"https://github.com/pollen-robotics/ReachyTeleoperation/releases\"> Download the latest version of the app</a>">}}

## On the Windows computer

### 1. Check VR device installation

Make sure that your VR device is properly installed and running (please refer to your device documentation).

### 2. Download application

[Download the zip archive from our github repo](https://github.com/pollen-robotics/ReachyTeleoperation/releases), and unzip it.

> Reachy 2 is already fully compatible with the teleoperation application. You have nothing to install on the robot.

{{< alert icon="👉" text="No standalone application is available yet for Reachy 2 teleoperation." >}}

### 3. Install GStreamer

The project relies on GStreamer.  

- Please install the **[Windows Runtime](https://gstreamer.freedesktop.org/data/pkg/windows/1.24.0/msvc/gstreamer-1.0-msvc-x86_64-1.24.0.msi)**.  

- Choose the **complete installation**:
{{< img-center "images/vr/getting-started/complete-installation.png" 400x "" >}}

- Add `C:\gstreamer\1.0\msvc_x86_64\bin` to your PATH environment variable.  
To do so:  
  - Access the **Edit the system environment variables** control panel:
  {{< img-center "images/vr/getting-started/control-panel.png" 400x "" >}}

  - Open **Environment Variables...**:
  {{< img-center "images/vr/getting-started/environment-variables.png" 400x "" >}}

  - Select the **Path** variable and click **Edit...**:
  {{< img-center "images/vr/getting-started/user-variables.png" 400x "" >}}

  - Click **New** and **add `C:\gstreamer\1.0\msvc_x86_64\bin`** to the list:
  {{< img-center "images/vr/getting-started/new-variable.png" 400x "" >}}

  - Also check you have GSTREAMER_1_0_ROOT_MSVC_X86_64 in your System variables, value being `C:\gstreamer\1.0/msvc_x86_64\`:
  {{< img-center "images/vr/getting-started/system-variables.png" 400x "" >}}

- **Reboot** your computer after the installation.

### 4. Configure the firewall

{{< img-center "images/vr/getting-started/firewall.png" 400x "" >}}

{{< img-center "images/vr/getting-started/allow-app.png" 400x "" >}}

### 5. Choose your headset refresh rate (optional)

If you have a Meta Quest headet, we advise you to set the refresh rate at 120 Hz.  

To do so, use the desktop Meta app (the one appearing on your computer when your headset is connected on your computer and the link activated).  
In the devices tab, select your headset, and modify the graphics preferences in the advanced section.

{{< img-center "images/vr/getting-started/refresh-rate.png" 400x "" >}}
