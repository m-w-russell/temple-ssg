
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { Component } from "./component";
import { Template } from "./template";
import { StyleComponent } from "./components/builtin/styleComponent";
import type { Site } from "./site";
import { NavComponent } from "./components/builtin/navComponent";
import { Block } from "./block";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


interface PageConfig {
    templatePath: string,
    outputPath: string;
}

class Page extends Block {
    config: PageConfig = {
        templatePath: "./src/templates",
        outputPath: "./build"
    }

    pageName: string = "";
    displayName: string = "";

    elements: Component[] = [];
    header: Component[] = [];
    template = new Template()
        .fromInternalFile("page.html")
        .make({head: "", title: "", content: ""});

    head(cmp: Component) {
        this.header.push(cmp)
        return this;
    }

    override build() {
        console.log(`Building ${this.pageName}.html`)
        let out = "";
        this.elements.forEach((cmp) => {
            if (cmp.stylesheet) {
                if (cmp.isStylesheetExternal) {
                    this.userStyle(cmp.stylesheet); 
                } else {
                    this.style(cmp.stylesheet);
                }
            }
            out += cmp.build();
            out += "\n";
        });

        let hout = "";
        this.header.forEach((cmp) => {
            hout += cmp.build();
            hout += "\n";
        })
        const html = this.template({head: hout, title: this.displayName ? this.displayName : this.pageName ? this.pageName : "Temple" , content: out})

        writeFileSync(`${this.config.outputPath}/${this.pageName}.html`, html);
        
        const outputStylesDir = path.resolve(this.config.outputPath, "styles");
        if (!existsSync(outputStylesDir)) {
            mkdirSync(outputStylesDir, { recursive: true });
        }

        const internalStylesDir = path.resolve(__dirname, "templates", "styles");

        this.header.forEach((cmp) => {
        if (cmp.data.type === "style") {
            let sourceFile: string;
            if (cmp.data.isExternal) {
                sourceFile = path.resolve(process.cwd(), cmp.data.filename);
            } else {
                sourceFile = path.resolve(internalStylesDir, cmp.data.filename);
            }

            const destinationFile = path.resolve(outputStylesDir, path.basename(cmp.data.filename));

            if (existsSync(sourceFile)) {
                copyFileSync(sourceFile, destinationFile);
            } else {
                console.warn(`[Temple Warning] Stylesheet asset not found: ${sourceFile}`);
            }
        }
    });

        return html;
    }

    name(name: string) {
        this.pageName = name;
        return this;
    }

    display(name: string) {
        this.displayName = name;
        return this;
    }

    style(name: string) {
        const s = new StyleComponent(name, `styles`)
        this.head(s);
        return this;
    }

    nav(title: string, site: Site) {
        const n = new NavComponent(title, site)
        this.component(n);
        return this;
    }

    repeat<M extends keyof this>(elements: (this[M] extends (...args: any[]) => any ? Parameters<this[M]> : never)[], fn: M) {
        
        const method = this[fn];
        if (!(typeof method === "function")) {
            throw new Error(`Property ${String(fn)} is not a function.`)
        }
        
        elements.forEach((e) => {
            (method as Function).apply(this, e)
        })
        return this;
    }

    userStyle(relativePath: string) {
        const s = new StyleComponent(relativePath, `styles`, true);
        this.head(s);
        return this;
    }

}

export {Page}