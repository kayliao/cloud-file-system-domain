/**
 * Base class for all filesystem items (directories and files).
 * Ensures a name is provided for every item.
 */
export class FileSystemItem {
    /**
     * Create a new FileSystemItem.
     * @param name - the non-empty display name of the item
     * @throws Error when `name` is empty or not provided
     */
    constructor(name) {
        this.name = name;
        /** parent Directory when the item is added to a Directory (set by Directory.add) */
        this.parent = null;
        if (!name || name.toString().trim() === "") {
            throw new Error("FileSystemItem name is required and cannot be empty.");
        }
    }
}
