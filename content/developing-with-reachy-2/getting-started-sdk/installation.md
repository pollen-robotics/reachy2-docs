---
title: "Installation"
description: "Install the Python SDK for Reachy 2"
lead: "Install the Python SDK for Reachy 2"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "Getting started with the SDK"
weight: 100
toc: true
---


## How to install the Python SDK

The Python SDK is a pure Python library. The installation should thus be rather straightforward.  

It supports Python >= 3.10 (older versions will not work because of typing syntax). It works on Windows/Mac/Linux.

We recommend to use [virtual environment](https://docs.python.org/3/tutorial/venv.html) for your development. They make the installation simple and avoid compatibility issues. They also come with their [pip](https://pip.pypa.io/en/stable/) command.

### From PyPi

```bash
pip install reachy2-sdk
```

### From the source

```bash
git clone https://github.com/pollen-robotics/reachy2-sdk
cd reachy2-sdk
pip install -e reachy2-sdk
```

## Dependencies

The SDK relies on a few third-party Python packages, such as:

* [numpy](https://numpy.org) - mostly for trajectory computation
* [opencv](https://opencv.org) - for camera frame access
* [grpc](https://grpc.io) - to connect to the robot

They will be **installed automatically** when you install the SDK.
