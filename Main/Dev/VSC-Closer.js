/**
 * ============================================
 * VS Code Closer for ChatTriggers
 * ============================================
 *
 * 🔧 Command Usage:
 *   /syntraclosevscode     → Closes all running VS Code windows (code.exe processes)
 *
 * 💡 Purpose:
 * Allows you to quickly shut down all open VS Code instances directly from Minecraft.
 * Works only on **Windows** systems with default process naming.
 */

const Runtime = Java.type("java.lang.Runtime");

register('command', () => {
    try {
        // Windows only – kill all "Code.exe" processes (VS Code user install)
        Runtime.getRuntime().exec("taskkill /F /IM Code.exe");
        ChatLib.chat("&l&n&b[Snytra] &r&aSuccessfully closed all VS Code instances.");
    } catch (e) {
        ChatLib.chat("&l&n&b[Snytra] &r&cFailed to close VS Code: " + e.message);
    }
}).setName("syntraclosevscode").setAliases(["synclosevs", "closevscode"]);