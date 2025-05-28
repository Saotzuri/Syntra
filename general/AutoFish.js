import ItemManagement from "./ItemManagement";
import TickTask from "./TickTask";
import MouseTweaks from "./MouseTweaks";
import Chat from "./Chat";
import World from "./World";
import { Keybind } from "../../tska/shared/Keybind";
import settings from "../config";

const swapItem = ItemManagement.swapItem;
const scheduleTickTask = TickTask.scheduleTickTask;
const setSeverTickRegister = TickTask.setSeverTickRegister;
const setStopCondition = TickTask.setStopCondition;
const rightClick = MouseTweaks.rightClick;
const chat = Chat.chat;
const getWorld = World.getWorld;

const validWorlds = ["Crimson Isle", "The Park", "Hub", "Backwater Bayou"];
let isFishingInProgress = false;
let isRegistered = false
let fishingState = settings().AutoFish;

const fishingKey = new Keybind("DsFishing", Keyboard.KEY_NONE, "DsLibraries");
fishingKey.registerKeyPress(() => {
    if (!settings().AutoFish) return;
    fishingState ? stop() : start();
});

function updateAutoFishState(state, message) {
    fishingState = state;
    if (!settings().HideFishMessage) chat(message);
    else print(message.removeFormatting());
    setSeverTickRegister(state);
    if (state) isRegistered = true;
    else isRegistered = false;
}

function start() {
    updateAutoFishState(true, "&l&n&b[DsFishing] &r&aStarted!");
}

function stop() {
    updateAutoFishState(false, "&l&n&b[DsFishing] &r&cStopped!");
}

function executeStart(world) {
    const heldItem = Player.getHeldItem();
    if (heldItem?.getRegistryName() !== "minecraft:fishing_rod") {
        isFishingInProgress = false;
        return;
    }
    
    scheduleTickTask(() => { rightClick(); }, 1, true);

    fishing(() => {
        isFishingInProgress = false;
    }, world);
}

register("command", () => {
    if (!settings().AutoFish) return;
    fishingState ? stop() : start();
}).setName("DsFish");

const getSoundName = packet => packet.func_149212_c();
const getPitch = packet => packet.func_149209_h();
const getVolume = packet => packet.func_149208_g();

register("packetReceived", (packet) => {
    if (getSoundName(packet) !== "note.pling") return;
    if (getPitch(packet) !== 1) return;
    if (getVolume(packet) !== 1) return;
    if (!settings().AutoFish) return;
    if (!fishingState) return;
    if (!isRegistered) start();
    if (Client.isInGui()) return;
    
    const world = getWorld();
    if (isFishingInProgress || !validWorlds.includes(world)) return;
    
    isFishingInProgress = true;
    executeStart(world);
}).setFilteredClass(net.minecraft.network.play.server.S29PacketSoundEffect);

function fishing(callback, world) {
    scheduleTickTask(() => { swapItem("Hyperion", true); }, 5 );
    scheduleTickTask(() => { rightClick(); }, 8, true);
    if (settings().RightClick) scheduleTickTask(() => { rightClick(); }, 11, true);
    
    scheduleTickTask(() => {
        if (world !== "Crimson Isle") swapItem("Rod of the Sea");
        else swapItem("Hellfire");
    }, 14, true);
    scheduleTickTask(() => { rightClick(); }, 17, true)
    scheduleTickTask(() => { callback(); }, 20, true);
}

const stopFishing = [
    /^.*&r&c&lYou hear a massive rumble as Thunder emerges\.&r.*$/,
    /^.*&r&c&lYou have angered a legendary creature\.\.\. Lord Jawbus has arrived\.&r.*$/,
    /^.*&r&aA &r&cVanquisher &r&ais spawning nearby!&r.*$/,
];

register("chat", (event) => {
    if (!settings().AutoFish) return;
    let msg = ChatLib.getChatMessage(event, true);
    
    if (stopFishing.some((pattern) => pattern.test(msg))) {
        print("[" + new Date().toLocaleTimeString() + "]" + " Stopping Current Tasks cause of " + msg);
        isFishingInProgress = false;
        setStopCondition(true);
        setTimeout(() => { setStopCondition(false); }, 1000);
    }
});