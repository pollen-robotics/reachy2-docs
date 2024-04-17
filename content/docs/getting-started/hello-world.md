---
title: "Hello World"
description: "First robot use."
lead: "Is everything working fine?"
date: 2023-08-09T14:44:11+02:00
lastmod: 2023-08-09T14:44:11+02:00
draft: false
images: []
toc: true
weight: "60"
---
## 1. Check services are running

All elements of the robots should have started automatically.  
Check this is the case on [the dashboard]({{< ref "/docs/getting-started/dashboard" >}})

2 services must be launched:
- **reachy2-core**
- **reachy2-webrtc**

Click on **Logs** for both services to check they have correctly started.  
You should see content appearing under the services tab:

{{< img-center "images/docs/getting-started/dashboard-services.png" 600x "services" >}}

> If you see any error, click on **Restart** to restart them.

## 2. Try sending commands

(Temporary checkup)  

To check everything is working fine, you can use the examples of the Python SDK.

### Clone reachy2-sdk

Clone reachy2-sdk repository from Github on your computer.  

### Try the jupyter notebook examples

Then go to `reachy2-sdk/src/examples/`, and try the two first jupyter notebooks:
- 1_getting_started
- 2_moves_introduction

Check you manage to connect, to get data from the robot and to make it move.

> We do not test the cameras from the Python SDK so far, because they can be accessed only by one service at the same time, and the webrtc service is already running by default.

<!-- Try to send commands through the Reachy Control page!  

On the dashboard, open Reachy Control tab.

<p align="center">
  <img src="control.png" alt="control" width="100%"/>
</p>

In **Reachy section**, click on **Turn ON**. Check the robot is now stiff, which means you cannot move the arms or head anymore manually.  


Then try to send commands to the arms. 
{{< alert icon="👉" text="Make sure there is no obstacle, such as a table, in front of the robot, and nobody is close to the robot before sending commands." >}}

For example, try to put the `r_elbow_pitch` at -90, and click **GoTo**. -->
