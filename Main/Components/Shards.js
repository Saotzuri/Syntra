import sleep from "../Utils/sleep"
import World from "../Utils/World"
const isInSkyblock = World.isInSkyblock
class Attributes {
    constructor() {
        this.attributes = []
        this.isOpen = false
        this.finder = register("tick", () => this.findAttributes()).unregister()
        register("guiOpened", () => this.handleOpen())
        register("guiClosed", () => this.handleClose())
        register("step", () => {
            if (!isInSkyblock()) return
            if (this.attributes.length === 0) return
            this.attributes.forEach((attribute) => {
                if (attribute.remaining > 0) attribute.remaining--
                if (attribute.remaining <= 0) this.attributes.splice(this.attributes.indexOf(attribute), 1)
            })
        }).setDelay(1)
    }

    handleOpen() {
        if (!isInSkyblock()) return
        sleep(100, () => {
            const container = Player.getContainer()
            const containerName = container.getName()
            print(containerName)
            if (containerName.includes("Attribute Menu")) {
                this.finder.register()
                this.isOpen = true
            }
        })
    }

    handleClose() {
        if (!isInSkyblock()) return
        if (this.isOpen) {
            this.finder.unregister()
            this.isOpen = false
        }
    }

    findAttributes() {
        if (!isInSkyblock()) return
        const container = Player.getContainer()
        const containerName = container.getName()
        if (!containerName.includes("Attribute Menu")) return
        let items = container.getItems()
        items.forEach((item, index) => {
            if (!item) return
            const itemName = item.getName().removeFormatting()
            if (itemName === "" || itemName === " ") return
            if (index > 43) return
            const lore = item.getLore()
            if (!lore) return
            lore.forEach((line) => {
                if (line.removeFormatting().includes("Source:")) {
                    const source = line.split("Source: ")[1].split(" ")[0]
                    const existingIndex = this.attributes.findIndex(effect => effect.name === itemName)
                    if (existingIndex !== -1) {
                        this.attributes[existingIndex].source = source.removeFormatting()
                    }
                    else {
                        this.attributes.push({
                            name: itemName,
                            source: source.removeFormatting(),
                        })
                    }
                }
            })
        });

    }

    getAttributes() {
        return this.attributes
    }

    getAttribute(name) {
        const attribute = this.attributes.find(attribute => attribute.name.includes(name))
        if (attribute) return attribute
        return null
    }
}

const attributes = new Attributes()
export default { attributes }