---
title: "Vision specifications"
description: "Vision system specifications of Reachy 2"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  hardware-guide:
    parent: "Specifications"
weight: 110
toc: true
seo:
  title: "Reachy 2 Vision Module: Head & Torso Camera Specifications"
  description: "Explore Reachy 2’s head and torso vision modules, featuring RGB cameras, Time of Flight (ToF) sensors, and RGB-D technology for enhanced manipulation. Learn how the cameras enable teleoperation, AI, and 3D mapping."
---

## Head vision module

### Modules

  {{< img-center "images/hardware-guide/specifications/vision/head_module.png" 600x "Head vision module" >}}

Our vision module combines several features in a single module in Reachy’s head:

- RGB cameras with fish-eye lenses for a wide field of view and more immersion:
    - [Arducam](https://www.arducam.com/product/1-58mp-imx296-color-global-shutter-camera-module-with-m12-lens-for-raspberry-pi/)
- Time of Flight (ToF) module between Reachy’s eyes:
    - [OAK-FFC ToF 33D](https://shop.luxonis.com/products/oak-ffc-tof-33d)
- On-chip video encoding supporting h264/h265:
  - [OAK-FFC 4P](https://shop.luxonis.com/products/oak-ffc-4p)

Different applications will use different cameras:

- *Teleoperation -* RGB cameras with fish-eye lenses to stream 3D vision to a VR headset
- *AI -* Time of Flight (ToF) module for accurate depth measurement and 3D mapping and RGB cameras for capturing the scene.

### Localisation

- Head camera *(localisation based on robot’s origin)*
    
  {{< img-center "images/hardware-guide/specifications/vision/stereo_localisation.png" 600x "Stereo cameras localisation" >}}
    
    
- Head TOF *(localisation based on robot’s origin)*
    
  {{< img-center "images/hardware-guide/specifications/vision/tof_localisation.png" 600x "ToF localisation" >}}


## Torso vision module

### Module

  {{< img-center "images/hardware-guide/specifications/vision/orbbec.png" 600x "Orbbec camera" >}}

Reachy has a RGB-D camera in its torso to improve its manipulation capabilities. This camera, as opposed to the ones in the head, is fixed. 

- *Depth camera -* RGB-D camera fitted into the torso:
  - [ORBBEC](https://www.orbbec.com/products/stereo-vision-camera/gemini-336/)


  {{< img-center "images/hardware-guide/specifications/vision/torso_camera.png" 600x "Torso camera" >}}


### Localisation

- Torso camera *(localisation based on robot’s origin)*
    
  {{< img-center "images/hardware-guide/specifications/vision/orbbec_localisation.png" 600x "Orbbec localisation" >}}
