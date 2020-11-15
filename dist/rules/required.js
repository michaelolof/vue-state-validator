export function required(value) {
    if (isEmpty(value) || value == "0")
        return { isValid: false, rule: "required" };
    else
        return { isValid: true, rule: undefined };
}
export const isEmpty = (value) => {
    if (typeof value === "string")
        value = value.trim();
    if (value === undefined || value === null || value.length === 0 || objectIsEmpty(value)) {
        return true;
    }
    else
        return false;
};
function objectIsEmpty(obj) {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
}
