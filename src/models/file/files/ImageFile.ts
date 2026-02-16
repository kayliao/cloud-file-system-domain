import { File } from "../File.js";

export class ImageFile extends File {

    constructor(name: string, size: number, createdAt: Date, private width: number, private height: number) {
        // pass extension inferred from name when available, otherwise default to png
        const ext = name.includes('.') ? name.split('.').pop() : 'png';
        super(name, size, createdAt, ext);
        if (!this.extension) this.extension = 'png';
    }

    print(indent: string = "", isLast: boolean = true): string {
        return `${indent}${isLast ? "└──" : "├──"} ${this.getFullName()} [圖片] (解析度: ${this.width}x${this.height}, 大小: ${this.formatSize()})`;
    }

    toXml(indentLevel: number = 0): string {
        const indent = " ".repeat(indentLevel * 2);
        const tag = this.getXmlTag();
        return `${indent}<${tag}>解析度: ${this.width}x${this.height}, 大小: ${this.formatSize()}</${tag}>\n`;
    }
}
