import { Component } from "../../component";
import type { Site } from "../../site";
import { Template } from "../../template";

interface NavData {
    title: string
    site: Site
}

class NavComponent extends Component {
    data: NavData;
    
    constructor(title: string, site: Site) {
        super()
        this.data = {
            title: title,
            site: site
        }
        this.style("nav.css", false);
    }

    template = new Template().fromInternalFile("nav.html").make({title: "", links: ""})

    

    build() {
        const pages = this.data.site.pages;
        let linkElement = new Template()
            .fromText(`<li class="navbar-link"><a href="{{link}}">{{title}}</a></li>`)
            .make({link: "", title: ""})
        
        let links = ""

        pages.forEach((page) => {
            links += linkElement({link: `${page.pageName}.html`, title: `${page.displayName !== "" ? page.displayName : page.pageName}`})
            links += `\n`
        })

        return this.template({title: this.data.title, links: links});
    }
}

export { NavComponent }