import { Component } from "../../component";
import { Template } from "../../template";

interface TextData {
    text: string
    type: TextType
}

class TextComponent extends Component {
    data: TextData = {
        text: "",
        type: "title"
    }

    template = new Template()
        .fromText("<{{tag}}>{{text}}</{{tag}}>")
        .make({tag: "", text: ""});

    constructor(type: TextType, text?: string) {
        super()
        this.data.type = type
        if (text) this.data.text = text;
    }
    

    

    build() {
        let tag = "";
        switch(this.data.type) {
            case "title":
                tag = "h1"
                break;
            case "paragraph":
                tag = "p"
                break;
            case "subtitle":
                tag = "h3"
                break;
            case "code":
                tag = "pre"
                break;
            default:
                tag = "p"
        }

        return this.template({tag: tag, text: this.data.text});
    }

    text(text: string) {
        this.data.text = text;
        return this;
    }

}

export { TextComponent }