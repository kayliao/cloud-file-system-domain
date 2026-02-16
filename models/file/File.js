import { FileSystemItem } from "../FileSystemItem.js";
/**
 * Abstract File class, representing files inside directories.
 * All files must provide a creation time (`createdAt`) when constructed.
 */
export class File extends FileSystemItem {
    /**
     * @param name - required file name (validated by FileSystemItem)
     * @param sizeInBytes - file size in bytes
     * @param createdAt - Date when the file was created (required)
     * @param extension - optional file extension (e.g. "txt")
     */
    constructor(name, sizeInBytes, createdAt, extension) {
        super(name);
        this.sizeInBytes = sizeInBytes;
        this.createdAt = createdAt;
        /** parent directory reference is set when the file is added to a Directory */
        this.parent = null;
        if (!createdAt || !(createdAt instanceof Date)) {
            throw new Error("File createdAt must be a Date and is required.");
        }
        if (extension)
            this.extension = extension;
    }
    /** Returns total size for this file (defaults to its own size) */
    getTotalSize() {
        try {
            return this.sizeInBytes;
        }
        catch (err) {
            throw new Error(`Failed to get total size for file ${this.name}: ${err}`);
        }
    }
    /** Basic print representation (can be extended by subclasses) */
    print(indent = "", isLast = true) {
        try {
            return `${indent}${isLast ? "└──" : "├──"} ${this.name}`;
        }
        catch (err) {
            throw new Error(`Failed to print file ${this.name}: ${err}`);
        }
    }
    /** Default XML node for the file */
    toXml(indentLevel = 0) {
        try {
            const indent = " ".repeat(indentLevel * 2);
            return `${indent}<${this.name} size="${this.sizeInBytes}" createdAt="${this.createdAt.toISOString()}" />\n`;
        }
        catch (err) {
            throw new Error(`Failed to create XML for file ${this.name}: ${err}`);
        }
    }
    /** Set parent Directory reference after adding to a directory */
    setParent(dir) {
        this.parent = dir;
    }
    /** Format bytes into a human readable string */
    formatSize() {
        const MB = 1000 * 1000;
        const KB = 1000;
        if (this.sizeInBytes >= MB) {
            const val = this.sizeInBytes / MB;
            return Number.isInteger(val) ? `${val}MB` : `${val.toFixed(2)}MB`;
        }
        if (this.sizeInBytes >= KB) {
            const val = this.sizeInBytes / KB;
            return Number.isInteger(val) ? `${val}KB` : `${val.toFixed(2)}KB`;
        }
        return `${this.sizeInBytes}B`;
    }
    getFullName() {
        const base = this.name.replace(/\.[^/.]+$/, "");
        if (this.extension)
            return `${base}.${this.extension}`;
        return this.name;
    }
    getXmlTag() {
        const base = this.name.replace(/\.[^/.]+$/, "");
        return this.extension ? `${base}_${this.extension}` : base;
    }
}
