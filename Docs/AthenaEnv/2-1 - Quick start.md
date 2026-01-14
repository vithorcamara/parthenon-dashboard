## Quick start with Athena

Hello World:  
```js
const font = new Font("default");

os.setInterval(() => { // Basically creates an infinite loop, similar to while true(you can use it too).
  Screen.clear(); // Clear screen for the next frame.
  font.print(0, 0, "Hello World!"); // x, y, text
  Screen.flip(); // Updates the screen.
}, 0);
```
See more examples at [AthenaEnv samples](https://github.com/DanielSant0s/AthenaEnv/tree/main/bin).

### Features

AthenaEnv uses a slightly modified version of the QuickJS interpreter for JavaScript language, which means that it brings almost modern JavaScript features so far.

**Float32**

This project introduces a (old)new data type for JavaScript: single floats. Despite being less accurate than the classic doubles for number semantics, they are important for performance on the PS2, as the console only processes 32-bit floats on its FPU.

You can write single floats on AthenaEnv following the syntax below:
```js
let test_float = 15.0f; // The 'f' suffix makes QuickJS recognizes it as a single float.
``` 
or  
```js
let test_float = Math.fround(15.0); // Math.fround returns real single floats on Athena.
``` 

**How to run it**

Athena is basically a JavaScript loader, so it loads .js files. It runs "main.js" by default, but you can run other file names by passing it as the first argument when launching the ELF file.

If you try to just download it on releases tab and run it, that's what you will see:
![_50bda816_20230409025946](https://user-images.githubusercontent.com/47725160/230757268-5968d7e0-79df-4e98-9c02-4ec5252e056f.png)

That's the default dashboard, coded in default main.js file. It searchs JavaScript files with the first line containing the following structure:
```js
// {"name": "App name", "author": "Who did it?", "version": "04012023", "icon": "app_icon.png", "file": "my_app.js"}
// Now you can freely code below:
```
Once it was found, it will appear on the dashboard app list.

**Error reporting system**

Athena has a consistent error system, which is capable of pointing the error type, custom message, files, lines and it even has
a color code.

EvalError:  
![_50bda816_20230409024828](https://user-images.githubusercontent.com/47725160/230756846-e7e5ef7d-4ca6-4e10-822b-bd8ab94e302f.png)

SyntaxError:  
![_50bda816_20230409024849](https://user-images.githubusercontent.com/47725160/230756861-94df60f8-8550-43a3-ac43-56d150e94145.png)

TypeError:  
![_50bda816_20230409024911](https://user-images.githubusercontent.com/47725160/230756863-9b5d2b27-ef7c-449b-8663-7b466243c425.png)

ReferenceError:  
![_50bda816_20230409024944](https://user-images.githubusercontent.com/47725160/230756870-1deac594-7b3b-4804-a5cd-bfe366f5be27.png)

RangeError:  
![_50bda816_20230409025004](https://user-images.githubusercontent.com/47725160/230756874-5b03f2ee-1f23-4629-a775-5567c580b1da.png)

InternalError:  
![_50bda816_20230409025029](https://user-images.githubusercontent.com/47725160/230756880-d3f9449f-a379-4eec-8342-721987d3c7a9.png)

URIError:  
![_50bda816_20230409025053](https://user-images.githubusercontent.com/47725160/230756884-0e7dc7c8-91b3-4a4d-9d0f-ee120b4cc18a.png)

AggregateError:  
![_50bda816_20230409025131](https://user-images.githubusercontent.com/47725160/230756885-11749f0c-ef5b-4f17-ad78-59181230e75a.png)
