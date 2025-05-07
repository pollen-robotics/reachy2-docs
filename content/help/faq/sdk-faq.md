---
title : "Python SDK"
description: "Python SDK FAQ"
lead: "Frequently asked questions on the Python SDK for Reachy 2"
date: 2023-07-26T08:44:51+02:00
lastmod: 2023-07-26T08:44:51+02:00
draft: false
images: []
type: docs
menu:
  help:
    parent: "FAQ"
toc: true
weight: 210
seo:
  title: "Reachy 2 Python SDK FAQ"
  description: "Frequently asked questions on the Python SDK for Reachy 2. Learn how to connect to the robot, troubleshoot issues, and more."
---

<details>
<summary>I execute a command in the SDK but nothing happens on my robot
</summary>

Check that you are not on a fake mode (mode that only makes the virtual robot moves in the visualisation tools of the dashboard but not the real one) : for that, you can type `reachy.info` and check the mode is not 'FAKE'. If so, the simplest way to undo it is to reboot entirely your robot. 

Check on the dashboard services that everything is fine, especially in the reachy2-core logs. If you see errors, restart the core.

</details>