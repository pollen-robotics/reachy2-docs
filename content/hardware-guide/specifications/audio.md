---
title: "Audio specifications"
description: "Audio system specifications of Reachy 2"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  hardware-guide:
    parent: "Specifications"
weight: 120
toc: true
---

The audio system is made of : 

- **Microphones**: Two microphones fitted in Reachy 2’s antennas ⇒ [Lavalier Go](https://rode.com/fr/microphones/lavalier-wearable/lavalier-go?variant_sku=LAVGO)
    
  {{< img-center "images/hardware-guide/specifications/audio/microphone.png" 300x "Microphone" >}}
    
- **Speakers**: Home made speakers solution based on off-the shelf speakers and off-the-shelf audio amplifier board (just below the Pollen logo in Reachy’s “abdominal cavity”)

  {{< img-center "images/hardware-guide/specifications/audio/torso_speaker.png" 500x "Speaker" >}}

- **Audio interface**: Rode AI-Micro dual channel audio interface ⇒ [Rode AI-micro](https://rode.com/fr/interfaces-and-mixers/ai-series/ai-micro)

  {{< img-center "images/hardware-guide/specifications/audio/rode_image.png" 400x "Rode audio interface" >}}


It has been designed for two main use cases: 

- **Teleoperation**:
    - Robot ⇒ Operator - Hear what’s going on around the robot with spatialised audio for an immersive experience
    - Operator ⇒ Environment / Person - Communicate with the robot’s direct environment  

</br>

- **Artificial Intelligence**:
    - Speech to text (STT): Reachy can translate voice into text
    - Text to Speech (TTS): Reachy translates text into a human-like voice
    - Different use cases are possible:
        - Voice command (e.g. voice ⇒ text ⇒ code ⇒ action)
        - Conversational robot (e.g. voice ⇒ text ⇒ voice)  
