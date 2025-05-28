function getInventoryItems() {
    const inventory = Player.getInventory();
    if (!inventory) return [];  // Return an empty array if the inventory is not available
    let inventoryItems = [];

    // Iterate through all inventory slots (assuming inventory has more than just the hotbar)
    for (let slot = 0; slot < inventory.getSize(); slot++) {
        if ([8].includes(slot)) continue;
        let item = inventory.getStackInSlot(slot);
        if (item && item.getName) {
            let itemName = item.getName().removeFormatting();  // Remove formatting codes
            inventoryItems.push({
                index: slot,  // Store the index of the item in the inventory
                name: itemName, // Store the name of the item
                itemObj: item
            });
        }
    }
    return inventoryItems;
}

// helmet = 39, Chest = 38, Leggings = 37, Boots = 36
let aliases = {
    H: 39,
    C: 38,
    L: 37,
    B: 36
};
function getItemInSlot(slot) {
    const inventory = Player.getInventory();
    let itemObj = [];
    if (!inventory) return itemObj;  // Return an empty array if the inventory is not available
    if (typeof slot === 'string') {
        slot = aliases[slot];
    }
    item = inventory.getStackInSlot(slot);
    itemObj.push({
        index: slot,
        name: item.getName().removeFormatting(),
        itemObj: item
    });
    return itemObj;
}

export default { getInventoryItems, getItemInSlot };
