import Render from "../Main/Rendering/Render"
import Chat from "../Main/Utils/Chat"
import Ping from "../Main/Server/ping"
import Effects from "../Main/Components/Effects"
import RAM from "../Main/Resources/RAM"
import { UIBlock, UIText, SiblingConstraint, ChildBasedSizeConstraint } from "../../Elementa"

const getPing = Ping.getPing

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
    ChatLib.chat("RAM Usage: " + JSON.stringify(RAM.getMemoryPercentage()));
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
    Chat.chat("Testing the executeCommand function");
}).setName("testec");