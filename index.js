// ----------------------------------------------
// Importing all the Functions/Classes
// {----Main----}
import Loader from "./Control/loader";
import "./Control/test";
// {----Utils----}
import Chat from './Main/Utils/Chat';
import Delay from './Main/Utils/Delay';
import Sleep from './Main/Utils/sleep';
import Inventory from './Main/Utils/Inventory';
import ItemManagement from './Main/Utils/ItemManagement';
import McFormattingCodes from './Main/Utils/McFormattingCodes';
import MobDetect from './Main/Utils/MobDetect';
import MouseTweaks from './Main/Utils/MouseTweaks';
import TickTask from './Main/Utils/TickTask';
import World from './Main/Utils/World';
import EventEmitter from "./Main/Utils/EventEmitter";
import Utils from "./Main/Utils/Utils";
// {----UAC----}
import Session from './Main/UAC/Session';
import "./Main/UAC/AutoFish";
import "./Main/UAC/Login";
// {----Components----}
import Countdown from './Main/Components/Countdown';
// {----Rendering----}
import Render from "./Main/Rendering/Render";
// {----Dev----}
import "./Main/Dev/VSC-Opener";
import "./Main/Dev/VSC-Closer";
import "./Main/Dev/ModuleStats";
// {----Chat----}
import "./Main/Chat/EmoteReplacer";
// {----Server----}
import Ping from "./Main/Server/ping";
import Fps from "./Main/Server/fps";

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
 * Delays the execution of a callback function using a step-based timer.
 * Uses either `setFps` for high-frequency delays (< 1000 ms) or `setDelay` otherwise.
 *
 * @param {number} timeout - The delay duration in milliseconds. If below 1000, steps per second are increased.
 * @param {Function} callback - The function to execute after the delay.
 *
 * @example
 * sleep(500, () => {
 *   console.log("Executed after ~500ms");
 * });
 */
export const sleep = Sleep
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

/**
 * Gets the current Pingfrom the server.
 * @returns {Promise<number>} - A promise that resolves to the current ping.
 */
export const getPing = Ping.getPing

/**
 * Gets the current FPS from the server.
 * @returns {number} - The current FPS.
 */
export const getFps = Fps.getFps;

/**
 * A simple event emitter instance to register and trigger custom events.
 *
 * @namespace EventEmitter
 * @property {function(string, function): void} on - Registers a callback for a given event name.
 * @property {function(string, any): void} emit - Emits an event, calling all registered callbacks with optional data.
 * @property {Object.<string, function[]>} _listeners - Internal map of event names to their registered callbacks.
 *
 * @example
 * EventEmitter.on('myEvent', data => console.log('Received:', data));
 * EventEmitter.emit('myEvent', { hello: 'world' });
 */
export const EventEmitter = EventEmitter;
/**
 * Draws a box at the specified coordinates with the given color and alpha value.
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 * @param {number} z - z coordinate
 * @param {number} wx - width of the box on the x-axis
 * @param {number} h - height of the box
 * @param {number} wz - width of the box on the z-axis
 * @param {number} r - red color value [0-255]
 * @param {number} g - green color value [0-255]
 * @param {number} b - blue color value [0-255]
 * @param {number} a - alpha value [0-255]
 * @param {string} phase - phase of the box
 * @param {number} [lineWidth=1] - width of the box lines
 * * @returns {void}
 * * @description
 * Draws a box at the specified coordinates with the given color and alpha value.
 * * @example
 * drawBox(100, 64, 100, 1, 2, 1, 255, 0, 0, 255, "calc", 2);
 */
export const drawBox = Utils.drawBox
/**
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 * @param {number} z - z coordinate 
 * @param {number} red - red color value [0-255] 
 * @param {number} green - green color value [0-255]
 * @param {number} blue - blue color value [0-255]
 * @param {number} alpha - alpha value [0-255]
 * @param {number} type - type of trace, calc is centering the line on the block
 * @param {number} lineWidth - width of the line
 * @returns {void}
 * * @description
 * Draws a line from the player's position to the specified coordinates with the given color and width.
 * * @example
 * trace(100, 64, 100, 255, 0, 0, 255, "calc", 2);
 */
export const trace = Utils.trace;

Loader.setLoading(false);