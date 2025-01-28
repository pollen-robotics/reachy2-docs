---
title: "Motors & Actuators specifications"
description: "Audio system specifications of Reachy 2"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  hardware-guide:
    parent: "Specifications"
weight: 130
toc: true
---

Our Orbita actuators are parallel mechanisms (as opposed to serial mechanisms that are found in a majority of robots), powered by Maxon DC brushless motors. Our actuators are faster consume less power, and mimic human-like movements especially for Orbita 3D.

## Orbita 3D

Orbita 3D is used in Reachy’s neck and wrist(s). Orbita 3D is a special design with 3 concentric and stepped motorized axes, driven by brushless geared motors with a power of 40W each.

Custom embedded electronics capable of controlling the motors in FOC, communicating in ethercat.

Origin taking procedure at each restart, to find the nominal position whatever the position before ignition.

  {{< img-center "images/hardware-guide/specifications/motors-actuators/orbita3D.png" 600x "Orbita3D" >}}

### Key points

- Yaw: infinite rotation
- Pitch / Roll: +/- 45°
- Reversible articulation
- Hollow axis diameter 10mm
- Dedicated on-board electronics
- 24V power supply
- Ethercat protocol
- FOC control
- Origin setting when starting the robot

### Payload

  {{< img-center "images/hardware-guide/specifications/motors-actuators/orbita3D_payload.png" 600x "Orbita3D payload" >}}


### Specifications

|  | Nominal | Max |
| --- | --- | --- |
| Nominal voltage | 24V | ? |
| Speed | 50 rpm | 70 rpm |
| Mass | 3 Kg (@10 cm) | 5 Kg (@10 cm) |
| Torque | 3 N.m | 15 N.m (yaw) |
| Angular travel | 90° cone | infinite Yaw rotation |
| Slack | 0.5 ° | 1° |
| Diameter | 75 mm |  |
| Support distance / center of the joint | 95 mm | 108 mm (sphere included) |
| Length (with motors) | 180 mm | 220 mm (cables included) |

### Mechanical characteristics

| | |
| --- | --- | --- |
| Weight | 950 g |
| Hollow axis diameter | 10 mm |
| Geared motor | Brushless motor :Maxon ECXT22L |
| | GearBox : Maxon GPX22C 1:28 |
| | Encoder : Maxon EASY MILE 1024 pts |
| Internal ratio | 5.33 (64:12) |
| Reversibility | OK |

### Electronical characteristics

| | |
| --- | --- | --- |
| Power supply voltage | 24 V |
| Protocol  | Ethercat |
| Driver | FOC Control |
| Connectors | Ethercat : Pico Blade 5-pin (input & output) |
| | Power supply : Micro Fit 2-pin (Input & output) |
| | Programming : USB2 ou JTAG |
| Extra  | SPI : Pico Blade 4-pin |
| | Analog input : Pico Blade 2-pin |
| | Dynamixel 4-pin |


## Orbita 2D

Orbita 2D is used in Reachy’s elbow(s) and shoulder(s) and has 2 degrees of freedom.  

  {{< img-center "images/hardware-guide/specifications/motors-actuators/orbita2D.png" 400x "Orbita 2D" >}}

Parallel joint with 2 degrees of freedom, based on a differential mechanism.  

Features a hollow shaft and an internal cable routing path.  

A unique design that allows the two perpendicular rotation axes to intersect at the center of the spherical part, achieved through the use of two nested axes, driven by brushless gear motors with a power of 60W each.  

Custom embedded electronics capable of controlling the motors using FOC, communicating via EtherCAT.  

  {{< img-center "images/hardware-guide/specifications/motors-actuators/orbita2D_mechanics.png" 600x "Orbita 2D" >}}


### Key points

- Infinite rotation possible on both axes
- Reversible joint
- Hollow shaft with a 12.5mm diameter
- Dedicated embedded electronics
  - Power supply: 24V
  - Protocol: EtherCAT
  - Control: FOC
- Spherical design suited for humanoid robots

**Dimensions**

  {{< img-center "images/hardware-guide/specifications/motors-actuators/orbita2D_dimensions.png" 600x "Orbita 2D dimension" >}}

**Range of motion**

Infinite rotation possible on both axes (no internal end stops):
  {{< img-center "images/hardware-guide/specifications/motors-actuators/orbita2D_range_of_motion.png" 400x "Orbita 2D range of motion" >}}


### Payload

  {{< img-center "images/hardware-guide/specifications/motors-actuators/orbita2D_payload.png" 600x "Orbita 2D Payload" >}}


### Specifications

|  | Nominal | Max |
| --- | --- | --- |
| Nominal voltage | 24V | ? |
| Speed  | 50 rpm | 70 rpm |
| Torque | 12 N.m | 16.5 N.m  |
| Angular displacement | Depends on the configuration of the mobile part | Infinite rotation on both axes |
| Backlash  | 0.5 ° | 1° |
| Diameter | 95 mm |  |
| Distance from support to the center of the joint | 60 mm | 102.5 mm (including shells) |
| Length (with motors) | 162 mm | 180 mm (including cables) |

### Mechanical characteristics

| | |
| --- | --- | --- |
| Weight | 1.900 g |
| Hollow shaft diameter | 12.5 mm |
| Gear motor | Brushless motor :Maxon EC45 Flat |
| | GearBox : Maxon GPX32UP 35,030769230769 :1 (4554/130) |
| | Encoder : Maxon EASY MILE 1024 pts |
| Internal ratio | 1.9 (38:20) |
| Reversibility | OK |

**Mechanical interface**
  {{< img-center "images/hardware-guide/specifications/motors-actuators/orbita2D_mechanical_interface_1.png" 600x "Orbita 2D mechanical interface" >}}

  {{< img-center "images/hardware-guide/specifications/motors-actuators/orbita2D_mechanical_interface_2.png" 600x "Orbita 2D mechanical interface" >}}

The nominal position of Orbita 2D is achieved when both indexes are aligned as closely as possible (specific tool available).

### Electronical characteristics

| | |
| --- | --- | --- |
| Power supply voltage | 24 V |
| Protocol | Ethercat |
| Driver | FOC Control |
| Connectors | Ethercat : Pico Blade 5-pin (input & output) |
| | Power supply : Micro Fit 2-pin (Input & output) |
| | Programming : USB2 ou JTAG |
| Extra  | SPI : Pico Blade 4-pin |
| | Analog input : Pico Blade 2-pin |
| | Dynamixel 4-pin |
