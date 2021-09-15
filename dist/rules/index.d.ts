export interface Validation {
    isValid: boolean;
    rule?: string;
}
export declare type Rule = (value: any) => Validation;
export declare const comparisonValue: (val: any) => number;
//# sourceMappingURL=index.d.ts.map