import type { Template } from "./template";

abstract class Component {
    abstract template: Function;
    abstract data: Record<string, any>;

    stylesheet?: string;
    isStylesheetExternal: boolean = true; 

    constructor() {
    }

    abstract build(): string;

    style(name: string, isExternal: boolean = true) {
        this.stylesheet = name;
        this.isStylesheetExternal = isExternal;
    }
}

export { Component }
