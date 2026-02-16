import { File } from "../File.js";
export class TextFile extends File {
    constructor(name, size, createdAt, encoding) {
        const ext = name.includes('.') ? name.split('.').pop() : 'txt';
        super(name, size, createdAt, ext);
        this.encoding = encoding;
        if (!this.extension)
            this.extension = 'txt';
    }
    print(indent = "", isLast = true) {
        return `${indent}${isLast ? "└──" : "├──"} ${this.getFullName()} [純文字檔] (編碼: ${this.encoding}, 大小: ${this.formatSize()})`;
    }
    toXml(indentLevel = 0) {
        const indent = " ".repeat(indentLevel * 2);
        const tag = this.getXmlTag();
        return `${indent}<${tag}>編碼: ${this.encoding}, 大小: ${this.formatSize()}</${tag}>\n`;
    }
}
