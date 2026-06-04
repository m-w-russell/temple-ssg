import type { Template } from "./template";

abstract class Component {
    abstract template: Function;
    abstract data: Record<string, any>;

    stylesheet?: string;
    isStylesheetExternal: boolean = true; 

    //TODO. This will become mandatory for 1.1.
    componentType?: ComponentType;

    constructor() {
    }

    abstract build(): string;

    style(name: string, isExternal: boolean = true) {
        this.stylesheet = name;
        this.isStylesheetExternal = isExternal;
    }
}

export { Component }
