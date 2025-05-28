let scheduleTasks = [];
let tickCounter = 0;
const registeredCallbacks = []; // Format: { interval: ticks, callback: function, current: 0 }

function scheduleTickTask(fn, tickdelay = 1) {
    scheduleTasks.push({remainingTicks: tickdelay, fn});
}

register("packetReceived", (packet) => {
    if (packet.func_148890_d() > 0) return;

    // Process all scheduled tasks
    for (let i = scheduleTasks.length - 1; i >= 0; i--) {
        let task = scheduleTasks[i];
        task.remainingTicks--;

        if (task.remainingTicks <= 0) {
            task.fn();  // Execute the task function
            scheduleTasks.splice(i, 1);  // Remove the completed task
        }
    }

    tickCounter++;
    // Alle registrierten Callbacks durchgehen
    for (let i = 0; i < registeredCallbacks.length; i++) {
        const entry = registeredCallbacks[i];
        if (!entry) continue; // Sicherheitscheck, falls ein Eintrag undefined ist
        
        entry.current++;
        if (entry.current >= entry.interval) {
            entry.current = 0;
            entry.callback(); // Ausführen, wenn Intervall erreicht
        }
    }
    
    // Tick-Counter zurücksetzen (nach ~1 Stunde, um Überlauf zu vermeiden)
    if (tickCounter >= 72000) tickCounter = 0;
}).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction);

// EINZIGE FUNKTION, DIE DU BRAUCHST:
function registerEachServer(seconds, callback) {
    const ticks = seconds * 20; // Sekunden in Minecraft-Ticks umrechnen
    registeredCallbacks.push({ interval: ticks, callback, current: 0 });
}


export default { scheduleTickTask, registerEachServer };
