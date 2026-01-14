## About AthenaEnv

AthenaEnv is a project that seeks to facilitate and at the same time brings a complete kit for users to create homebrew software for PlayStation 2 using the JavaScript language. It has dozens of built-in functions, both for creating games and apps. The main advantage over using AthenaEnv project instead of the pure PS2SDK is above all the practicality, you will use one of the simplest possible languages to create what you have in mind, besides not having to compile, just script and test, fast and simple.

### Modules:
* System: Files, folders and system stuff.
* Archive: A simple compressed file extractor and manager.
* IOP: The PlayStation 2 has an I/O processor to deal with drivers and modules. Take control of it!
* Image: Image drawing.
* ImageList: Load and manage multiple images while your code is running, multithreaded loading!
* Draw: Shape drawing, triangles, circles etc.
* Render: Basic 3D support powered by a VU1 renderer.
* Screen: The entire screen of your project (2D and 3D), being able to change the resolution, enable or disable parameters.
* Font: Functions that control the texts that appear on the screen, loading texts, drawing and unloading from memory.
* Pads: Above being able to draw and everything else, A human interface is important. Supports rumble and pressure sensitivity.
* Keyboard: Basic USB keyboard support.
* Mouse: Basic USB mouse support.
* Timer: Control the time precisely in your code, it contains several timing functions.
* Sound: Sound functions, supporting WAV, OGG and ADPCM.
* Network: Net basics and web requests :D.
* Socket: Well, sockets.

New types are always being added and this list can grow a lot over time, so stay tuned.

### Built With

* [PS2DEV](https://github.com/ps2dev/ps2dev)
* [QuickJS](https://bellard.org/quickjs/)