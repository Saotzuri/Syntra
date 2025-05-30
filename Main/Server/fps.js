export default {
    getFps() {
        const fps = Client.getFPS();
        return fps > 0 ? fps : 20; // Default to 20 if FPS is not available
    }
}