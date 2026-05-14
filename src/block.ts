import { Component } from "./component";
import { NavComponent } from "./components/builtin/navComponent";
import { SectionComponent } from "./components/builtin/sectionComponent";
import { StyleComponent } from "./components/builtin/styleComponent";
import { TextComponent } from "./components/builtin/textComponent";
import { Site } from "./site";

abstract class Block {
    abstract elements: Component[];

    component(cmp: Component) {
        this.elements.push(cmp);
        return this;
    }

    title(text: string) {
        const t = new TextComponent("title")
        t.text(text);
        this.component(t);
        return this;
    }

    subtitle(text: string) {
        const t = new TextComponent("subtitle")
        t.text(text);
        this.component(t);
        return this;
    }

    paragraph(text: string) {
        const t = new TextComponent("paragraph")
        t.text(text);
        this.component(t);
        return this;
    }

    section(title: string) {
        const s = new SectionComponent(title);
        this.component(s)
        return this;
    }

    build() {
        let out = "";
        this.elements.forEach((cmp) => {
            out += cmp.build();
            out += "\n";
        });
        return out
    }


}

export { Block }