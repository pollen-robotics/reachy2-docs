---
title: "Latency and network insights"
description: "Get expected latency"
lead: "What could you expect in the best conditions"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  teleoperation:
    parent: "Compatibility & Specifications"
weight: 110
toc: true
seo:
  title: "Latency Benchmarks for Reachy 2 VR Teleoperation"
  description: "Reachy 2 achieves ~74 ms hand-to-gripper and ~135 ms glass-to-glass VR latency under good conditions for smooth teleoperation."
---

As we know latency is crucial for a good experience in VR teleoperation, we put a lot of effort in making the latency as small as possible.  

We make tests to give your insights of what you could expect in good network conditions.

## Movements latency

Hand to Gripper latency: **74ms**

We call hand to gripper latency the elapsed time between the timestamp the VR controller is recorded to be at a given position and the timestamp the end-effector of the robot's arm is recorded at this same position.

<details>
<summary>How we measured it</summary>

Using the Meta Quest 2 headset, we put the right controller in the operator hand and the left controller in the robot hand. Doing up/down movements with the arm, we record the position of both controllers.

  {{< img-center "images/vr/compatibility-specifications/movements_latency.png" 600x "Hand to gripper latency" >}}

We then compare the timestamps of the peaks for both controllers.

</details>

## Video latency

Glass to glass latency: **135ms** (using Meta Quest 2)  
*Glass to glass latency without VR: 88ms*  

We call glass to glass latency the elapsed time between the occurence of an event captured by the robot's camera and the moment this event is displayed to the operator in the headset.

<details>
<summary>How we measured it</summary>

**Glass to glass with VR**  

We watch with the robot a screen on which we display a millisecond timer, and record the screen with this live timer and the image displayed in the headset at the same time. The time difference between the two timers gives a measure of the glass-to-glass latency.

  {{< img-center "images/vr/compatibility-specifications/glass-to-glass_latency_setup.png" 600x "Glass-to-glass latency measurement setup" >}}


  {{< img-center "images/vr/compatibility-specifications/glass-to-glass_latency_screenshot.png" 600x "Glass-to-glass latency screenshot" >}}

**Glass to glass without VR**  

Second measures are based on [Bachhuber and Steinbach, 2016](https://arxiv.org/abs/1510.01134).
We base the latency measure on a light flashing recorded in real and viewed from the videostream.  

With no use of VR, displaying the teleop app on a screen connected directly to the graphical card, we measure a latency closer to 88ms.

  {{< img-center "images/vr/compatibility-specifications/latency_histogramm.png" 600x "Glass-to-glass latency histogram (no VR)" >}}

</details>