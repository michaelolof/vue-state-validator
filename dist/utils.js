export function isControlKey(evt) {
    const code = evt.keyCode;
    return ((code === 8) ||
        (code === 9) ||
        (code >= 17 && code <= 20) ||
        (code >= 37 && code <= 40) ||
        (evt.ctrlKey || evt.altKey || evt.metaKey));
}
export function set(target, key, value) {
    if (constants.Vue) {
        constants.Vue.set(target, key, value);
    }
    else {
        target[key] = value;
    }
}
export const constants = {
    Vue: undefined
};
