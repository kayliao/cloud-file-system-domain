import { File } from "../File.js";

export class WordFile extends File {

    constructor(name: string, size: number, createdAt: Date, private pageCount: number) {
        const ext = name.includes('.') ? name.split('.').pop() : 'docx';
        super(name, size, createdAt, ext);
        if (!this.extension) this.extension = 'docx';
    }

    print(indent: string = "", isLast: boolean = true): string {
        return `${indent}${isLast ? "└──" : "├──"} ${this.getFullName()} [Word 檔案] (頁數: ${this.pageCount}, 大小: ${this.formatSize()})`;
    }

    toXml(indentLevel: number = 0): string {
        const indent = " ".repeat(indentLevel * 2);
        const tag = this.getXmlTag();
        return `${indent}<${tag}>頁數: ${this.pageCount}, 大小: ${this.formatSize()}</${tag}>\n`;
    }
}
