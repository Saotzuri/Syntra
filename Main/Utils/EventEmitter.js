/**
 * ============================================
 * Simple Event Emitter
 * ============================================
 *
 * 🔧 Usage:
 *   - Register event listeners with `.on(eventName, callback)`.
 *   - Trigger events with `.emit(eventName, data)`.
 *
 * 💡 Purpose:
 *   Provides a minimalistic event system to handle and emit custom events.
 *   Allows multiple listeners per event and passing data to callbacks.
 */

export default {
    _listeners: {},

    /**
     * Register a callback for a specific event.
     * @param {string} event - Name of the event to listen for.
     * @param {function} callback - Function to call when event is emitted.
     */
    on(event, callback) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(callback);
    },

    /**
     * Emit an event and call all registered callbacks with optional data.
     * @param {string} event - Name of the event to emit.
     * @param {*} [data] - Optional data to pass to the callbacks.
     */
    emit(event, data) {
        if (this._listeners[event]) {
            this._listeners[event].forEach(callback => callback(data));
        }
    }
};
