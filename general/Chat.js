function chat(text) {
    // Send the chat message using ChatLib
    ChatLib.chat(text);
}

function executeCommand(command) {
    // Execute the command using ChatLib
    ChatLib.command(command, true);
}

export default { chat, executeCommand };