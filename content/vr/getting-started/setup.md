---
title: "Setup your teleop session"
description: ""
lead: "How to setup the parameters before starting teleoperation"
date: 2023-08-21T16:00:11+02:00
lastmod: 2023-08-21T16:00:11+02:00
type: docs
draft: false
images: []
toc: true
weight: "70"
---

## Audio and microphone setup

To have a better experience within the VR, configure the audio of your headset from your **headset settings**.  

You should be able to speak through the robot and hear from it when you are in the *transition room*.  
Check both audio input and output are on, and set them to a correct value.

> On the Meta Quest 2 headset, we use the following parameters:  
> - **audio input**: 100%  
> - **audio ouput**: 65%


## Motion sickness options

Once in the *transition room*, you have options you can configure to help you avoid motion sickness.  

On the left of the mirror, open the **Settings** tab, and configure the motion sickness options before starting teleoperating the robot.

{{< img-center "images/vr/getting-started/vr-settings.png" 600x "" >}}


### Reticle
Display a reticle to give a fixed point in the field of view. By default, the reticle only appears when the mobile base is moving.  

*Option:*
- **Always display reticle**: always display the reticle, even if the mobile base is not moving.

{{< img-center "images/vr/getting-started/reticle.png" 300x "" >}}


### Navigation effects

- **No effect**
- **Tunneling**: when moving the mobile base, a black tunneling will appear in your peripheral vision and reduce your field of view
- **Reduced screen**: when moving the mobile base, the size of the image will be reduced to let you see an artificial horizon behind it.

*Option:*
- **Activate effect on demande only**: during teleoperation, press one of the joysticks to activate/deactivate the occurence of the selected effect.  

    If used with *tunneling*, deactivate the effect will disable the tunneling when moving the mobile base, activate it will let it appear automatically.  

    If used with *reduced screen*, activate or deactivate the effect will let you manually reduce the size of the image.

|Tunneling effect|Reduced screen effect |
|----|--------------------|
|{{< img-center "images/vr/getting-started/tunneling.png" 300x "" >}}|{{< img-center "images/vr/getting-started/reduced-screen.png" 300x "" >}}
|