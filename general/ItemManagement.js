function swapItem(itemName) {
    const inventory = Player.getInventory();
    if (!inventory) return false;  // Return false if the inventory is not available
    let itemIndex = -1;  // Start with an invalid index

    // Iterate through the hotbar slots (0 to 8)
    for (let slot = 0; slot < 9; slot++) {
        let item = inventory.getStackInSlot(slot);
        if (item && item.getName && item.getName().toLowerCase().includes(itemName.toLowerCase())) {
            itemIndex = slot;
            break; // Found the item, no need to continue
        }
    }

    // If no item found, return false
    if (itemIndex === -1) return false;

    // Checks if the item is already in your hand
    const initialIndex = Player.getHeldItemIndex();
    if (initialIndex !== itemIndex) {
        Player.setHeldItemIndex(itemIndex);  // Swap the item
        return true;  // Return true if the item was swapped
    }

    return false;  // No swap needed
}

function isItemRightClicked(itemName) {
    const inventory = Player.getInventory();
    if (!inventory) return false;  // Return false if inventory is not available

    // Iterate through the hotbar slots (0 to 8)
    for (let slot = 0; slot < 9; slot++) {
        let item = inventory.getStackInSlot(slot);
        if (item && item.getName && item.getName().toLowerCase().includes(itemName.toLowerCase())) {
            return Player.getHeldItemIndex() === slot;
        }
    }
    return false;  // Item was not right-clicked
}

export default { swapItem, isItemRightClicked };
