export function isControlKey(evt :any) :boolean {
  const code = evt.keyCode;

  return (
    (code === 8) || 
    (code === 9) || 
    (code >= 17 && code <= 20) || 
    (code >= 37 && code <= 40) || 
    (evt.ctrlKey || evt.altKey || evt.metaKey)
  )

}

export function set(target :any, key :string, value :any) {
  if(constants.Vue) {
    constants.Vue.set(target, key, value);
  }
  else {
    target[ key ] = value;
  }
}


export function unset(target :any, key :string) {

  if(!objectHasProperty(target, key)) return
  
  if(constants.Vue) {
    constants.Vue.delete(target, key);
  }
  else {
    delete target[ key ];
  }
}


export function toRegex(val :any) {
  try {
    const flags = val.replace(/.*\/([gimy]*)$/, '$1');
    const pattern = val.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
    return new RegExp(pattern, flags);
  }
  catch {
    return undefined;
  }
}


export function objectIsEmpty(obj :any) { 
  return (Object.keys(obj).length === 0 && obj.constructor === Object)
}


export function objectHasProperty(obj :any, prop :string) {
  if(obj === undefined || obj === null) return false;
  const proto = obj.__proto__ || obj.constructor.prototype;
  return (prop in obj) && (!(prop in proto) || proto[prop] !== obj[prop]);
}


export function isEqual(value: any, other: any) {

	// Get the value type
	const type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false do a basic equality check.
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) { 
    return value === other;
  }

	// Compare the length of the length of the two items
	const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	const compare = function (item1: any, item2: any) {

		// Get the object type
		const itemType = Object.prototype.toString.call(item1);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (let i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (const key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};


export const constants = {
  Vue: undefined as VueObj | undefined
}

interface VueObj {
  set(target :any, key :string, value :any) :void
  delete(target :any, key :string) :void
}