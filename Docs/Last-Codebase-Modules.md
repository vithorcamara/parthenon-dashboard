# Code Modules Documentation (`/src`)

This document describes the main source code modules created for the frontend, detailing their responsibilities and, most importantly, the **specific AthenaEnv APIs** they utilize.

The goal is to allow for manual verification of syntax and logic against the official AthenaEnv documentation.

---

## 1. `src/core/App.js`

-   **Responsibility**: This is the main entry point of the application. The `run()` function exported by this module initializes the environment, the core systems, and starts the main game loop.
-   **Structure**: Contains the `run()` function, which in turn contains the main loop inside a `Screen.display()` callback.

### AthenaEnv API Calls:
-   `Screen.setVSync(true)`: Used to synchronize the loop with the screen refresh rate.
-   `Screen.setFrameCounter(true)`: Used to display an FPS counter on the screen (for debugging).
-   `Screen.display(() => { ... })`: The function that defines the main loop. The callback passed to it is executed every frame.

---

## 2. `src/core/Input.js`

-   **Responsibility**: To abstract the input from the PS2 controller. It detects which controller is connected, updates its state every frame, and provides simple methods (`isButtonPressed`, `isButtonDown`) for the rest of the application to consume.
-   **Structure**: A function constructor (`new Input()`) that initializes the controller and defines the check methods. The `update()` method must be called once per frame to read the latest state of the controller.

### AthenaEnv API Calls:
-   `Pads.get(0)`: Gets the controller object connected to port 0.
-   `pad.update()`: Updates the internal state of the `pad` object (must be called every frame).
-   `pad.pressed(Pads.BUTTON_NAME)`: Checks if a specific button (e.g., `Pads.START`, `Pads.CROSS`) is being pressed in the current frame.
-   `Pads.START`, `Pads.CROSS`, etc: Constants representing the controller buttons.

---

## 3. `src/core/SceneManager.js`

-   **Responsibility**: To manage the lifecycle of the scenes (screens). It is responsible for loading new scenes, unloading old ones, and calling the `update()` and `render()` functions of the active scene every frame.
-   **Structure**: A function constructor that holds a reference to the current scene and exposes the `loadScene(Scene)` method.

### AthenaEnv API Calls:
-   **None**. This module is an orchestrator and does not interact directly with the AthenaEnv API. It delegates this responsibility to the scenes.

---

## 4. `src/scenes/BootScene.js`

-   **Responsibility**: To serve as the first screen of the application and as an example of a functional scene. It loads its own resources (like fonts) and uses them to draw on the screen.
-   **Structure**: A function constructor that implements the "interface" of a scene: `enter()`, `update()`, `render()`, `exit()`.

### AthenaEnv API Calls:
-   `new Font("./path/to/font.ttf")`: Loads a font file from the file system into a `Font` object.
-   `font.print(x, y, "text")`: Uses a previously loaded `Font` object to draw text on the screen at the specified coordinates.
