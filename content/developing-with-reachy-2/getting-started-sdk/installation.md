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

## How to Install the Python SDK

The Python SDK is a pure Python library. The installation should thus be rather straightforward. It supports Python >= 3.10 (older versions will not work because of typing syntax). 

> For now, the library [pollen_vision](pollen-robotics/pollen-vision) used to do ["perception"]({{< ref "ai-with-reachy-2/perception/" >}}), needs Python 3.10, so you may want to have that version. 

It works on Windows/Mac/Linux.

<details>
<summary>On Linux</summary>

We recommend using [virtual environments](https://docs.python.org/3/tutorial/venv.html) for your development. They make the installation simple and avoid compatibility issues. They also come with their [pip](https://pip.pypa.io/en/stable/) command.

Inside your virtual environment, you can install the library either from PyPI or by cloning the repository:

### From PyPI

```bash
pip install reachy2-sdk
```

### From the Source

```bash
git clone https://github.com/pollen-robotics/reachy2-sdk.git
cd reachy2-sdk
pip install -e reachy2-sdk
```

</details>

<details>
<summary>On Windows</summary>

We recommend using a virtual environment, which allows you to install all the needed packages to control Reachy without conflicts with existing packages on your computer.

### Create the Virtual Environment:

1. Use Miniconda, a minimal version of the Anaconda Python distribution. Download it [here](https://www.anaconda.com/download/success): scroll down to the Miniconda Installers section and click on the Windows installer.  

    {{< img "images/sdk/getting-started/conda_install.png" 500x "miniconda">}}

2. Launch the `.exe` you just downloaded and follow the installation procedure.  

    {{< img "images/sdk/getting-started/conda_install_2.png" 500x "miniconda installer">}}

3. Open the Anaconda Powershell Prompt from your applications and type:  
    ```bash
    conda create -n <env_name> python=3.10 git
    ```
    For example:  
    ```bash
    conda create -n reachy python=3.10 git
    ```

    {{< img "images/sdk/getting-started/create_env.png" 800x "create venv">}}

4. Activate your virtual environment:
    ```bash
    conda activate <env_name>
    ```

    {{< img "images/sdk/getting-started/activate_env.png" 800x "activate venv">}}

    
### Install the SDK Client:

Inside your virtual environment, you can install the library either from PyPI or by cloning the repository:

#### From PyPI
```bash
pip install reachy2-sdk
```

#### From Source

1. Create a folder (e.g., “Dev”):
    ```bash
    mkdir Dev
    ```
2. Navigate into this folder:
    ```bash
    cd \Dev\
    ```
3. Clone the SDK repository:
    ```bash
    git clone https://github.com/pollen-robotics/reachy2-sdk.git
    ```
4. Navigate into the subfolder:
    ```bash
    cd \reachy2-sdk\
    ```
5. Install the library:
    ```bash
    pip install -e .
    ```
    This command installs all the needed packages and libraries for the SDK to work in your virtual environment.

</details>

<details>
<summary>On Mac</summary>

To be done.

</details>

To ensure it worked, you can run:
```bash
pip list
```
and check that `reachy2-sdk` is listed.

## Dependencies

The SDK relies on a few third-party Python packages, such as:

* [numpy](https://numpy.org) - mostly for trajectory computation
* [opencv](https://opencv.org) - for camera frame access
* [grpc](https://grpc.io) - to connect to the robot

These will be **installed automatically** when you install the SDK.

<br>

---

**✅ Now that you have `reachy2-sdk` installed on your computer,**  
you’re all set to **connect to your robot** and start exploring with the **Getting Started Notebooks**.

So keep up—**Reachy is waiting!** 🚀📓