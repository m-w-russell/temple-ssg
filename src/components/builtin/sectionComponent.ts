import { Component } from "../../component";
import { Template } from "../../template";

interface SectionData {
    text: string
}

class SectionComponent extends Component {
    data: SectionData = {
        text: ""
    };

    constructor(title: string) {
        super()
        this.data = {
            text: title
        }
    }

    template = new
        Template()
        .fromText(`<h2>{{text}}</h2><hr/>`)
        .make(this.data)

    build() {
        return this.template(this.data)
    }
}

export { SectionComponent }