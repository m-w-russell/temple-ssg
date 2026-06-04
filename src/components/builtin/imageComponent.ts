import path from "node:path";
import { Component } from "../../component";
import { Template } from "../../template";



interface ImageData {
    src: string,
    isUrl: boolean,
    size?: Size 
}

class ImageComponent extends Component {
    data: ImageData;
    template: (inputs: Record<string, any>) => string;
    componentType: ComponentType = "ImageComponent";

    constructor(src: string, isUrl?: boolean, size?: Size) {
        super()
        this.data = {
            src: src,
            isUrl: (isUrl != undefined) ? isUrl : false
        }

        if (size != undefined) {
            this.data.size = size
        }

        this.template = new Template().fromInternalFile("image.html").make({src: "", width: "", height: ""})
    }

    build() {
        console.log(this.data.src);
        const args: Record<string, any> = {
            src: path.join("image", path.basename(this.data.src))
        }

        if (this.data.size != undefined) {
            args.width = this.data.size.width ? this.data.size.width : ""
            args.height = this.data.size.height ? this.data.size.height : ""
        }

        return this.template(args)
    }

}

export { ImageComponent }