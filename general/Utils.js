import RenderLibV2 from "../../RenderLibV2";
/**
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 * @param {number} z - z coordinate 
 * @param {number} red - red color value [0-255] 
 * @param {number} green - green color value [0-255]
 * @param {number} blue - blue color value [0-255]
 * @param {number} alpha - alpha value [0-255]
 * @param {number} type - type of trace, calc is centering the line on the block
 * @param {number} lineWidth - width of the line
 */
function trace (x, y, z, red, green, blue, alpha, type, lineWidth) {
    if (type === "calc")
    {
        if (x >= 0) {
            x = parseFloat(x) + 0.5;
        } else {
            x = parseFloat(x) - 0.5;
        }
        if (z >= 0)
        {
            z = parseFloat(z) + 0.5;
        } else {
            z = parseFloat(z) - 0.5;
        }
    }
    if (Player.isSneaking())
        drawLine(Player.getRenderX(), Player.getRenderY() + 1.54, Player.getRenderZ(), x, y, z, red, green, blue, alpha, lineWidth)
    else
        drawLine(Player.getRenderX(), Player.getRenderY() + 1.62, Player.getRenderZ(), x, y, z, red, green, blue, alpha, lineWidth)
}

function drawLine (x1, y1, z1, x2, y2, z2, red, green, blue, alpha, lineWidth)
{
    GlStateManager.func_179112_b(770,771)
    GlStateManager.func_179147_l()
    GL11.glLineWidth(lineWidth)
    GlStateManager.func_179090_x()
    GlStateManager.func_179097_i()
    GlStateManager.func_179132_a(false)

    Tessellator.begin(GL11.GL_LINE_STRIP).colorize(red, green, blue, alpha)
    Tessellator.pos(x1, y1, z1).tex(0, 0)
    Tessellator.pos(x2, y2, z2).tex(0, 0)
    Tessellator.draw()

    GlStateManager.func_179098_w()
    GlStateManager.func_179126_j()
    GlStateManager.func_179132_a(true)
    GlStateManager.func_179084_k()
    GL11.glLineWidth(2);
}

function drawBox (x, y, z, wx, h, wz, r, g, b, a, phase, lineWidth = 1) {
    RenderLibV2.drawEspBoxV2(x, y, z, wx, h, wz, r, g, b, a, phase, lineWidth)
}

export default { trace, drawBox };