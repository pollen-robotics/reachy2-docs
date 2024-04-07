---
title : "Update Reachy 2 software"
description: "Update Reachy"
lead: "Get latest version of Reachy software"
date: 2023-07-25T15:15:22+02:00
lastmod: 2023-07-25T15:15:22+02:00
draft: false
images: []
toc: true
---

## Use the dashboard

The update of the robot can be entirely done with the dashboard.  

From the **Updates** tab, check if updates are available:

{{< img-center "images/docs/update/dashboard-update-page.png" 600x "" >}}

> Only advanced update management is working so far

## Advanced update management

From the dashboard Update page, click on **Advanced udpate management**:

{{< img-center "images/docs/update/update.png" 600x "PLUM update" >}}

> You can directly access the advanced update dashboard from **`http://<IP.address>:5000/`** 

### Fetch updates

Click **Fetch Updates** to check if there is any available update on one of the robot's services.  
Once this is done, you can browse between the 5 services to see if a more recent version is available.  

> For example, an update is available for reachy2-dashboard here:
{{< img-center "images/docs/update/update-available.png" 600x "PLUM update" >}}

### Install update

Select the version you want to download for the upgrade, and click on **Pull Container**.  
Wait for the message "*service.name* Pulled" to appear in the window.  

{{< img-center "images/docs/update/pull-container.png" 600x "PLUM update" >}}

When this is done, click on **Generate**.  
Wait for the confirmation message to appear.

{{< img-center "images/docs/update/generate.png" 600x "PLUM Update" >}}

### Activate the update

Finish the update installation by clicking on:
1. **Enable**, to activate by default the updated service
2. **Stop**, to stop the current outdated service running
3. **Start**, to launch the updated service