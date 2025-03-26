---
title: "8. Play and record sounds"
description: "Use the audio API of the Python SDK"
lead: "Make some noise - Use the audio API"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "SDK basics"
weight: 270
toc: true
---
<br>

> You can choose to follow our online documentation or to make your Reachy move by following the [notebook n°7](https://github.com/pollen-robotics/reachy2-sdk/blob/develop/src/examples/7_audio.ipynb). 

## Audio presentation

Reachy 2 is equipped with:
- 🎤 **Two microphones**, one in each antenna.
- 🔈 **One speaker**, located in the torso.

The Audio API allows you to:
- Upload and manage sound files.
- Play and stop audio.
- Record using the microphones.

> ⚠️ **Note:** Audio files are stored in a **temporary folder** on Reachy’s internal computer and are **deleted at each reboot**. There’s no persistent storage yet. The file management is very basic, allowing just a list of files in a single folder..

---

## File Management

Before doing anything with audio, make sure you’re connected to Reachy as usual:
```python
from reachy2_sdk import ReachySDK

reachy = ReachySDK(host='your-reachy-ip')  # Replace with your robot’s IP
```

---

### List available audio files

Let’s start by listing the available audio files on the robot:
```python
reachy.audio.get_audio_files()
```

If you’ve just started working with Reachy, this list might be empty.

---

### Upload an audio file

Reachy supports **`.wav`**, **`.mp3`**, and **`.ogg`** files. To upload a sound from your computer:

```python
reachy.audio.upload_audio_file('/path/to/sample-1.ogg')
reachy.audio.upload_audio_file('/path/to/sample-2.wav')
```

After uploading, you should see them listed:

```python
reachy.audio.get_audio_files()
```

---

### Remove an audio file

Don’t need a sound anymore? You can delete it like this:
```python
reachy.audio.remove_audio_file('sample-2.wav')
reachy.audio.get_audio_files()
```

This will remove it from Reachy’s internal audio folder.

---

## Playing audio on Reachy

### Play an uploaded file

Once your file is uploaded, you can play it through Reachy’s speaker:
```python
reachy.audio.play_audio_file('sample-1.ogg')
```

---

### Stop playback

If you need to stop the audio mid-play:
```python
reachy.audio.stop_playing()
```

This will immediately cut off the sound.

---

## Recording audio with Reachy’s microphones

Recording is just as simple! You can have Reachy record from its stereo microphones.

> ⚠️ Note: For now, **only `.ogg` format is supported when recording**.

### Record audio
To start a 5-second clip recording in the background:
```python
reachy.audio.record_audio('tutorial.ogg', duration_secs=5)
```

**The duration of the recording, in seconds, must be set**.  
The file will be stored on Reachy.  

You can stop a recording early:
```python
reachy.audio.stop_recording()
```

---

### Access or play back the recorded audio

Once recorded, the file is available in the same temporary audio folder:
```python
reachy.audio.get_audio_files()
reachy.audio.play_audio_file('tutorial.ogg')
```

---

### Download the recording to your computer

If you want to save your recording:
```python
reachy.audio.download_audio_file('tutorial.ogg', '/your/local/path/tutorial.ogg')
```

This copies the file from Reachy’s system to your local machine, at the given path.  

---

You can now chain audio playback with gestures or head motions for expressive sequences!