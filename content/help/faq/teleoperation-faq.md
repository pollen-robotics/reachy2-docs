---
title : "Teleoperation"
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
weight: 20
---

## Problem with the motors

The motors are managed by the reachy2-core service.  
Check all logs of the service with:

```bash
journalctl -b -u reachy2-core
```

## Problem with the cameras or sound

### With teleoperation application

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

### With the Python SDK

If you are using the cameras with the Python SDK, the cameras are then managed by the reachy2-core service.  

> First make sure you have enabled correctly the [cameras for the SDK]({{< ref "sdk/first-moves/cameras#enable-teleop-cameras-for-the-sdk">}})  

Check all logs of the service with:

```bash
journalctl -b -u reachy2-core
```
