import { FileSystemItem } from "../FileSystemItem.js";
import { File } from "../file/File.js";
/**
 * Represents a directory which can contain other directories and files.
 */
export class Directory extends FileSystemItem {
    /**
     * @param name - directory display name (required)
     * @param englishName - englishName is required for tagging/xml
     * @throws Error when either name or englishName are empty
     */
    constructor(name, englishName) {
        if (!englishName || englishName.toString().trim() === "") {
            throw new Error("Directory englishName is required and cannot be empty.");
        }
        super(name);
        this.englishName = englishName;
        this.children = [];
    }
    /**
     * Add a FileSystemItem (file or directory) as a child of this directory.
     * This will set the child's `parent` reference to this Directory.
     * @param item - the item to add
     * @throws Error when item has no name
     */
    add(item) {
        try {
            if (!item || !item.name)
                throw new Error("Cannot add an unnamed item to a Directory.");
            // assign parent so files are guaranteed to be inside a directory
            item.parent = this;
            this.children.push(item);
        }
        catch (err) {
            throw err;
        }
    }
    getTotalSize() {
        try {
            return this.children.reduce((acc, c) => acc + c.getTotalSize(), 0);
        }
        catch (err) {
            // defensive: if a child's size calculation fails, surface a helpful message
            throw new Error(`Failed to compute total size for directory ${this.name}: ${err}`);
        }
    }
    print(indent = "", isLast = true) {
        try {
            let line = "";
            // Determine label: root (no parent) shows no label; first-level children show [目錄]; deeper show [子目錄]
            const label = this.parent == null ? "" : (this.parent && this.parent.parent == null ? " [目錄]" : " [子目錄]");
            if (indent === "") {
                line = `${this.name} (${this.englishName})` + label;
            }
            else {
                line = `${indent}${isLast ? "└──" : "├──"} ${this.name} (${this.englishName})${label}`;
            }
            const newIndent = indent + (isLast ? "    " : "│   ");
            this.children.forEach((child, index) => {
                const last = index === this.children.length - 1;
                line += "\n" + child.print(newIndent, last);
            });
            return line;
        }
        catch (err) {
            throw new Error(`Failed to print directory ${this.name}: ${err}`);
        }
    }
    toXml(indentLevel = 0) {
        try {
            const indent = " ".repeat(indentLevel * 2);
            const tag = `${this.name}_${this.englishName}`;
            let xml = `${indent}<${tag}>\n`;
            this.children.forEach(child => {
                xml += child.toXml(indentLevel + 1);
            });
            xml += `${indent}</${tag}>\n`;
            return xml;
        }
        catch (err) {
            throw new Error(`Failed to build XML for directory ${this.name}: ${err}`);
        }
    }
    searchByExtension(ext, currentPath = "") {
        try {
            const result = [];
            const path = currentPath ? `${currentPath}/${this.name}` : this.name;
            this.children.forEach(c => {
                if (c instanceof Directory) {
                    result.push(...c.searchByExtension(ext, path));
                }
                else if (c instanceof File && c.extension === ext) {
                    // use getFullName when available to avoid double-extension
                    const full = typeof c.getFullName === 'function' ? c.getFullName() : `${c.name}.${c.extension}`;
                    result.push(`${path}/${full}`); // 回傳完整路徑
                }
            });
            return result;
        }
        catch (err) {
            throw new Error(`Failed to search by extension in directory ${this.name}: ${err}`);
        }
    }
}
