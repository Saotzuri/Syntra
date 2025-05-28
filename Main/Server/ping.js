const C16PacketClientStatus = net.minecraft.network.play.client.C16PacketClientStatus
const S37PacketStatistics = net.minecraft.network.play.server.S37PacketStatistics
import Promise from "../../../PromiseV2";

let pendingPing = null;
let lastRequestTime = 0;

function getPing() {
    return new Promise((fulfil, reject) => {
        // Check if already pending
        if (pendingPing) {
            reject("Another ping request is already pending");
            return;
        }

        // Check cooldown
        const now = Date.now();
        if (now - lastRequestTime < 2000) {
            reject("Please wait 2 seconds between ping requests");
            return;
        }

        // Store reference
        pendingPing = { fulfil, reject };
        lastRequestTime = now;

        // Send packet
        Client.sendPacket(
            new C16PacketClientStatus(C16PacketClientStatus.EnumState.REQUEST_STATS)
        );

        // Set timeout
        const timeout = setTimeout(() => {
            if (pendingPing) {
                pendingPing.reject("Ping request timed out");
                pendingPing = null;
            }
        }, 1000);
    });
}

// Packet handler
register("packetReceived", (packet) => {
    if (pendingPing && packet instanceof S37PacketStatistics) {
        const ping = Date.now() - lastRequestTime;
        pendingPing.fulfil(ping);
        pendingPing = null;
    }
});

// Reset on world change
register("worldUnload", () => {
    if (pendingPing) {
        pendingPing.reject("World changed");
        pendingPing = null;
    }
});

export default getPing;