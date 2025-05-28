let scheduleTasks = [];
let stopCondition = false;
let tickCounter = 0;
const registeredCallbacks = []; // Format: { interval: ticks, callback: function, current: 0 }

function setStopCondition(status) {
    stopCondition = status;
}

function scheduleTickTask(fn, tickdelay = 1, randomize = false) {
    if (randomize) tickdelay += Math.floor((Math.random() * 3) - 1);
    if (tickdelay <= 0) tickdelay = 1;
    scheduleTasks.push({ remainingTicks: tickdelay, fn });
}

const serverTicks = register("packetReceived", (packet) => {
    if (packet.func_148890_d() > 0) return;

    // Scheduled tasks abarbeiten
    for (let i = scheduleTasks.length - 1; i >= 0; i--) {
        let task = scheduleTasks[i];
        task.remainingTicks--;

        if (task.remainingTicks <= 0) {
            if (stopCondition) {
                scheduleTasks.splice(i, 1);
                continue;
            } else {
                task.fn();
                scheduleTasks.splice(i, 1);
            }
        }
    }

    tickCounter++;

    // Alle registrierten Callbacks prüfen
    for (let i = 0; i < registeredCallbacks.length; i++) {
        const entry = registeredCallbacks[i];
        if (!entry) continue;

        entry.current++;
        if (entry.current >= entry.interval) {
            entry.current = 0;
            entry.callback();
        }
    }

    // Reset nach ~1 Stunde (72000 Ticks)
    if (tickCounter >= 72000) tickCounter = 0;
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction);

serverTicks.unregister(); // Standardmäßig deaktiviert

function registerEachServer(seconds, callback) {
    const ticks = seconds * 20;
    registeredCallbacks.push({ interval: ticks, callback, current: 0 });
}

export default { scheduleTickTask, registerEachServer, setStopCondition };
