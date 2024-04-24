---
title: "Calibrate teleop cameras"
description: "How to calibrate the stereovision for the teleop cameras"
lead: "How to calibrate stereovision on the teleop cameras"
date: 2023-08-09T14:43:31+02:00
lastmod: 2023-08-09T14:43:31+02:00
draft: false
images: []
toc: true
weight: "100"
---

{{< alert icon="👉" text="This calibration is for <b>stereovision</b> only. It will only work if the images are clear.</br></br>If you want to modify the focus of the cameras because the images are blurred, this requires a hardware intervention on the lenses, which is not covered by the following explanations." >}}

## Repositories installation

The calibration process relies in 2 Pollen Robotics repositories.  
The simpliest way is to clone both of these repositories on your computer:  

- Pollen's `multical` fork. [**Clone the repo**](https://github.com/pollen-robotics/multical), then:
```bash
cd multical
pip install -e .
```

- `pollen-vision` repo. [**Clone the repo**](https://github.com/pollen-robotics/pollen-vision/tree/develop), then:
```bash
cd pollen-vision
pip install -e .[depthai_wrapper]
```

> We recommand to use virtual environments.

## 1. Charuco calibration board



Go to `pollen-vision/pollen_vision/pollen_vision/camera_wrappers/depthai/calibration`.  

If you don't have one, generate a charuco board with the following command:

```console
$ python3 generate_board.py
```

Print it on a A4 paper and place it on a flat surface (we use a wooden board).

> You should have received a calibration board with the robot, with the relevant information written behind.  

Mesure as accurately as possible the size of the squares and the size of the markers and edit the `example_boards/pollen_charuco.yaml` file in the previously cloned `multical` repo to report the values you measured (must be in meters).

## 2. Get some images

Connect the teleop cameras to your computer. You simply have to disconnect the *teleop cameras* USB connector from the robot's computer and plug it to your computer instead.  

If it is your first calibration, you must add the udev rules with:
```bash
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | sudo tee /etc/udev/rules.d/80-movidius.rules
sudo udevadm control --reload-rules && sudo udevadm trigger
```

Then, still in `pollen-vision/pollen_vision/pollen_vision/camera_wrappers/depthai/calibration`, run: 
```console
$ python3 acquire.py --config CONFIG_IMX296
```

Press `return` to save a pair of images in `./calib_images/` (by default, use `--imagesPath` to change this).

Try to cover a maximum of the field of view, with the board in a variety of orientations. If the coverage is good, about 30 images is sufficient.
Also, make sure that most of the board is visible by all the cameras for all the saved images pairs.

Below is an example of good coverage:
{{< img-center "images/docs/advanced/mosaic.png" 500x "Good coverage images" >}}

## 3. Run multical 

```console
$ cd <...>/multical
$ multical calibrate --image_path <absolute_path_to_calib_images_dir> --boards example_boards/pollen_charuco.yaml --isFisheye True
```

(For some reason, --image_path must be an absolute path, relative paths don't work)

It will write a `calibration.json` file in `<path_to_calib_images_dir>`.

## 4. Flash the calibration to the EEPROM

Back in `pollen-vision/pollen_vision/pollen_vision/camera_wrappers/depthai/calibration`.

Run:
```console
$ python3 flash.py --config CONFIG_IMX296 --calib_json_file <path to calibration.json>
```

A backup file with the current calibration settings stored on the device will be produced in case you need to revert back. 

If needed, run:
```console
$ python3 restore_calibration_backup.py --calib_file CALIBRATION_BACKUP_<...>.json  
```

## 5. Check the calibration

Run:
```console
$ python3 check_epilines.py --config CONFIG_IMX296
```
And show the aruco board to the cameras.

An `AVG SLOPE SCORE` below `0.1%` is OK.

Ideally it could be under `0.05%`.

The lower, the better.
