---
title: "Simulation installation"
description: "How to install a simulation of Reachy 2"
lead: ""
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  developing-with-reachy-2:
    parent: "Simulation"
weight: 31
toc: true
seo:
  title: "How to Run Reachy 2 Simulation with Docker: Step-by-Step Setup Guide"
  description: "Learn how to set up and run the Reachy 2 simulation using a preconfigured Docker image. Follow detailed steps for Windows, macOS, or Linux to prototype and test robot behaviors without hardware."
---

To set up the simulation, you will need to use the [ready-to-use image from Docker Hub](https://hub.docker.com/r/pollenrobotics/reachy2).  

Both the **Gazebo and MuJoCo simulation**s rely on the **same image** — you just need to choose which one to use when launching the container.


## 1. Install Docker 
Download [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your OS and follow the install instructions.  

{{< img-center "images/sdk/simulation/docker-website.png" 600x "Install Docker Desktop" >}}
  
You don't need to be logged in, as the image is open.

#### Additional platform-specific instructions
<details>
<summary>MacOS (Apple Silicon)</summary>

**Apple Silicon (M1/M2)**  
For Apple Silicon Macs, Docker uses Rosetta to run x86_64 images.  
Follow these steps after installing Docker Desktop:
1. **Install Rosetta:** Run the following command to install Rosetta: 
```bash
softwareupdate --install-rosetta
```
2. **Enable Rosetta in Docker:**
- Go to `Docker settings` > `General`
- Check `Use Virtualization Framework`
- Check `Use Rosetta for x86/amd64 emulation on Apple Silicon`
- Click `Apply & Restart`  

If the Rosetta integration option is not available, update your macOS version (it should be available from macOS Sonoma (v14)).

3. **Check Emulation:** To verify that emulation is working, run:
```bash
docker run --rm --platform linux/amd64 busybox uname -m
```

This should output `x86_64` if emulation is working.
</details>

## 2. Run the Robot Simulation

<details>
<summary><b>Option 1: Via Docker Desktop (GUI)</b></summary>

1. From Docker Desktop, search for **reachy2** image in the search bar (you don't need to sign in):
{{< img-center "images/sdk/simulation/search-for-reachy2.png" 600x "Search for reachy2 image" >}}

2. Click **Pull** and wait a few minutes for the image to be downloaded:
{{< img-center "images/sdk/simulation/pull-button.png" 600x "Pull reachy2 image" >}}

3. When the download is over, click **Run** to launch a container of the image via the Docker Desktop GUI. This will open a configuration pop-up.
{{< img-center "images/sdk/simulation/run-button.png" 600x "Run reachy2 container" >}}

4. Make sure you expand the **Optional settings** to configure properly the ports, and configure the port as shown below:
{{< img-center "images/sdk/simulation/container-settings.png" 600x "Expand container settings" >}}
{{< img-center "images/sdk/simulation/settings-completed.png" 600x "Configure settings" >}}

5. Click **Run** to finally launch the container!
{{< img-center "images/sdk/simulation/final-run.png" 600x "Finally run the container" >}}

6. After a few seconds, you should have a running container displaying the following elements:
{{< img-center "images/sdk/simulation/run-success.png" 600x "Container is running" >}}

</details>

<details>
<summary><b>Option 2: Via Command Line Interface (CLI)</b></summary>

If you prefer using the terminal, you can run the following command:

```bash
docker run --rm --platform linux/amd64 -p 8888:8888 -p 6080:6080 -p 50051:50051 --name reachy2 docker.io/pollenrobotics/reachy2
```

This is a one-liner that launches the container with the required ports exposed.  


If using an Apple Silicon (aarch64) platform, add `--platform linux/amd64` to the command.

*Note:* you have a terminal accessible from Docker Desktop
{{< img-center "images/sdk/simulation/terminal-location.png" 600x "Terminal in Docker Desktop" >}}

You can simply enable it:
{{< img-center "images/sdk/simulation/enable-terminal.png" 600x "Enable terminal in Docker Desktop" >}}
and run the previous command:
{{< img-center "images/sdk/simulation/enter-cli.png" 600x "Run command line" >}}

</details>

### Running with Gazebo

To launch the simulation with Gazebo and additional configurations, you can add arguments to the CLI command like this:

```bash
docker run --rm --platform linux/amd64 -p 8888:8888 -p 6080:6080 -p 50051:50051 --name reachy2 docker.io/pollenrobotics/reachy2 start_rviz:=true start_sdk_server:=true fake:=true orbbec:=false gazebo:=true
```

### Running with MuJoCo

To launch the simulation with MuJoCo, modify arguments of the CLI command as follow:

```bash
docker run --rm --platform linux/amd64 -p 8888:8888 -p 6080:6080 -p 50051:50051 --name reachy2 docker.io/pollenrobotics/reachy2 start_rviz:=true start_sdk_server:=true fake:=true orbbec:=false mujoco:=true
```
{{< alert icon="⚠️" text="The mobile base is not handled yet in MuJoCo" >}}

## 3. Access the Displays
### Rviz / Gazebo / MuJoCo
To access the displays, open the following URL in your web browser: [localhost:6080/vnc.html?autoconnect=1&resize=remote⁠](http://localhost:6080/vnc.html?autoconnect=1&resize=remote⁠)

### Jupyter Notebook
To access the notebook interface, go to: [localhost:8888/tree](http://localhost:8888/tree⁠)⁠

> Those two links are available in the logs when the container is launched:
> {{< img-center "images/sdk/simulation/run-success-links.png" 600x "Displays links in the logs" >}}
> {{< img-center "images/sdk/simulation/displays-links.png" 600x "Displays links in the logs zoom" >}}

<br>

---

Don’t hesitate to check out the [**Python SDK section**]({{< ref "developing-with-reachy-2/sdk-introduction/discover-sdk/" >}}) to get started with programming the robot in simulation!