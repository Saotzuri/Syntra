// ----------------------------------------------
// Importing all the Functions/Classes
import Loader from "./Control/loader";
import "./Control/test";
import TickTask from './Main/Utils/TickTask';
import ItemManagement from './Main/Utils/ItemManagement';
import MouseTweaks from './Main/Utils/MouseTweaks';
import World from './Main/Utils/World';
import Inventory from './Main/Utils/Inventory';
import McFormattingCodes from './Main/Utils/McFormattingCodes';
import Chat from './Main/Utils/Chat';
import Delay from './Main/Utils/Delay';
import Countdown from './Main/Components/Countdown';
import Session from './Main/UAC/Session';
import "./Main/UAC/Login";
import MobDetect from './Main/Utils/MobDetect';
import Render from "./Main/Rendering/Render";
import "./Main/UAC/AutoFish";


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

Loader.setLoading(false);