---
title: "Services"
description: "Dashboard page to control Reachy's services."
lead: "The services tab is dedicated to the services setup for Reachy 2"
date: 2023-07-25T15:46:23+02:00
lastmod: 2023-07-25T15:46:23+02:00
draft: false
images: []
type: docs
toc: true
weight: "10"
---

Working with services has the advantage of having the code running automatically at boot, whithout needing to connect to the robot and start it yourself. However using the services can make debugging the robot more difficult because the code running for Reachy is "hidden", that is why we made this page.

This page is mainly useful to restart the service in order to [recover from a problem]({{< ref "/help/help/recovering" >}}).

## Content

In this page, one card is created for each robot's service. It looks like the following:  

{{< img-center "images/dashboard/content/services.png" 500x "Services page" >}}

The available services are:
- **reachy2-core**: manages the motors and the server for the Python SDK
- **webrtc**: manages the server for teleoperation. *Requires reachy2-core*
- **plum**: manages the updates service
- **display**: manages the visualization tool
- **reachy2-dashboard**: manages the dashboard

## Actions on services

For each service, three buttons are available:
{{< img-center "images/dashboard/content/service.png" 150x "Service card" >}}

* **Restart**: restarts the service,
* **Stop**: stops the service,
* **Show logs**: displays the logs of the service *(only display the service status at the moment)*

> Restarting reachy2-dashboard will made your dashboard unavailable for a few seconds.
<!-- For more information on how to handle the Reachy's services and what they are used for, check the [services page]({{< ref "/advanced/services/available" >}}). -->