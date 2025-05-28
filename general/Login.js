// const button = new net.minecraft.client.gui.GuiButton(2223, 0, 0, 85, 20, "Login with Token");
// const textField = new net.minecraft.client.gui.GuiTextField(2222, Client.getMinecraft().field_71466_p, 120, 5, 150, 20);
// textField.func_146203_f(100000);  // Maximale Eingabelänge aufheben

// register("postGuiRender", (mx, my, gui) => {
//     if (!(gui instanceof net.minecraft.client.gui.GuiMultiplayer)) return;

//     button.field_146128_h = 15;  // X-Position
//     button.field_146129_i = 5;   // Y-Position

//     button.func_146112_a(Client.getMinecraft(), mx, my);
//     textField.func_146194_f();
// });

// register("guiMouseClick", (mx, my, mb, gui) => {
//     if (!(gui instanceof net.minecraft.client.gui.GuiMultiplayer)) return;

//     if (
//         mx > button.field_146128_h && 
//         mx < button.field_146128_h + button.field_146120_f &&
//         my > button.field_146129_i &&
//         my < button.field_146129_i + button.field_146121_g
//     ) {
//         const token = textField.func_146179_b(); // Token vom Textfeld holen
//         if (token) {
//             // Token wird im Textfeld eingegeben und jetzt verwendet
//             print("Logging in with token: " + token);
//         } else {
//             print("Invalid token entered.");
//         }
//     }

//     textField.func_146192_a(mx, my, mb);
// });

// register("GuiKey", (char, keyCode, gui, event) => {
//     if (!(gui instanceof net.minecraft.client.gui.GuiMultiplayer)) return;
//     textField.func_146201_a(char, keyCode);
// });