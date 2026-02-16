import { File } from "../File.js";

/**
 * GenericFile represents files that don't fit Image/Text/Word categories.
 * It still requires a name and createdAt timestamp.
 */
export class GenericFile extends File {
    constructor(name: string, size: number, createdAt: Date, public typeName: string = "generic") {
        const ext = name.includes('.') ? name.split('.').pop() : undefined;
        super(name, size, createdAt, ext);
        this.extension = ext;
    }

    print(indent: string = "", isLast: boolean = true): string {
        return `${indent}${isLast ? "└──" : "├──"} ${this.getFullName()} [${this.typeName}, ${this.formatSize()}]`;
    }

    toXml(indentLevel: number = 0): string {
        const indent = " ".repeat(indentLevel * 2);
        return `${indent}<file type="${this.typeName}" name="${this.getFullName()}" size="${this.getTotalSize()}" createdAt="${this.createdAt.toISOString()}" />\n`;
    }
}
