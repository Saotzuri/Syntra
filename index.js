// ----------------------------------------------
// Importing all the Functions/Classes
import TickTask from './general/TickTask';
import ItemManagement from './general/ItemManagement';
import MouseTweaks from './general/MouseTweaks';
import World from './general/World';
import Inventory from './general/Inventory';
import McFormattingCodes from './general/McFormattingCodes';
import Chat from './general/Chat';
import Delay from './general/Delay';
import Countdown from './general/Countdown';
import Session from './general/Session';
import "./general/Login";
import MobDetect from './general/MobDetect';
import settings, { getConfig } from "./config";
// import socket from "../SBOSOCKET";
import Effects from "./general/Effects";
import Render from "./general/Render";
import "./general/AutoFish";
import Manager from './overlays/Manager';
import Handler from './overlays/Handler';
import getPing from "./server/ping";
import { UIBlock, UIText, ChildBasedSizeConstraint, SiblingConstraint } from '../Elementa';
import { getConfig } from './config';

const smolderString = new Render.simpleString("&aSmoldering: ")
const fps = new Render.simpleString("FPS: 200")
const ping = new Render.simpleString("Ping: 100")
register("renderOverlay", () => {
    let remaining = Effects.effects.getTime("Smoldering")
    if (remaining) {
        smolderString.setText(`&aSmoldering: &e${remaining}`)
    } else {
        smolderString.setText("&aSmoldering: &e0")
    }
    smolderString.render()
    fps.setText(`FPS: ${Client.getFPS()}`)
    fps.setX(10).setY(5).render()
    getPing().then(pingText => {
        ping.setText(`Ping: ${pingText}`)
    })
    ping.setX(60).setY(5).render()
    // ChatLib.chat(`&aSmoldering: &e${remaining}`)
}) 



//----------------------------------------------
// Testing Area
// let manager = new Manager().setCommand("testmove", "tm")
// const Fps = new UIText("FPS: 200")
// const Ping = new UIText("Ping: 100")
// manager.addElement("myElement1", "Element", {
//         element: new UIBlock()
//             .setX((0).pixels())
//             .setY((0).pixels())
//             .setWidth(new ChildBasedSizeConstraint())
//             .setHeight(new ChildBasedSizeConstraint())
//             .setColor(Handler.Color([0, 0, 0, 0]))
//             .addChild(
//                 Fps.setColor(Handler.Color([255, 255, 255, 255]))
//                 .setX((0).pixels())
//                 .setY((0).pixels())
//             )
//             .addChild(
//                 Ping.setColor(Handler.Color([255, 255, 255, 255]))
//                 .setX(new SiblingConstraint(5))
//                 .setY((0).pixels())
//             ),
//         texts: {
//             line1: Fps, 
//             line2: Ping
//         }
//     }
// );

// register("tick", () => {
//     manager.updateElementText("myElement1", "line1", "FPS: " + Client.getFPS());
//     getPing().then(ping => {
//         manager.updateElementText("myElement1", "line2", "Ping: " + ping);
//     });
// })

// socket.addEvent("custom_event")
// socket.addEvent("testSend")
// socket.on("custom_event", (d) => {
//     ChatLib.chat(`&6[SBO] &e${d.data}`);
// })
// socket.on("testSend", (d) => {
//     print(JSON.stringify(d));
//     ChatLib.chat(`&6[SBO] &e${d.data}`);
// })
register("command", (arg1, arg2, ...args) => {
    let x = 0
    let y = 0
    if (arg1) x = parseInt(arg1)
    if (arg2) y = parseInt(arg2)
    smolderString.setX(x).setY(y)
}).setName("smolder")
register("command", (arg, ...args) => {
// 
// &r&c&m-----------------------------------------------------&r
// &r&cYou are currently muted for a Minor Chat Infraction.&r
// &r&7Your mute will expire in &r&c18d 8h 2m 43s&r
// &r &r&r&r
// &r&7Find out more here: &r&ewww.hypixel.net/mutes&r
// &r&7Mute ID: &r&f#4URRF43D&r
// &r&c&m-----------------------------------------------------&r

    // simulate the above messages with Chatlib.simulateChat(message)
    // ChatLib.simulateChat("&r&c&m-----------------------------------------------------&r")
    // ChatLib.simulateChat("&r&cYou are currently muted for a Minor Chat Infraction.&r")
    // ChatLib.simulateChat("&r&7Your mute will expire in &r&c18d 8h 2m 43s&r")
    // ChatLib.simulateChat("&r &r&r&r")
    // ChatLib.simulateChat("&r&7Find out more here: &r&ewww.hypixel.net/mutes&r")
    // ChatLib.simulateChat("&r&7Mute ID: &r&f#4URRF43D&r")
    // ChatLib.simulateChat("&r&c&m-----------------------------------------------------&r")
    // socket.send("custom_event", { data: { message: "Hello from the client!" } });#

    // chat(`&6[SBO] &e${arg}`);
    // let effect = Effects.effects.getEffect(arg)
    // if (effect) chat(`Effect: ${effect.name} Remaining: ${effect.remaining}`)
    ChatLib.command("testtetter", true);
}).setName("testds");


// ITEM_NAME = "fire freeze"
// register("clicked", (x, y, button, pressed) => {
//     if (button === 1 && pressed) { // 1 = Right-click
//         if (isItemRightClicked(ITEM_NAME)) {
//             ChatLib.chat(`§aDu hast das Item "${ITEM_NAME}" mit Rechtsklick verwendet!`);
//         }
//     }
// });

register("command", () => {
    chat("Testing the executeCommand function");
}).setName("testec");
//----------------------------------------------
// All the exports and how to use them
/**
 * - Runs the given function after specified server ticks have passed
 * @param {() => void} fn The function to execute
 * @param {number} delay The delay in ticks (default is `1`)
 */
export const scheduleTickTask = TickTask.scheduleTickTask;
/**
 * Swaps to the item in the hotbar that contains the itemName.
 * @param {string} itemName - The name of the item to swap to.
 * @returns {boolean} - Returns `true` if swap is successful, `false` otherwise.
 */
export const swapToItem = ItemManagement.swapItem;
/**
 * Checks if the item in the hotbar is right-clicked.
 * @param {string} itemName - The name of the item to check.
 * @returns {boolean} - Returns `true` if right click is successful, `false` otherwise.
 */
export const isItemRightClicked = ItemManagement.isItemRightClicked;
/**
 * Right clicks.
 * @returns {boolean} - Returns `true` if right click is successful, `false` otherwise.
 */
export const rightClick = MouseTweaks.rightClick;
/**
 * Left clicks.
 * @returns {boolean} - Returns `true` if left click is successful, `false` otherwise.
 */
export const leftClick = MouseTweaks.leftClick;
/**
 * Middle clicks.
 * @returns {boolean} - Returns `true` if middle click is successful, `false` otherwise.
 */
export const middleClick = MouseTweaks.middleClick;
/**
 * Returns the world the player is in.
 * @returns {string} - The world the player is in.
 */
export const getWorld = World.getWorld;
/**
 * Returns the current zone the player is in. If the player is not in a zone, it returns "None".
 * @returns {string} - The current zone the player is in.
 */
export const getZone = World.getZone;
/**
 * Returns the tier value for the "Kuudra" world. If the player is not in "Kuudra", it returns undefined.
 * @returns {number|undefined} - The tier value for the "Kuudra" world.
 */
export const getKuudraTier = World.getKuudraTier;
/**
 * Returns true if the player is in Skyblock, false otherwise.
 * @returns {boolean} - True if the player is in Skyblock, false otherwise.
 */
export const isInSkyblock = World.isInSkyblock;
/**
 * Returns an array of items in the inventory with their names and indices.
 * @returns {Array} - An array of objects with each item’s name, index, and item object.
 */
export const getInventoryItems = Inventory.getInventoryItems;
/**
 * Returns the item in the specified slot.
 * @param {number} slot - The slot number to check or {H: Helmet, C: Chestplate, L: leggins, B: Boots}.
 * @returns {object} - The item object in the specified slot.
 */
export const getItemInSlot = Inventory.getItemInSlot;
/**
 * Returns the formatting codes used in Minecraft.
 * 
 * **Colors:**
 * - `McCodes.BLACK`: `&0`
 * - `McCodes.DARK_BLUE`: `&1`
 * - `McCodes.DARK_GREEN`: `&2`
 * - `McCodes.DARK_AQUA`: `&3`
 * - `McCodes.DARK_RED`: `&4`
 * - `McCodes.DARK_PURPLE`: `&5`
 * - `McCodes.GOLD`: `&6`
 * - `McCodes.GRAY`: `&7`
 * - `McCodes.DARK_GRAY`: `&8`
 * - `McCodes.BLUE`: `&9`
 * - `McCodes.GREEN`: `&a`
 * - `McCodes.AQUA`: `&b`
 * - `McCodes.RED`: `&c`
 * - `McCodes.LIGHT_PURPLE`: `&d`
 * - `McCodes.YELLOW`: `&e`
 * - `McCodes.WHITE`: `&f`
 * 
 * **Formatting:**
 * - `McCodes.OBFUSCATED`: `&k`
 * - `McCodes.BOLD`: `&l`
 * - `McCodes.STRIKETHROUGH`: `&m`
 * - `McCodes.UNDERLINE`: `&n`
 * - `McCodes.ITALIC`: `&o`
 * - `McCodes.RESET`: `&r`
 */
export const McCodes = McFormattingCodes;
/**
 * Sends a chat message to the player.
 * @param {string} message - The message to send.
 */
export const chat = Chat.chat;
/**
 * Executes a command.
 * @param {string} command - The command name to execute.
 */
export const executeCommand = Chat.executeCommand;
/**
 * Runs the given function after the specified delay (in milliseconds).
 * @param {() => void} fn - The function to execute.
 * @param {number} delay - The delay in milliseconds.
 */
export const delay = Delay;
/**
 * A countdown timer that runs for the specified duration.
 * @param {number} duration - The duration of the countdown in seconds.
 * @param {function} onTick - The function to execute on each tick.
 * @param {function} onComplete - The function to execute on completion.
 * @example
 * const count = new Countdown(10);
 * count.onTick = (seconds) => {
 *    console.log(seconds);
 * };
 * count.onComplete = () => {
 *   console.log('Countdown completed!');
 * };
 * count.start();
 * @example
 */
export const CountdownTimer = Countdown;
/**
 * Returns the current session token.
 * @returns {string} - The current session token.
 */
export const getSession = Session.getSession;
/**
 * Returns the current proxy.
 * @returns {string} - The current proxy.
 */
export const getProxy = Session.getProxy;
/**
 * Adds the given mob name to the list of mobs to detect.
 * @returns {string} - The mob name to detect.
 */
export const drawMob = MobDetect.drawMob;
/**
 * Renders a string on the screen.
 * @param {string} text - The text to render.
 * @param {number} x - The x-coordinate to render the text at.
 * @param {number} y - The y-coordinate to render the text at.
 */
export const simpleString = Render.simpleString;