export interface RuleReturn {
  hasError: boolean;
  errorCode?: string;
}

export type Rule = (value :any) => RuleReturn;

