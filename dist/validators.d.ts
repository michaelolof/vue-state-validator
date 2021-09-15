import { Rule } from "./rules/index";
interface Err {
    [x: string]: any;
    $isEmpty?: boolean;
    $isWrong?: boolean;
    $rule?: string;
}
export interface ValidatorOption {
    value: any;
    rules?: Rule | Rule[];
    validateIf?: boolean;
}
export interface MutatingValidatorOption {
    value: any;
    err: object;
    rules?: Rule | Rule[];
    validateIf?: boolean;
}
export declare function validate(options: ValidatorOption[]): boolean;
export declare function validateAndMutate(options: MutatingValidatorOption[]): boolean;
export declare function validateValue(value: any, rules: Rule[]): boolean;
export declare function validateFieldAndMutate(value: any, err: Err, rules: Rule[]): boolean;
export declare function invalidateMutatedField(target: object): void;
export {};
//# sourceMappingURL=validators.d.ts.map