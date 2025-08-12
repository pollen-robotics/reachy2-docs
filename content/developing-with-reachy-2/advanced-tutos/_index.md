---
title: "Advanced tutorials"
description: "Practice the use of the SDK with advanced tutorials"
lead: ""
date: 2023-07-25T15:34:02+02:00
lastmod: 2023-07-25T15:34:02+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
weight: 30
---



Now, you’ve learned the **basics behaviours** available with reachy2_sdk. But how to use them to **build your own program** may still seem a little abstract. 

That's why we've created a series of **practical tutorials** to guide you step-by-step through the process of thinking about and building different programs that will help you understand the mechanics involved in creating **your own behaviour**! 

For the moment, there are **three tutorials** available, ranging from the simplest to the most complex, to help you get to grips with different Reachy functions. 

The first two use only the **SDK Client**, and the last one adds object detection with AI model from **pollen-vision.** 

You will find the GitHub repository just [there](https://github.com/pollen-robotics/reachy2-tutorials), and to make the third tutorial with pollen-vision, you need to install the library on your virtual environment : 

```python 
pip install --user --no-warn-script-location "pollen-vision[vision] @ git+https://github.com/pollen-robotics/pollen-vision.git@2.0.1"
pip install depthai
```

Now that you're all set up, have fun ! 

