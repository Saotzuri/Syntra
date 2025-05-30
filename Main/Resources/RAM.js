const Runtime = Java.type("java.lang.Runtime");

function getMemoryUsageMB() {
    const runtime = Runtime.getRuntime();
    const totalMem = runtime.totalMemory() / 1024 / 1024;
    const freeMem = runtime.freeMemory() / 1024 / 1024;
    const max = runtime.maxMemory() / 1024 / 1024;
    const used = totalMem - freeMem;
    const free = max - used;
    return {
        total: Math.round(max),
        used: Math.round(used),
        free: Math.round(free),
    };
}

export default { 
    getMemoryUsageMB,
    getTotalMemoryMB: () => getMemoryUsageMB().total,
    getUsedMemoryMB: () => getMemoryUsageMB().used,
    getFreeMemoryMB: () => getMemoryUsageMB().free,
    getMaxMemoryMB: () => Runtime.getRuntime().maxMemory() / 1024 / 1024,
    getMemoryPercentage: () => {
        const memory = getMemoryUsageMB();
        return Math.round((memory.used / memory.total) * 100);
    }
};