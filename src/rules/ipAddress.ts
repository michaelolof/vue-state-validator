import { Validation } from "./index"


export const ipAddress = (value :any) :Validation => {

  const isIp = () => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);

  if(isIp()) return {
    isValid: true,
    rule: undefined
  }

  else return { isValid: false, rule: "ipAddress" }

}
