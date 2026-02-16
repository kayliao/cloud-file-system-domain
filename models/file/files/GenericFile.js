import { File } from "../File.js";
/**
 * GenericFile represents files that don't fit Image/Text/Word categories.
 * It still requires a name and createdAt timestamp.
 */
export class GenericFile extends File {
    constructor(name, size, createdAt, typeName = "generic") {
        const ext = name.includes('.') ? name.split('.').pop() : undefined;
        super(name, size, createdAt, ext);
        this.typeName = typeName;
        this.extension = ext;
    }
    print(indent = "", isLast = true) {
        return `${indent}${isLast ? "└──" : "├──"} ${this.getFullName()} [${this.typeName}, ${this.formatSize()}]`;
    }
    toXml(indentLevel = 0) {
        const indent = " ".repeat(indentLevel * 2);
        return `${indent}<file type="${this.typeName}" name="${this.getFullName()}" size="${this.getTotalSize()}" createdAt="${this.createdAt.toISOString()}" />\n`;
    }
}
