import Utils from "./Utils";

let Mobs = [];

function drawMob(name) {
    if (Mobs.find((mob) => mob.name === name.toLowerCase())) {
        ChatLib.chat(`Removed mob: ${name}`);
        Mobs = Mobs.filter((mob) => mob.name !== name.toLowerCase());
        return;
    }
    Mobs.push({ name: name.toLowerCase(), x: 0, y: 0, z: 0 });
    ChatLib.chat(`Added mob: ${name}`);
}

register("step", () => {
    let entities = World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand);
    entities.forEach((mob) => {
        let name = mob.getName().toLowerCase();
        Mobs.forEach((trackedMob) => {
            if (name.includes(trackedMob.name)) {
                trackedMob.x = mob.getX();
                trackedMob.y = mob.getY();
                trackedMob.z = mob.getZ();
            }
        });
    });

    Mobs = Mobs.filter((mob) => 
        World.getAllEntitiesOfType(net.minecraft.entity.item.EntityArmorStand)
            .some((e) => e.getName().toLowerCase().includes(mob.name))
    );
}).setFps(4);

register("renderWorld", () => {
    Mobs.forEach((mob) => {
        print(mob.x);
        Utils.drawBox(mob.x, mob.y, mob.z, 1, 2, 1, 255, 0, 0, 255, true);
    });
});


export default { drawMob };