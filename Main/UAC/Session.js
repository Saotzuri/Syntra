const mc = Client.getMinecraft();

function getSession() {
    return mc.func_110432_I().func_148254_d()
}

function getProxy() {
    return mc.func_110437_J()
}

export default { getSession, getProxy };