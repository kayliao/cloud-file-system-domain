import { FileSystemItem } from "../FileSystemItem.js";

/**
 * Abstract File class, representing files inside directories.
 * All files must provide a creation time (`createdAt`) when constructed.
 */
export abstract class File extends FileSystemItem {
    /** optional extension string provided by concrete file types */
    extension?: string;

    /** parent directory reference is set when the file is added to a Directory */
    parent: any | null = null;

    /**
     * @param name - required file name (validated by FileSystemItem)
     * @param sizeInBytes - file size in bytes
     * @param createdAt - Date when the file was created (required)
     * @param extension - optional file extension (e.g. "txt")
     */
    constructor(name: string, protected sizeInBytes: number, public createdAt: Date, extension?: string) {
        super(name);
        if (!createdAt || !(createdAt instanceof Date)) {
            throw new Error("File createdAt must be a Date and is required.");
        }
        if (extension) this.extension = extension;
    }

    /** Returns total size for this file (defaults to its own size) */
    getTotalSize(): number {
        try {
            return this.sizeInBytes;
        } catch (err) {
            throw new Error(`Failed to get total size for file ${this.name}: ${err}`);
        }
    }

    /** Basic print representation (can be extended by subclasses) */
    print(indent: string = "", isLast: boolean = true): string {
        try {
            return `${indent}${isLast ? "└──" : "├──"} ${this.name}`;
        } catch (err) {
            throw new Error(`Failed to print file ${this.name}: ${err}`);
        }
    }

    /** Default XML node for the file */
    toXml(indentLevel: number = 0): string {
        try {
            const indent = " ".repeat(indentLevel * 2);
            return `${indent}<${this.name} size="${this.sizeInBytes}" createdAt="${this.createdAt.toISOString()}" />\n`;
        } catch (err) {
            throw new Error(`Failed to create XML for file ${this.name}: ${err}`);
        }
    }

    /** Set parent Directory reference after adding to a directory */
    setParent(dir: any) {
        this.parent = dir;
    }

    /** Format bytes into a human readable string */
    protected formatSize(): string {
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

    protected getFullName(): string {
        const base = this.name.replace(/\.[^/.]+$/, "");
        if (this.extension) return `${base}.${this.extension}`;
        return this.name;
    }

    protected getXmlTag(): string {
        const base = this.name.replace(/\.[^/.]+$/, "");
        return this.extension ? `${base}_${this.extension}` : base;
    }
}
