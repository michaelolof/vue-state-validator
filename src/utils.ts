
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


export const constants = {
  Vue: undefined as VueObj | undefined
}


interface VueObj {
  set(target :any, key :string, value :any) :void
  delete(target :any, key :string) :void
}