import { File } from "../File.js";
export class ImageFile extends File {
    constructor(name, size, createdAt, width, height) {
        // pass extension inferred from name when available, otherwise default to png
        const ext = name.includes('.') ? name.split('.').pop() : 'png';
        super(name, size, createdAt, ext);
        this.width = width;
        this.height = height;
        if (!this.extension)
            this.extension = 'png';
    }
    print(indent = "", isLast = true) {
        return `${indent}${isLast ? "└──" : "├──"} ${this.getFullName()} [圖片] (解析度: ${this.width}x${this.height}, 大小: ${this.formatSize()})`;
    }
    toXml(indentLevel = 0) {
        const indent = " ".repeat(indentLevel * 2);
        const tag = this.getXmlTag();
        return `${indent}<${tag}>解析度: ${this.width}x${this.height}, 大小: ${this.formatSize()}</${tag}>\n`;
    }
}
