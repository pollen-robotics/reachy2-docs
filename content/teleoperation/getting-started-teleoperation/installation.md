---
title: "Installation"
description: "Download and install the latest VR teleoperation application"
lead: "Download and install the latest VR teleoperation application"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  teleoperation:
    parent: "Getting started with teleoperation"
weight: 200
toc: true
seo:
  title: "Download and Install the Reachy 2 Teleoperation App on Windows"
  description: "Install Reachy 2’s teleoperation app on Windows with ease. Follow our guide for VR device setup, app download, and smooth installation steps."
---

> Reachy 2 is already fully compatible with the teleoperation application. You have nothing to install on the robot. All the installation must be done on your own Windows computer.


## 1. Check your VR device installation

Make sure that your VR device is properly installed and running on your computer.
Please refer to your device documentation.

{{<toggle-list title="Meta headsets (Quest 2, Quest 3 and Rift)" text="<i>Coming soon</i>">}}
{{<toggle-list title="HTC Vive" text="<i>Coming soon</i>">}}
{{<toggle-list title="Valve Index" text="<i>Coming soon</i>">}}

## 2. Install our teleoperation application

### Download the VR application

{{<my-button label="Download the latest VR application" link="https://github.com/pollen-robotics/Reachy2Teleoperation/releases/latest/download/Reachy2Teleoperation_installer.exe">}}

<br />
The dependencies are downloaded automatically, but you will have to confirm their inntallation during the installation process to install them. **Follow carefully the next steps to make sure your installation is correct:**  

### Launch the installer
Launch *Reachy2Teleoperation_installer.exe* from the Downloads of your File Explorer.

#### GStreamer installation
Select the **Complete** installation for gstreamer:

{{< img-center "images/vr/getting-started/complete-installation.png" 400x "" >}}


#### Microsoft Visual C++ Redistributable installation
Allow the installation of Microsoft C++ Redistributable, and accept the restart of your computer when requested.

{{< alert icon="👉" text="No standalone application is available yet for Reachy 2 teleoperation." >}}

### Advanced usage
Note that the application is open-source, you can directly use the [sources](https://github.com/pollen-robotics/Reachy2Teleoperation) for advanced usage. Refer to the online README for a correct installation.


