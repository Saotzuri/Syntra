/**
 * ============================================
 * VS Code Module Launcher for ChatTriggers
 * ============================================
 *
 * 🔧 Command Usage:
 *   /syntradev             → Opens the ChatTriggers modules folder in VS Code
 *   /syntradev <module>    → Opens a specific module folder directly in VS Code
 *
 * 💡 Purpose:
 * This script allows you to quickly open your ChatTriggers development environment in Visual Studio Code.
 * It's tailored for **Windows only**, using the default LOCALAPPDATA installation path of VS Code.
 * It supports tab-completion for available module names and validates the module before launching.
 */

const File = java.io.File;
const Runtime = java.lang.Runtime;
const System = java.lang.System;

// Get the absolute path to the ChatTriggers modules folder and normalize it
const configPath = new File(Config.modulesFolder).getAbsolutePath().replace(/\\/g, "/");

// Default installation path for VS Code on Windows (user-based installation)
const codePath = System.getenv("LOCALAPPDATA").replace(/\\/g, "/") + "/Programs/Microsoft VS Code/Code.exe";

// Command: /dev or /dev <moduleName>
// Opens VS Code in the modules folder or directly in a specific module folder
register('command', (folderName) => {
    let targetPath = configPath;

    // If a module name is provided, check if it exists
    if (folderName) {
        const folderPath = `config/ChatTriggers/modules/${folderName}`;
        if (!FileLib.exists(folderPath)) {
            return ChatLib.chat('&c> Module does not exist.');
        }
        targetPath += `/${folderName}`;
    }

    // Launch VS Code with the target path
    Runtime.getRuntime().exec(`"${codePath}" "${targetPath}"`);
})

// Auto-completion: suggests module names from the modules folder
.setTabCompletions((args) =>
    new File(configPath).list()
        .filter(name => name.toLowerCase().startsWith(args[0]?.toLowerCase() || ""))
        .sort()
)
.setName('syntradev')
.setAliases(['syndev', 'sdev'])