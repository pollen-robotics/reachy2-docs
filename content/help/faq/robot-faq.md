---
title : "Robot"
description: "Robot FAQ"
lead: "Frequently asked questions on the robot"
date: 2023-07-26T08:44:51+02:00
lastmod: 2023-07-26T08:44:51+02:00
draft: false
images: []
type: docs
menu:
  help:
    parent: "FAQ"
toc: true
weight: 200
---
## WiFi

On your first connection to a network, the simpliest is to connect your robot with an ethernet cable.  

If you cannot do this:

Use the appropriate cable and connect your computer directly to Reachy 2's computer. The cable has to be plugged in port (b) of Reachy 2's hardware interface.  

{{< img-center "images/docs/getting-started/serial-connection.png" 400x "Serial connection port" >}}

We use `tio`for the serial connection. If you haven't installed it yet on your computer:
`apt install tio`

{{< alert icon="👉" text="Make sure <i>dialout</i> is in your groups, otherwise add it to your groups. To check it: <br> <code>>>> groups</code> <br>If it doesn't appear in the list, add it with: <br><code>>>> sudo usermod -aG dialout $USER</code> <br>Then reboot your computer for the new group to be effective." >}}

Then, in a terminal on your computer, get access to the robot with:

```python
tio /dev/ttyUSB0
```

> Note that the connection could be on another USB port. Check all ports with `ls /dev/ttyUSB*`

{{< img-center "images/docs/getting-started/tio-terminal.png" 400x "tio connection terminal" >}}

{{< alert icon="👉" text="Login: <b>bedrock</b> <br>Password: <b>root</b>" >}}


Manually connect the robot to a WiFi with:
```bash
nmcli device wifi connect <wifi.name> password <your.password>
```

> For example, with the wifi *POLLEN-WIFI*, with password *superstrongpassword*:  
> `nmcli device wifi connect POLLEN-WIFI password superstrongpassword`

There are several ways to connect to your robot.

## SSH connection
Using the robot's IP address (check Find Reachy 2's IP if you don't know it), you can directly connect via ssh to Reachy 2's computer:

```python
ssh bedrock@<Reachy.2.IP.address>
```

> For example, with robot's IP being 192.168.1.42:
> ```python
> ssh bedrock@192.168.1.42
> ```

{{< alert icon="👉" text="<b>Password: root</b>" >}}

## Hard-wired connection

Use the appropriate cable and connect your computer directly to Reachy 2's computer. The cable has to be plugged in port (b) of Reachy 2's hardware interface.  

{{< img-center "images/docs/advanced/serial-connection.png" 500x "Serial connection port" >}}

We use `tio`for the serial connection. If you haven't installed it yet on your computer:
`apt install tio`

{{< alert icon="👉" text="Make sure <i>dialout</i> is in your groups, otherwise add it to your groups. To check it: <br> <code>>>> groups</code> <br>If it doesn't appear in the list, add it with: <br><code>>>> sudo usermod -aG dialout $USER</code> <br>Then reboot your computer for the new group to be effective." >}}

Once connected, open a terminal on your computer and run:
```python
tio /dev/ttyUSB0
```
*Note that depending on the elements you connected to the robot, the port could be something else than ttyUSB0. Check other available serial ports with `ls /dev/ttyUSB*`*

{{< img-center "images/docs/advanced/tio-terminal.png" 500x "Tio connection port" >}}

{{< alert icon="👉" text="Login: <b>bedrock</b> <br>Password: <b>root</b>" >}}

You are then connected to Reachy 2 computer!

## Avahi connection

Find the serial number of your robot on its back, connect your computer on the same network as your robot, open a terminal and type:
```bash
ping <robot.serial.number>.local
```

>For example, if the serial number is reachy2-beta1:
>```bash
>ping reachy2-beta1.local
>```



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
