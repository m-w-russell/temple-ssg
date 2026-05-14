import { rmSync, existsSync, mkdirSync } from "node:fs";


class Temple {
    init() {
        rmSync("build", { recursive: true, force: true })
        
        if (!existsSync("build")){
            mkdirSync("build");
        }
    }
}

export { Temple }
// Core Framework API
export { Site } from './site'
export { Page } from './page'
export { Block } from './block'

// Built-in Library Core Components
export { NavComponent } from './components/builtin/navComponent'
export { SectionComponent } from './components/builtin/sectionComponent'
export { StyleComponent } from './components/builtin/styleComponent'
export { TextComponent } from './components/builtin/textComponent'

//Useful for building your own components
export { Component } from './component'
export { Template } from './template'