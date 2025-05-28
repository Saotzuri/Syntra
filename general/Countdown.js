class Countdown {
    constructor(seconds, onTick = () => {}, onComplete = () => {}) {
        this.startSeconds = seconds;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.isRunning = false;

        this.registerDisconnectListener();
        this.registerWorldChangeListener();
    }

    start() {
        // Reset start and end time
        this.startTime = Date.now();
        this.endTime = this.startTime + this.startSeconds * 1000;
        this.isRunning = true;

        // Trigger an immediate tick to update remaining time without delay
        this.onTick(this.getSecondsLeft());

        // Register tick listener if not already running
        if (!this.tickListener) {
            this.registerTickListener();
        }
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            this.unregisterTickListener();
        }
    }

    getSecondsLeft() {
        const currentTime = Date.now();
        const remainingMilliseconds = Math.max(this.endTime - currentTime, 0);
        return (remainingMilliseconds / 1000).toFixed(3); // Returns seconds with millisecond precision
    }

    registerTickListener() {
        this.tickListener = register("packetReceived", (packet) => {
            if (packet.func_148890_d() > 0) return;

            const timeLeft = parseFloat(this.getSecondsLeft());
            this.onTick(timeLeft);

            if (timeLeft <= 0) {
                this.onComplete();
                this.stop();
            }
        }).setFilteredClass(net.minecraft.network.play.server.S32PacketConfirmTransaction);
    }

    unregisterTickListener() {
        if (this.tickListener) {
            this.tickListener.unregister();
            this.tickListener = null;
        }
    }

    registerDisconnectListener() {
        this.disconnectListener = register("serverDisconnect", this.stop);
    }

    registerWorldChangeListener() {
        this.worldChangeListener = register("worldLoad", this.stop);
    }
}

export default Countdown;
