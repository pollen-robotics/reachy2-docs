---
title: "Reachy the Greengrocer"
description: ""
lead: "Use pollen_vision to plug an vision model with the SDK for fruit detection and manipulation"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "Advanced tutorials"
weight: 320
toc: true
seo:
  title: "Tutorial: Teach Reachy 2 to Sort Fruits with Object Detection"
  description: "Learn how to program Reachy 2 to sort fruits using object detection. This tutorial guides you through the process of detecting fruits, switching frames, and making Reachy move based on its visual input."
---

<br>


In this [tutorial](https://github.com/pollen-robotics/reachy2-tutorials/blob/main/notebooks/3_Reachy_the_greengrocer.ipynb), we will ask Reachy to sort fruits on a table and to drop them in user-defined places, according to which fruit it is.

What you will learn :

- How to do object detection
- How to switch from the image frame to the robot frame
- How to make Reachy move according to what it sees

{{< img-center "/gifs/tutorials/gif_oranges.gif" 400x "Gif greengrocer" >}}