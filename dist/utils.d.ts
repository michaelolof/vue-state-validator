export declare function isControlKey(evt: any): boolean;
export declare function set(target: any, key: string, value: any): void;
export declare function unset(target: any, key: string): void;
export declare function toRegex(val: any): RegExp | undefined;
export declare function objectIsEmpty(obj: any): boolean;
export declare function objectHasProperty(obj: any, prop: string): boolean;
export declare function isEqual(value: any, other: any): boolean;
export declare const constants: {
    Vue: VueObj | undefined;
};
interface VueObj {
    set(target: any, key: string, value: any): void;
    delete(target: any, key: string): void;
}
export {};
//# sourceMappingURL=utils.d.ts.map