import { Page } from "./page"

class Site {
    pages: Page[] = []

    page() {
        const p = new Page();
        this.pages.push(p)
        return p
    }

    build() {
        this.pages.forEach((p) => {
            p.build();
        })
        console.log("Done!")
    }
}

export { Site }