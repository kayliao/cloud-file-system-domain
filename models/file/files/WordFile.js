import { File } from "../File.js";
export class WordFile extends File {
    constructor(name, size, createdAt, pageCount) {
        const ext = name.includes('.') ? name.split('.').pop() : 'docx';
        super(name, size, createdAt, ext);
        this.pageCount = pageCount;
        if (!this.extension)
            this.extension = 'docx';
    }
    print(indent = "", isLast = true) {
        return `${indent}${isLast ? "└──" : "├──"} ${this.getFullName()} [Word 檔案] (頁數: ${this.pageCount}, 大小: ${this.formatSize()})`;
    }
    toXml(indentLevel = 0) {
        const indent = " ".repeat(indentLevel * 2);
        const tag = this.getXmlTag();
        return `${indent}<${tag}>頁數: ${this.pageCount}, 大小: ${this.formatSize()}</${tag}>\n`;
    }
}
