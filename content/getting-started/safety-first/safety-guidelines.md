---
title: "Safety guidelines"
description: "Safety Guidelines for Using Reachy 2"
lead: "Safety Guidelines for Using Reachy 2"
date: 2023-07-26T08:05:23+02:00
lastmod: 2023-07-26T08:05:23+02:00
draft: false
images: []
type: docs
menu:
  getting-started:
    parent: "Safety first"
weight: 100
toc: true
---

{{< warning icon="👉🏾" text="Read this guide carefully before operating Reachy 2 to ensure safe and effective use." >}}

## Key Points

- **Stay Alert**: Reachy 2 is powerful and lacks automatic collision detection. It will not stop if it encounters obstacles, including people or itself. Remain vigilant at all times.
- **Qualified Users Only**: People using the robot or interacting with it must all be aware of the risks and be explicitly informed of the robot capabilities, limitations and restrictions. They must all be able to act with the appropriate behavior using the robot by knowing the safety guidelines.
- **Emergency Stop Button**: Always keep a person ready to use the emergency stop button. Press it immediately if you lose control of the robot or notice unexpected movements. Objects held by Reachy may fall if the button is pressed, so ensure the workspace is clear of items that could cause harm.

---

## Safe Operation Tips

### User Responsibilities

- **Constant Attention**: If you’re in Reachy’s workspace, you must stay focused and prepared to step back quickly. Only trained, aware individuals should handle or be near Reachy.
- **Proximity Awareness**: Ensure no body part is within Reachy’s range, especially near moving arms. Always maintain a position that allows you to safely and quickly step away if necessary.

### Workspace and Positioning

- **Clear Workspace**: Maintain enough space around Reachy for quick movement. Avoid positioning yourself or others between Reachy and walls or furniture.
- **Safety Bubble:** Maintain a "safety bubble" around Reachy to prevent unintended contact or injury. This bubble should extend at least **1 meter** on all sides during operation, with the exception of the front, where closer interaction is allowed for specific tasks. However, no one should ever stand or move within **1 meter** behind the robot, as it lacks rear sensors to detect obstacles or individuals, increasing the risk of accidents, especially during teleoperation.
- **Avoid Close Contact** : Never place your head, hands, or other body parts beneath Reachy’s arms or torso, especially when in motion.
- **Pinch Point Awareness :** When handling or manipulating Reachy, be cautious of pinch points between its joints and moving parts. To reduce the risk of injury, it is strongly recommended to wear protective gloves during any manual interaction with the robot.

### Handling Objects with Reachy

- **Object Risks**: Be cautious when using Reachy to handle sharp or heavy objects. Ensure the workspace is clear of people if Reachy is carrying or manipulating risky items.
- **Weight Limits**: Never exceed the 3 kg (6.6 lb) weight limit when lifting with Reachy, and keep objects close to the torso to avoid tipping risks.

### Manual Interaction with Reachy

- **Avoid Pinch Points**: Never place fingers in or between Reachy’s moving parts while it’s active.
- **Maintenance Safety**: Power down Reachy entirely before performing any adjustments or repairs to prevent unintended movements.

---

## Protecting Reachy from Damage

### Preventing Robot Toppling

- **Heavy Lifts**: Do not attempt to lift or extend objects too far out with Reachy’s arms. This could cause the robot to tip.
- **Avoid Push-Pull Forces**: Pushing or pulling overly heavy objects can lead to tipping. Assess the weight and resistance of any object before operating.

### Obstacle Awareness and Self-Collisions

- **Monitor Obstacles**: Reachy will follow commands precisely, so make sure there are no objects or people in its intended path.
- **Self-Collision Prevention**: When operating both arms, avoid movements that could cause the arms or torso to collide. Power off the motors if any unintended contact occurs.

### Mobile Base Caution

- **Use on Flat Surfaces**: Operate Reachy only on level ground. Slopes increase the risk of tipping.
- **Speed Limits:** Reachy’s maximum movement speed is 2,5**m/s**. Avoid abrupt direction changes or oscillatory commands that could destabilize the robot.
- **Active LIDAR for Anti-Collison** : Reachy’s LIDAR anti-collision system is active and monitors obstacles on a 2D plane at the height of the mobile base. It enforces a 0,70 meter (distance from the center of the robot) deceleration zone and a 0,55 meter full stop zone to prevent collisions. However, operators must remain vigilant, as the LIDAR does not detect higher obstacles like tables or elevated objects, nor does it account for the robot's arms. Always ensure the workspace is clear of potential hazards.

---

By adhering to these guidelines, you’ll help ensure a safe environment for both Reachy 2 and its users.