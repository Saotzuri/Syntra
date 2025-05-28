// Import the Java threading library
const Threading = Java.type("gg.essential.api.utils.Multithreading");
export function delay(func, time) {
    if (time) {
        // Schedule the function to be executed after the specified delay.
        // The time value is converted to milliseconds using java.util.concurrent.TimeUnit.MILLISECONDS.
        Threading.schedule(() => { func() }, time, java.util.concurrent.TimeUnit.MILLISECONDS);
    } else {
        // Run the function asynchronously without any delay.
        Threading.runAsync(() => { func() });
    }
}

export default delay;