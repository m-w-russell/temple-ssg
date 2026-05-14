import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

class Template {
    templateString = ""

    __filename = fileURLToPath(import.meta.url);
    __dirname = path.dirname(__filename);


    fromText(template: string) {
        this.templateString = template;
        return this;
    }

    fromFile(filename: string) {
        const projectPath = path.resolve(process.cwd(), filename);
        this.templateString = readFileSync(projectPath, 'utf8');
        return this;
    }

    fromInternalFile(filename: string) {
        const internalPath = path.resolve(__dirname, 'templates', filename);
        
        if (!existsSync(internalPath)) {
            throw new Error(`Temple Internal Template Missing: ${internalPath}`);
        }
        
        this.templateString = readFileSync(internalPath, 'utf8');
        return this;
    }
    
    make(vars: Record<string, any>) {
        const txt = this.templateString;
        return function(inputs: typeof vars) {
            let out = txt;
            Object.keys(inputs).forEach((key => {
                out = out.replaceAll(`{{${key}}}`, inputs[key])
            }));
            return out;
        }
    }

    
}

export {Template}