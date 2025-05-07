---
title: "Reachy's Awakening"
description: ""
lead: "Your first tracking with head using arm kinematics"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "Advanced tutorials"
weight: 300
toc: true
seo:
  title: "Tutorial: Make Reachy 2 Wake Up – Synchronize Head and Arm Movements"
  description: "Learn how to program Reachy 2 to perform a wake-up sequence with synchronized head and arm motions. Follow this beginner-friendly tutorial using the ReachySDK to animate your robot."
---
<br>

## Introduction 


Now, you’ve learned the **basics behaviours** available with reachy2_sdk. But how to use them to **build your own program** may still seem a little abstract. 

That's why we've created a series of **practical tutorials** to guide you step-by-step through the process of thinking about and building different programs that will help you understand the mechanics involved in creating **your own behaviour**! 

For the moment, there are **three tutorials** available, ranging from the simplest to the most complex, to help you get to grips with different Reachy functions. 

The first two use only the **SDK Client**, and the last one adds object detection with AI model from **pollen-vision.** 

You will find the GitHub repository just [there](https://github.com/pollen-robotics/reachy2-tutorials), and to make the third tutorial with pollen-vision, you need to install the library on your virtual environment : 

```python 
pip install --user --no-warn-script-location "pollen-vision[vision] @ git+https://github.com/pollen-robotics/pollen-vision.git@develop"
pip install depthai
```

Now that you're all set up, have fun ! 

## Reachy's Awakening 

In [this tutorial](https://github.com/pollen-robotics/reachy2-tutorials/blob/main/1_Reachy_awakening.ipynb), we will make Reachy do the awake sequence, which is a series of movements that makes it look like it is waking up. It involves moving its head and arms and can be used as a starting point for more complex sequences.

What you will learn:

- How to make it move its **head**
- How to make it move its **arms**
- How to **synchronize** head and arms movements

{{< img-center "/gifs/tutorials/gif_awake.gif" 400x "Gif awake" >}}