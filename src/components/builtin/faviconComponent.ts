import path from "node:path";
import { Component } from "../../component";
import { Template } from "../../template";
import { ImageComponent } from "./imageComponent";


class FaviconComponent extends ImageComponent {
    constructor(src: string, isUrl?: boolean) {
            super(src, isUrl)
            this.template = new Template()
                .fromText(`<link rel="icon" type="image/x-icon" href="/{{src}}" />`)
                .make({src: ""})
        }
}

export { FaviconComponent }