/**
 * Base class for all filesystem items (directories and files).
 * Ensures a name is provided for every item.
 */
export abstract class FileSystemItem {
    /** parent Directory when the item is added to a Directory (set by Directory.add) */
    parent: any | null = null;

    /**
     * Create a new FileSystemItem.
     * @param name - the non-empty display name of the item
     * @throws Error when `name` is empty or not provided
     */
    constructor(public name: string) {
        if (!name || name.toString().trim() === "") {
            throw new Error("FileSystemItem name is required and cannot be empty.");
        }
    }

    abstract getTotalSize(): number;
    abstract print(indent?: string, isLast?: boolean): string;
    abstract toXml(indentLevel?: number): string;
}
