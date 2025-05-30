import sleep from "../Utils/sleep"
import World from "../Utils/World"
const isInSkyblock = World.isInSkyblock
class Effects {
    constructor() {
        this.effects = []
        this.isOpen = false
        this.finder = register("tick", () => this.findEffects()).unregister()
        register("guiOpened", () => this.handleOpen())
        register("guiClosed", () => this.handleClose())
        register("step", () => {
            if (!isInSkyblock()) return
            if (this.effects.length === 0) return
            this.effects.forEach((effect) => {
                if (effect.remaining > 0) effect.remaining--
                if (effect.remaining <= 0) this.effects.splice(this.effects.indexOf(effect), 1)
            })
        }).setDelay(1)
    }

    handleOpen() {
        if (!isInSkyblock()) return
        sleep(100, () => {
            const container = Player.getContainer()
            const containerName = container.getName()
            if (containerName.includes("Active Effects")) {
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

    findEffects() {
        if (!isInSkyblock()) return
        const container = Player.getContainer()
        const containerName = container.getName()
        if (!containerName.includes("Active Effects")) return
        let items = container.getItems()
        items.forEach((item, index) => {
            if (!item) return
            const itemName = item.getName().removeFormatting()
            if (itemName === "" || itemName === " ") return
            if (index > 43) return
            const lore = item.getLore()
            if (!lore) return
            lore.forEach((line) => {
                if (line.removeFormatting().includes("Remaining:")) {
                    const remaining = line.split("Remaining: ")[1].split(" ")[0]
                    const existingIndex = this.effects.findIndex(effect => effect.name === itemName)
                    if (existingIndex !== -1) {
                        this.effects[existingIndex].remaining = this.parseTime(remaining.removeFormatting())
                    }
                    else {
                        this.effects.push({
                            name: itemName,
                            remaining: this.parseTime(remaining.removeFormatting()),
                        })
                    }
                }
            })
        });
    }

    parseTime(timeStr) {
        if (timeStr.includes(":")) {
            const parts = timeStr.split(":").map(Number).reverse()
            let total = 0
            if (parts.length >= 1) total += parts[0]
            if (parts.length >= 2) total += parts[1] * 60
            if (parts.length >= 3) total += parts[2] * 3600
            return total
        }
        return parseInt(timeStr.replace(/[^0-9]/g, "")) || 0
    }

    getEffects() {
        return this.effects
    }

    getEffect(name) {
        const effect = this.effects.find(effect => effect.name.includes(name))
        if (effect) return effect
        return null
    }

    getTime(name) {
        const effect = this.getEffect(name)
        if (effect) {
            const remaining = effect.remaining
            const hours = Math.floor(remaining / 3600)
            const minutes = Math.floor((remaining % 3600) / 60)
            const seconds = remaining % 60
            let timeString = ""
            if (hours > 0) timeString += `${hours}h `
            if (minutes > 0) timeString += `${minutes}m `
            timeString += `${seconds}s`
            return timeString
        }
        return null
    }

    setTime(name, time) {
        const effect = this.getEffect(name)
        if (effect) {
            if (time === 0) {
                this.effects.splice(this.effects.indexOf(effect), 1)
            } else {
                effect.remaining = time
            }
        } else {
            this.effects.push({
                name: name,
                remaining: time,
            })
        }
    }

    addTime(name, time) {
        const effect = this.getEffect(name)
        if (effect) {
            effect.remaining += time
        } else {
            this.effects.push({
                name: name,
                remaining: time,
            })
        }
    }
}

const effects = new Effects()
export default { effects }

register("chat", () => {
    if (!isInSkyblock()) return
    effects.addTime("Smoldering", 3600)
}).setCriteria("&r&aYou ate a &r&aRe-heated Gummy Polar Bear&r&a!&r")

