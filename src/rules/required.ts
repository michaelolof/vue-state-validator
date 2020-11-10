import { RuleReturn } from "./index";


export const required = (value :any) :RuleReturn => {
  let hasError = false;
  let errorCode = "empty";

  if( typeof value === "string" ) value = value.trim();

  if( value === undefined || value === null || value === 0 || value == "0" || value.length === 0 ) {
    return { hasError: true, errorCode };
  }

  if( value.length > 0 && value.trim().length === 0 ) {
    return {
      hasError: true,
      errorCode: "invalid",
    }
  }

  return { hasError, errorCode }
}
