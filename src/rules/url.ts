import { Validation } from "./index"
import { isEmpty } from "./required";


export const url = (value :any) :Validation => {

  const isUrl = () => new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'
  ).test(value);

  if(isEmpty(value) || isUrl()) return {
    isValid: true,
    rule: undefined
  }

  else return { isValid: false, rule: "url" }

}