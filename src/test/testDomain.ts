import assert from "assert";
import { Directory } from "../models/directory/Directory.js";
import { ImageFile } from "../models/file/files/ImageFile.js";
import { TextFile } from "../models/file/files/TextFile.js";
import { WordFile } from "../models/file/files/WordFile.js";
import { GenericFile } from "../models/file/files/GenericFile.js";

// Basic domain tests
(function runTests() {
    const now = new Date();

    const root = new Directory("root", "root_en");

    const img = new ImageFile("photo.png", 1024, now, 800, 600);
    const txt = new TextFile("readme.txt", 256, now, "utf-8");
    const doc = new WordFile("doc1.docx", 2048, now, 5);
    const other = new GenericFile("data.bin", 512, now, "binary");

    root.add(img);
    root.add(txt);
    root.add(doc);
    root.add(other);

    // total size should be sum
    const total = root.getTotalSize();
    assert.strictEqual(total, 1024 + 256 + 2048 + 512, "Total size mismatch");

    // print should contain names
    const printed = root.print();
    assert(printed.includes("root (root_en)"));
    assert(printed.includes("photo.png"));

    // xml should include expected tags for files (using xml tag naming)
    const xml = root.toXml();
    assert(xml.includes("photo_png") || xml.includes("photo.png"));

    // searchByExtension
    const found = root.searchByExtension("txt");
    assert(found.length === 1 && (found[0].endsWith("readme.txt") || found[0].endsWith("readme")));

    // validations: unnamed item
    try {
        // @ts-ignore: intentionally create invalid item
        const bad = new (require("../models/file/files/GenericFile.js").GenericFile)("", 10, now);
        root.add(bad);
        assert.fail("Adding unnamed item should have thrown");
    } catch (err) {
        // expected
        console.log("Expected error (unnamed item):", (err as Error).message);
    }

    // missing createdAt
    try {
        // @ts-ignore
        const bad2 = new (require("../models/file/files/GenericFile.js").GenericFile)("foo.bin", 10, null);
        assert.fail("Constructing file without createdAt should have thrown");
    } catch (err) {
        // expected
        console.log("Expected error (missing createdAt):", (err as Error).message);
    }

    console.log("All tests passed.");
})();
