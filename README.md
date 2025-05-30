# Syntra

### 🔧 Purpose

**Syntra** is a personal ChatTriggers module playground designed for rapid development, testing, and experimentation within the Minecraft modding environment.

---

## 🛠️ Features

- **Emote Replacer**: Automatically replaces chat emote codes (like `:skull:`) with emojis (like ☠) in chat messages.
- **Skyblock World & Zone Detection**: Functions to get the current Skyblock world, zone, and Kuudra tier for context-aware scripts.
- **Inventory & Item Management**: Tools for swapping items, checking right-clicks on hotbar items, and getting inventory contents.
- **Mouse Click Helpers**: Functions for simulating left, right, and middle mouse clicks.
- **Task Scheduling**: Schedule functions to run after a given number of server ticks.
- **Chat Utilities**: Easy-to-use functions for sending chat messages and executing commands.
- **Countdown Timer**: Built-in timer with customizable tick and completion callbacks.
- **Session & Proxy Info**: Retrieve session tokens and proxy details.
- **Mob Detection & Rendering**: Add mobs to detection lists and render text on the screen.
- **Minecraft Formatting Codes**: Constants for Minecraft color and formatting codes for convenient use in chat or UI.

---

## 🚀 Installation

1. Clone or download this repository:

   ```bash
   git clone https://github.com/Saotzuri/Syntra.git
   ```

2. Move the Syntra folder into your ChatTriggers modules directory:
    ```bash
    /ChatTriggers/modules/Syntra/
    ```
3. /ct reload or restart Minecraft to activate the module.

## 📚 Usage & API Reference
All exports from the module are designed for ease of use and cover a wide range of tasks:

### Scheduling and Tasks
```js
import { scheduleTickTask } from "Syntra";

scheduleTickTask(() => {
    // Code to run after delay
}, 20);  // runs after 20 server ticks (1 second)
```

### Item & Inventory Management
```js
import { swapToItem, isItemRightClicked, getInventoryItems, getItemInSlot } from "Syntra";

swapToItem("Diamond Sword");  // swaps hotbar to diamond sword if found
isItemRightClicked("Totem of Undying");  // checks if right click action happened on item

let inventory = getInventoryItems();  // gets all inventory items with names and indices
let helmet = getItemInSlot(0);  // gets item in slot 0
```

### Mouse Clicks
```js
import { rightClick, leftClick, middleClick } from "Syntra";

rightClick();   // simulates right click
leftClick();    // simulates left click
middleClick();  // simulates middle click
```

### World & Zone Info
```js
import { getWorld, getZone, getKuudraTier, isInSkyblock } from "Syntra";

console.log(getWorld());       // e.g., "The End"
console.log(getZone());        // e.g., "Catacombs"
console.log(getKuudraTier());  // e.g., 3 (if in Kuudra world)
console.log(isInSkyblock());   // true or false
```

### Chat & Commands
```js
import { chat, executeCommand } from "Syntra";

chat("Hello, Skyblock!");      // sends chat message
executeCommand("/warp hub");   // runs the warp command
```

### Delay, Sleep and Countdown
```js
import { delay, CountdownTimer, sleep } from "Syntra";

delay(() => {
    console.log("This runs after 2 seconds");
}, 2000);

sleep(500, () => {
    console.log("Executed after ~500ms"); // Delays the execution of a callback function using a step-based timer. Uses either `setFps` for high-frequency delays (< 1000 ms) or `setDelay` otherwise.
});

const countdown = new CountdownTimer(10);
countdown.onTick = seconds => console.log(`Seconds left: ${seconds}`);
countdown.onComplete = () => console.log("Countdown finished!");
countdown.start();
```

### Session & Proxy
```js
import { getSession, getProxy } from "Syntra";

console.log("Session Token:", getSession());
console.log("Proxy:", getProxy());
```

### Mob Detection & Rendering
```js
import { drawMob, simpleString, drawBox, trace } from "Syntra";

drawMob("Zombie");             // adds Zombie to detected mobs
simpleString("Hello World", 10, 10);  // renders "Hello World" at (10,10) on screen
drawBox(100, 64, 100, 1, 2, 1, 255, 0, 0, 255, true, 2); // Draws a box at the specified coordinates with the given color and alpha value.
trace(100, 64, 100, 255, 0, 0, 255, "calc", 2); // Draws a line from the player's position to the specified coordinates with the given color and width.
```

### Minecraft Formatting Codes
```js
import { McCodes } from "Syntra";

chat(McCodes.RED + "This text is red!" + McCodes.RESET);
```
Colors include McCodes.RED, McCodes.GREEN, McCodes.GOLD, and many more.

Formatting codes include McCodes.BOLD, McCodes.UNDERLINE, McCodes.ITALIC, etc.

### Server Stats
```js
import { getPing, getFps } from "Syntra"

getPing().then(pingText => { print(pingText) }) // gets the current ping from the server and returns a promise that resolves to the current ping.
getFps() // gets the curent Client Fps
```

### Event Emitter
```js
import { EventEmitter } from "Syntra"

EventEmitter.on('myEvent', data => console.log('Received:', data)); // Registers a callback for a given event name.
EventEmitter.emit('myEvent', { hello: 'world' }); // Emits an event, calling all registered callbacks with optional data.
```

## 📝 License
This project is licensed under the [AGPL-3.0 License](LICENSE).

## 🙌 Contributions
Contributions and suggestions are welcome! Feel free to open issues or submit pull requests.