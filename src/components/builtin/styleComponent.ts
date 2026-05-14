import path from "node:path";
import { Component } from "../../component";
import { Template } from "../../template";

interface StyleData {
    filename: string;
    destinationFolder: string;
    type: string;
    isExternal: boolean;
}

class StyleComponent extends Component {
    data: StyleData = {
        filename: "",
        destinationFolder: "",
        type: "style",
        isExternal: false 
    }

    constructor(name: string, destination: string, isExternal = false) {
        super();
        this.data.filename = name;
        this.data.destinationFolder = destination;
        this.data.isExternal = isExternal;
    }

    template = new Template()
                    .fromText(`<link rel="stylesheet" href="{{path}}/{{name}}" />`)
                    .make({path: "", name: ""})
    
    build(): string {
        return this.template({path: this.data.destinationFolder, name: path.basename(this.data.filename)});
    }
}

export { StyleComponent }
