import delay from './Delay';
function getZone() {
    let lines = Scoreboard.getLines();
    if (!lines) return "None";
    let zoneLine = lines.find((line) => line && line.getName().includes("⏣"));
    // Rift has a different symbol
    if (zoneLine === undefined) zoneLine = lines.find((line) => line.getName().includes("ф"));
    if (zoneLine === undefined) return "None";
    let zoneName = zoneLine.getName().removeFormatting();
    return zoneName;
}

function getWorld() {
    let world = null;
    
    // Get world from tab list
    let worldLine = TabList.getNames().find(tab => tab.includes("Area"));
    
    if (worldLine === undefined) {
        // If the world is not found, retry after a delay
        let zone = getZone();
        if (zone.includes("Catac")) {
            world = "Catacombs";
        } else {
            delay(() => getWorld(), 1000);  // Retry after 1 second
        }
    } else {
        // Format the world name
        world = worldLine.removeFormatting();
        world = world.substring(world.indexOf(': ') + 2);
    }

    // Return only the world name
    return world;
}

function getKuudraTier() {
    let world = getWorld();  // Call getWorld to get the current world
    let zone = getZone();   // Get the zone, which is used to determine the tier value

    // Check if the player is in the "Kuudra" world
    if (world === "Kuudra") {
        // Extract the tier value from the zone (assuming the tier value is always the second to last character in the zone string)
        let tier = parseInt(zone.charAt(zone.length - 2));  // Get the tier value (e.g., 1, 2, 3, ...)
        return tier;  // Return the tier value
    }

    return undefined;  // If not in the "Kuudra" world, return undefined
}

function isInSkyblock() {
    return Scoreboard.getTitle()?.removeFormatting().includes("SKYBLOCK");
}

export default { getZone, getWorld, getKuudraTier, isInSkyblock };
