import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"

const schemes = ["data/ColorScheme.json", "data/scheme-vigil.json", "data/scheme-nwjn.json", "data/scheme-noam.json", "data/sboScheme.json"]

const defaultConf = new DefaultConfig("Syntra", "data/settings.json")
    .addSwitch({
        category: "General",
        configName: "AutoFish",
        title: "Auto Fish",
        description: "Automatically fish when you're near water.",
        tags: ["Fish", "AutoFish"],
    })
    .addSwitch({
        category: "General",
        configName: "HideFishMessage",
        title: "Hide Fish Message",
        description: "Hides the message when you start/stop fishing.",
        tags: ["Fish", "AutoFish", "Message", "Hide", "hideMessage"],
    })
    .addSwitch({
        category: "General",
        configName: "RightClick",
        title: "2nd Right Click?",
        description: "Right click again after the first right click.",
        tags: ["Mouse", "RightClick", "MouseTweaks"],
    })

const config = new Settings("Syntra", defaultConf, schemes[4])
    .setCommand("Syntra", ["Syn"])


const rcolor = Renderer.color(85, 255, 255)
config.getHandler().registers.onDraw(() => {
    const mainBlockLeft = config.mainBlock.getLeft();
    const mainBlockRight = config.mainBlock.getRight();
    const mainBlockTop = config.mainBlock.getTop();
    const mainBlockBottom = config.mainBlock.getBottom();
    Renderer.drawLine(rcolor, mainBlockLeft + 130, mainBlockTop + 10, mainBlockLeft + 130, mainBlockBottom - 10, 2);
})

config.setSize(60, 60).apply()
// config.registerListener("RightClick", (oldText, newText) => {
//     console.log(`Text changed from ${oldText} to ${newText}`);
// })

export function getConfig() {
    return config
}

export default () => config.settings