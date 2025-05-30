function chat(text) {
    // Send the chat message using ChatLib
    ChatLib.chat(text);
}

function executeCommand(command) {
    // Execute the command using ChatLib
    ChatLib.command(command, true);
}

function chatBreak(char){
    ChatLib.chat(ChatLib.getChatBreak(char));
}

export default { chat, executeCommand, chatBreak };