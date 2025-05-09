---
title: "Visualize with Fake Robot"
description: "Use a fake robot mode to test your moves before using the real robot"
lead: "Use a fake robot mode to test your moves before using the real robot"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "Getting started with the SDK"
weight: 120
toc: true
seo:
  title: "How to Use Fake Mode on Reachy 2 for Safe Movement Testing"
  description: "Learn how to enable and use fake mode on Reachy 2 to safely test robot movements in simulation before applying them on the physical robot. Step-by-step instructions for setup and visualization."
---

Reachy currently does not have any collision avoidance restrictions (e.g., left arm against right arm, arm against torso).

To ensure safe and effective behavior on your Reachy, we recommend testing your movements in a **fake mode** before implementing them on the physical robot. In this mode, the physical robot will not move, but the simulated version will. This allows you to visualize Reachy's actions and adapt them as needed before testing on the real robot.

## Steps to Use Fake Mode

1. **Enable Fake Mode**:

   The easiest way to enable fake mode is through graphical tools. This feature is currently available in Plum (a tool users can access but is primarily used internally). Enabling fake mode via the Dashboard itself is not yet supported.

   For advanced users working in development mode and launching the stack manually, you can enable fake mode by adding `fake:=true` when starting the stack. For example:

   ```bash
   ros2 launch reachy_bringup reachy.launch.py start_sdk_server:=true start_rviz:=true fake:=true
   ```

2. **Launch Visualization Tools**:

   Access the dashboard and click on **Visualization Tools**. This will open RViz, where you can see a fake Reachy in action.

## Next Steps

Now that you have tested your movements in fake mode, you are ready to make your robot move! Proceed to the [Basics]({{< ref "basics" >}}) section to start implementing behaviors on your physical Reachy.
