import { File } from "../File.js";

export class TextFile extends File {

    constructor(
        name: string,
        size: number,
        createdAt: Date,
        private encoding: string
    ) {
        const ext = name.includes('.') ? name.split('.').pop() : 'txt';
        super(name, size, createdAt, ext);
        if (!this.extension) this.extension = 'txt';
    }

    print(indent: string = "", isLast: boolean = true): string {
        return `${indent}${isLast ? "└──" : "├──"} ${this.getFullName()} [純文字檔] (編碼: ${this.encoding}, 大小: ${this.formatSize()})`;
    }

    toXml(indentLevel: number = 0): string {
        const indent = " ".repeat(indentLevel * 2);
        const tag = this.getXmlTag();
        return `${indent}<${tag}>編碼: ${this.encoding}, 大小: ${this.formatSize()}</${tag}>\n`;
    }
}
