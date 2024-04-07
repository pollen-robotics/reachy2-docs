---
title: "Teleoperate Reachy"
description: "Start and stop Reachy teleoperation using the VR app"
lead: "How to use the VR teleoperation application"
date: 2023-07-26T09:01:49+02:00
lastmod: 2023-07-26T09:01:49+02:00
draft: false
images: []
type: docs
toc: true
---

{{< warning icon="👉🏾" text="Before starting teleoperating Reachy, please make sure you read the  <b><a href=\"https://docs.pollen-robotics.com/vr/use-teleop/best-practice/\">Best Practice</a></b>" >}}

## In brief

{{< alert icon="👉" text="The button names used below are for the Meta Quest headsets. Please refer to the Controllers Input page to get the corresponding names for your device." >}}

### Start teleoperating Reachy

1. Make sure the robot is turned on, connected to the network and that all the robot's services are running before launching the teleoperation application.

2. Select the robot you want to teleoperate (or create a new one), and click on "Connect".

3. Once in the mirror room, you can configure various settings. Take time to tune the motion sickness effects you want to use in the settings menu. When you are ready to start, press "Ready", then hold (A).

4. **Look straight ahead, with your body in the same orientation as your head while pressing A** to start the teleoperation. *The initial head position is used to determine the coordinate system giving your VR controllers position.* 

{{< alert icon="👉" text="<b>Warning:</b> you <b>must not move your body</b> anymore after this step. The position of your VR controllers to master the robot arms are calculated depending on the position you had while pressing A." >}}

{{< warning icon="🚨" text="<b>Important:</b> even if Reachy is bio-inspired, it cannot reproduce exactly all your movements. There are <b>positions that cannot be reached</b> by the robot. Please <b>avoid unusual movements</b> and do not persist in trying to reach a position if you see that the robot is stuck before it." >}}

5. (NEW) You first have the control of the head and the mobile base, but **not of the arms**. Take a few seconds to check the robot surroundings and go to an appropriate place before starting the full teleoperation. When the environment is safe, **press A** to get the full control. You can also go back to the mirror room pressing the related button with your laser beam.

6. Come back any time to mirror room by **holding A**. Teleoperation of the robot is automatically paused if the headset is removed.

{{< alert icon="👉" text="Please <b>stop teleoperation before removing your headset</b> (go back to mirror room or quit the app). If you do not, Reachy will continue following your controllers and headset orientation during a few seconds, and this can cause damages to the robot." >}}

### Stop teleoperation

1. Come back to the **mirror room** to pause the teleoperation by **holding A** at any time during teleoperation.  

2. Leave the app by clicking "**Quit**" icons in the mirror room and connection menu. 

The motors are automatically turned into compliant mode when quitting the mirror room. Please make sure the arms are close enough to the lowest position they can reach when coming back to the menu to avoid them falling or hitting something.  


## Step-by-step starting
1. Make sure that your VR equipement is up and running. Please refer to your device documentation.

2. Make sure the robot is turned on, connected to the network and that all the robot services are running. *By default, if you haven't modified anything, all services should be automatically launched on start of the **full/starter kit** robots.*

3. Launch the application *TeleoperateReachy.exe* file if you are using a VR device connected to a Windows computer. For Oculus Quest users, start the app from within the headset if you have installed the *.apk*.

4. Equip yourself with your headset, make sure you can see both controllers and that the scene around you is moving correctly in accordance with your head movements.

5. Choose the robot you want to connect to: you can select a robot with its IP address, or add a new one to the list of available robots.

{{< img "images/vr/use-teleop/choose-robot.png" 600x "Change robot to connect">}}
{{< img "images/vr/use-teleop/select-robot.png" 600x "Select robot to connect">}}

6. Press *Connect* to initiate the communication with the robot.

{{< img "images/vr/use-teleop/connect.png" 600x "Connect to a robot">}}

7. You should be now in the mirror room, and see yourself controlling a virtual reachy. The actual robot is not in control at that time but the live camera stream is displayed at the top right of the mirror. The info, help and settings menus are available here (they are documented in the next section). Please get familiar with the robot controls and features (emotion, grasping lock).

{{< img "images/vr/use-teleop/mirror.png" 600x "Mirror scene">}}

8. When you are ready, **face the mirror completely** and click on "Ready". The position of the actual robot appears in a semi-transparent green color. This may be useful when you've left the robot in a certain position that you would like to keep when entering the teleoperation. Hold (A) to start the teleoperation.

{{< img "images/vr/use-teleop/mirror-ready.png" 600x "Start teleoperation">}}

9. (NEW) You first have the control of the head and the mobile base, but **not of the arms**. Take a few seconds to check the robot surroundings and go to an appropriate place before starting the full teleoperation. When the environment is safe, **press A** to get the full control. You can also go back to the mirror room pressing the related button with your laser beam.

10. A 3 seconds timer appears while you enter the teleoperation. The motors speeds are reduced during this time to avoid sudden movements of the robot. Full speed is reached at the end of this countdown.

{{< img "images/vr/use-teleop/timer-start.png" 600x "Validate position before starting">}}

{{< alert icon="👉" text="<b>Warning:</b> you <b>don't want to move your torso and body</b> anymore after this step. Only your head and arms. The position of your VR controllers to master the robot arms are calculated depending on the position you had while pressing A." >}}

11. Come back any time to menu by **pressing A**. Teleoperation of the robot is automatically paused if the headset is removed.

## Control the mobile base
Use the **thumbstick/trackpad** to control the mobile base!  
The **left controller controls the translation** of the mobile base, while the **right one controls the rotation**.  

**Is there any security to prevent collision with objects?**  

**Yes!** If you are too close to a wall or object, the LIDAR anti-collision safety unables the mobile base to go closer to the obstacle. The mobile base will therefore not move in this direction, but you can still go in other directions. You will get a warning message when the anti-collision safety is triggered.  
[More information on the anti-collision safety](https://docs.pollen-robotics.com/sdk/mobile-base/safety/)  

Nevertheless, this security is for the mobile base and won't prevent the robot's arms to collide with external objects, so be aware while teleoperating the robot.  

*Please note very small objects won't be detected by the LIDAR sensor.*

**What is the forward direction of Reachy?**  

The forward direction is aligned with the **forward direction of the mobile base**, meaning that giving a forward instruction to the robot will always lead the robot to go physically forward, no matter the direction you are looking to.   

Check the actual direction of your commands using the **indicator** at the bottom: the white arrow shows you the direction command relative to your actual head orientation. If your head is correctly aligned with the mobile base forward direction, this arrow will point forward if giving a forward command with your left controller.  
{{< img "images/vr/use-teleop/straight_forward.png" 600x "Forward direction looking straight">}}
{{< img "images/vr/use-teleop/head_on_side_forward.png" 600x "Forward direction looking on the left">}}   

In the above images, the same forward command is sent from the left controller.   
On the first image, the user is looking straight (the black arrow is located in the target view), so the white mobility arrow is pointing front.   
On the second image, the user is looking on the left side (the target view is on the left of the black arrow), so the forward direction is pointing right, as it is the direction aligned with the mobile base forward direction.   

*Note that these images are only for example, mobility is not available on virtual Reachy.*


## Use Reachy's emotions
*Use of the antennas emotion is not available on Reachy 2.*

## Application features

### Connection page

{{% expand "> Add a new robot" %}}
Click on the robot to select to open the panel of all saved robots:
{{< img "images/vr/use-teleop/choose-robot.png" 600x "Change robot to connect">}}
Then click on "Add new robot +" at the bottom right of the page:
{{< img "images/vr/use-teleop/add-robot-button.png" 600x "Add robot button">}}
Enter a robot name and the IP address of the robot (if the headset is connected on a computer, use the computer keyboard), and save your robot card:  
*The IP address is mandatory. If no name is given to the new robot, it will be called @Reachy by default*
{{< img "images/vr/use-teleop/add-robot-card.png" 600x "Add robot panel">}}
{{% /expand %}}

{{% expand "> Modify an existing robot"%}}
Click on the robot to select to open the panel of all saved robots:
{{< img "images/vr/use-teleop/choose-robot.png" 600x "Change robot to connect">}}
Then click on the pencil icon of the robot you want to modify:
{{< img "images/vr/use-teleop/modify-robot-button.png" 600x "Modify robot button">}}
Modify the info on the robot card and save the card:
{{< img "images/vr/use-teleop/modify-robot-panel.png" 600x "Modify robot panel">}}
{{% /expand %}}

{{% expand "> Delete a saved robot"%}}
Click on the robot to select to open the panel of all saved robots:
{{< img "images/vr/use-teleop/choose-robot.png" 600x "Change robot to connect">}}
Then click on the bin icon of the robot you want to delete:
{{< img "images/vr/use-teleop/delete-robot-button.png" 600x "Delete robot button">}}
Validate the deletion:
{{< img "images/vr/use-teleop/delete-robot-panel.png" 600x "Delete robot panel">}}
{{% /expand %}}


### Mirror scene

{{% expand "> Check robot status"%}}
Open the info menu in the mirror room:
{{< img "images/vr/use-teleop/mirror-info.png" 600x "Info menu">}}
The connection and services status, and motor temperature are reported here.
{{% /expand %}}

{{% expand "> Controller mapping"%}}
Open the help menu in the mirror room:
{{< img "images/vr/use-teleop/mirror-help.png" 600x "Info menu">}}
The mapping of the controller buttons to the robot actions are displayed here.
{{% /expand %}}

{{% expand "> Settings menu"%}}
Open the settings menu in the mirror room:
{{< img "images/vr/use-teleop/mirror-settings.png" 600x "Settings menu">}}
Here you can set your size to improve the mapping between your movements and reachy's motion. Individual parts of the robot can be deactivated in the case you don't need the mobile base, a specific arm, etc.  
Motion sickness options are available in this panel: choose to display a reticle or not, and select a navigation effect that fit to your robot use.
You can also modify the grasping mode there: with full control you decide at each time the opening of the gripper, while the grasping lock option enables you to close the gripper with on trigger press and open it with another one. Grasping lock option can be turned on/off as well in the emotion menu.
{{% /expand %}}

{{% expand "> Reset position"%}}
While facing the mirror, your body should be aligned with Reachy's body. This is mandatory to have a consistent control. If this is not the case after having pressed "Ready", face the mirror and click on "Reset position".
{{< img "images/vr/use-teleop/reset_position.png" 600x "Reset position">}}
The "Reset position" button is placed at the bottom of the mirror, under the A loader.
{{% /expand %}}

### Teleoperation exit

{{% expand "> Exit and lock position"%}}
While press (A) to exit the teleoperation, you may hold (X) to activate the position lock. A lock is displayed when doing so.
{{< img "images/vr/use-teleop/exit-lock.png" 600x "Exit and lock">}}
The robot will stayed locked while you'll be back in the mirror room. This can be useful to keep a certain position while you need to take a break, change position or remove the headset. The position of the robot will be displayed by the semi-transparent green robot when you will restart the teleoperation.
{{% /expand %}}
