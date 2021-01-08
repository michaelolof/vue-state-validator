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
export function unset(target, key) {
    if (!objectHasProperty(target, key))
        return;
    if (constants.Vue) {
        constants.Vue.delete(target, key);
    }
    else {
        delete target[key];
    }
}
export function toRegex(val) {
    try {
        const flags = val.replace(/.*\/([gimy]*)$/, '$1');
        const pattern = val.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
        return new RegExp(pattern, flags);
    }
    catch (_a) {
        return undefined;
    }
}
export function objectIsEmpty(obj) {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
}
export function objectHasProperty(obj, prop) {
    if (obj === undefined || obj === null)
        return false;
    const proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) && (!(prop in proto) || proto[prop] !== obj[prop]);
}
export const constants = {
    Vue: undefined
};
