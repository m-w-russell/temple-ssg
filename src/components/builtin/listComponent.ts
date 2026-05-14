import { Component } from "../../component";
import { Template } from "../../template";

interface ListData {
    elements: string[]
    ordered: boolean
}

class ListComponent extends Component {
    data: ListData;
    template: (inputs: Record<string, any>) => string

    constructor(ordered?: boolean, elements?: string[]) {
        super()
        this.data = {
            ordered: (ordered != undefined) ? ordered : false,
            elements: (elements != undefined) ? elements : []
        }

        this.template = new Template()
            .fromText("<{{tag}}>{{elements}}</{{tag}}>")
            .make({tag: "", elements: []})
    }

    item(text: string) {
        this.data.elements.push(text);
        return this;
    }

    build() {
        const itemTemplate = new Template().fromText("<li>{{text}}</li>").make({text: ""})
        return this.template({
            tag: (this.data.ordered ? "ol" : "ul"),
            elements: this.data.elements.map((e) => {
                return itemTemplate({text: e})
            }).join("\n")
        })
    }
}

export {ListComponent}