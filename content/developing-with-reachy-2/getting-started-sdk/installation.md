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

The Python SDK is a pure Python library. The installation should thus be rather straightforward. It supports Python >= 3.10 (older versions will not work because of typing syntax). 

> For now, the library [pollen_vision](pollen-robotics/pollen-vision) used to do ["perception"]({{< ref "ai-with-reachy-2/perception/" >}}), needs Python 3.10, so you may want to have that version. 

It works on Windows/Mac/Linux.

<details>
<summary>On Linux</summary>

We recommend to use [virtual environment](https://docs.python.org/3/tutorial/venv.html) for your development. They make the installation simple and avoid compatibility issues. They also come with their [pip](https://pip.pypa.io/en/stable/) command.

Inside your virtual environment, you can install the library either from Pypi, or by cloning all the repository : 

### From PyPi

```bash
pip install reachy2-sdk
```

### From the source

```bash
git clone https://github.com/pollen-robotics/reachy2-sdk.git
cd reachy2-sdk
pip install -e reachy2-sdk
```

</details>

<details>
<summary>On Windows</summary>

We recommend you to use a virtual environment, that will allow you to have all the needed packages to control Reachy without any conflict with already existing packages on your computer. 

### Create the virtual environment :

1. You can use Miniconda, which is a minimal version of the Anaconda Python distribution. You need to download it [there](https://www.anaconda.com/download/success) : scroll down until you reach the Miniconda Installers and click on the Windows installer. 

    {{< img "images/sdk/getting-started/conda_install.png" 300x "miniconda">}}
    
2. Launch the .exe you just downloaded and follow the installation procedure. 
    
    {{< img "images/sdk/getting-started/conda_install_2.png" 300x "miniconda installer">}}
    
3. Open the Anaconda Powershell Prompt on your applications and type `conda create -n <env_name> python=3.10 git`, for example `conda create -n reachy python=3.10 git` (to install the supported version of Python and Git with your new environment)
    
    {{< img "images/sdk/getting-started/create_env.png" 300x "create venv">}}
    
4. Then activate your virtual environment : `conda activate <env_name>`
    
    {{< img "images/sdk/getting_started/activate_env.png" 300x "activate venv">}}
    

### Install the SDK Client :

Inside your virtual environment, you can install the library either from Pypi, or by cloning all the repository : 

#### From Pypi 
```bash
pip install reachy2-sdk
```

#### From source  
1. Create a folder (for example “Dev”) 
    > `mkdir Dev`
2. Go in this folder
    >  `cd \Dev\`
3. Clone the SDK repository in this folder
    > `git clone https://github.com/pollen-robotics/reachy2-sdk.git`
4. Go in this new subfolder
    > `cd \reachy2-sdk\`
5. Install the library 
    > `pip install -e` . *that command will install all the needed packages and libraries to make the SDK work on your virtual environment*



</details>

<details>
<summary>On Mac</summary>

To be done. 

</details>

To be sure it worked, you can write `pip list` and check that you have reachy2-sdk.  


## Dependencies

The SDK relies on a few third-party Python packages, such as:

* [numpy](https://numpy.org) - mostly for trajectory computation
* [opencv](https://opencv.org) - for camera frame access
* [grpc](https://grpc.io) - to connect to the robot

They will be **installed automatically** when you install the SDK.



{{< warning icon="👉🏾" text="Now that you have reachy2-sdk installed on your computer, you can connect to your robot and learn how to use it with the Getting Started Notebooks. So keep up !" >}}