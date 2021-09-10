"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = exports.isEqual = exports.objectHasProperty = exports.objectIsEmpty = exports.toRegex = exports.unset = exports.set = exports.isControlKey = void 0;
function isControlKey(evt) {
    var code = evt.keyCode;
    return ((code === 8) ||
        (code === 9) ||
        (code >= 17 && code <= 20) ||
        (code >= 37 && code <= 40) ||
        (evt.ctrlKey || evt.altKey || evt.metaKey));
}
exports.isControlKey = isControlKey;
function set(target, key, value) {
    if (exports.constants.Vue) {
        exports.constants.Vue.set(target, key, value);
    }
    else {
        target[key] = value;
    }
}
exports.set = set;
function unset(target, key) {
    if (!objectHasProperty(target, key))
        return;
    if (exports.constants.Vue) {
        exports.constants.Vue.delete(target, key);
    }
    else {
        delete target[key];
    }
}
exports.unset = unset;
function toRegex(val) {
    try {
        var flags = val.replace(/.*\/([gimy]*)$/, '$1');
        var pattern = val.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
        return new RegExp(pattern, flags);
    }
    catch (_a) {
        return undefined;
    }
}
exports.toRegex = toRegex;
function objectIsEmpty(obj) {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
}
exports.objectIsEmpty = objectIsEmpty;
function objectHasProperty(obj, prop) {
    if (obj === undefined || obj === null)
        return false;
    var proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) && (!(prop in proto) || proto[prop] !== obj[prop]);
}
exports.objectHasProperty = objectHasProperty;
function isEqual(value, other) {
    // Get the value type
    var type = Object.prototype.toString.call(value);
    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other))
        return false;
    // If items are not an object or array, return false do a basic equality check.
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
        return value === other;
    }
    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen)
        return false;
    // Compare two items
    var compare = function (item1, item2) {
        // Get the object type
        var itemType = Object.prototype.toString.call(item1);
        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2))
                return false;
        }
        // Otherwise, do a simple comparison
        else {
            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2))
                return false;
            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString())
                    return false;
            }
            else {
                if (item1 !== item2)
                    return false;
            }
        }
    };
    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false)
                return false;
        }
    }
    else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false)
                    return false;
            }
        }
    }
    // If nothing failed, return true
    return true;
}
exports.isEqual = isEqual;
;
exports.constants = {
    Vue: undefined
};
