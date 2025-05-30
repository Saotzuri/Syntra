// Retrieve the Minecraft client object
const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag");
const leftClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147116_af");
const middleClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147112_ai");

// Set the method accessible
rightClickMethod.setAccessible(true);
leftClickMethod.setAccessible(true);
middleClickMethod.setAccessible(true);

function rightClick() {
    // Invoke the right-click method on the Minecraft client instance
    rightClickMethod.invoke(Client.getMinecraft());
}

function leftClick() {
    // Invoke the left-click method on the Minecraft client instance
    leftClickMethod.invoke(Client.getMinecraft());
}

function middleClick() {
    // Invoke the middle-click method on the Minecraft client instance
    middleClickMethod.invoke(Client.getMinecraft());
}

export default { rightClick, leftClick, middleClick };