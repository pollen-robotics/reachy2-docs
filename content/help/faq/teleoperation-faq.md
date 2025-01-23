---
title : "Teleoperation issues"
description: "VR teleoperation application FAQ"
lead: "Frequently asked questions on VR teleoperation application"
date: 2023-07-26T08:44:51+02:00
lastmod: 2023-07-26T08:44:51+02:00
draft: false
images: []
type: docs
menu:
  help:
    parent: "FAQ"
toc: true
weight: 230
---

## Problems with the app

> *The app is lagging a lot, what can I do ?*

Check that your computer is plugged (note that for some laptops, they must be plugged in as soon as they are switched on). 

If that doesn’t resolve the lag, maybe your network is overloaded, you can try change your robot’s and your computer’s network (you don’t need to have internet for it to work, it can work on a isolated router). Check that there is no driver update available on your VR device (for Oculus Quest, you can see them on top of your MetaQuestLink app on your computer, if your device is plugged). 

Finally, it can be a GPU issue : FAQ GPU. 


> *When I hit “play”, I have a loading page in my device and I never enter the app* 

Go to Edition > Project Settings > XR Plug-in Management. Check that Initialize XR on Start-Up and Oculus are selected. If so, try to unselect the first one and try again.

> *Tunnelling appears only in one eye* 

Go to Edition > Project Settings > XR Plug-in Management > Oculus > Stereo rendering mode : select multi pass and try again. 



## Problem with the cameras or sound

### With teleoperation application

Check in your laptop settings that your device is selected in “Output”. Check also that you don’t have an audio device connected by Bluetooth that can interfere. 

During teleoperation, the cameras and sound are managed by the webrtc service.  
This service is automatically launched when you start Reachy 2 computer. 

> If you have switched between the Python SDK and the teleoperation application without robot rebooting, first make sure:
>- that any running client to the sdk has been disconnected
>- that the speaker has been plugged back
>- that the webrtc services has been restarted

Check all logs of the service with:

```bash
journalctl -b -u webrtc
```


