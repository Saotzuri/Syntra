import World from "../Main/Utils/World";
import Chat from "../Main/Utils/Chat";
const chat = Chat.chat;
const chatBreak = Chat.chatBreak;
let loading = true;
const init = register("step", () => {
    if (!World.isInSkyblock()) return;
    if (loading) return;
    chat("&l&n&b[Snytra] &r&aLoaded successfully!");
    chat("&l&n&b[Snytra] &r&aType &b/syntra &ato open the overlay!");
    chatBreak("&b-");
    chat("&l&n&b[Snytra] &r&aLet the fun begin!");
    init.unregister();
}).setFps(1);

export default {
    getLoading: () => {
        return loading;
    },
    setLoading: (state) => {
        loading = state;
    },
};
