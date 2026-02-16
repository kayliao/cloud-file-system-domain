import { Directory } from "./models/directory/Directory.js";
import { WordFile } from "./models/file/files/WordFile.js";
import { ImageFile } from "./models/file/files/ImageFile.js";
import { TextFile } from "./models/file/files/TextFile.js";
export function buildSample() {
    const root = new Directory("根目錄", "Root");
    const projectDocs = new Directory("專案文件", "Project_Docs");
    projectDocs.add(new WordFile("需求規格書", 500000, new Date("2025-02-01T10:00:00Z"), 15));
    projectDocs.add(new ImageFile("系統架構圖", 2000000, new Date("2025-02-02T12:00:00Z"), 1920, 1080));
    const personalNotes = new Directory("個人筆記", "Personal_Notes");
    personalNotes.add(new TextFile("待辦清單", 1000, new Date("2025-01-15T08:30:00Z"), "UTF-8"));
    const archive2025 = new Directory("2025備份", "Archive_2025");
    archive2025.add(new WordFile("舊會議記錄", 200000, new Date("2025-01-10T09:00:00Z"), 5));
    personalNotes.add(archive2025);
    root.add(projectDocs);
    root.add(personalNotes);
    root.add(new TextFile("README", 500, new Date("2025-01-01T00:00:00Z"), "ASCII"));
    return root;
}
