# CloudFileSystem (TypeScript)

A small TypeScript domain model for a cloud-style file system. This project demonstrates:

- A simple domain model: `FileSystemItem`, `Directory`, `File` and concrete file types (`ImageFile`, `TextFile`, `WordFile`, `GenericFile`).
- Validation: `names` are required and each `File` requires a `createdAt` timestamp.
- Pretty `print()` output and XML export with the format used in this project.
- Functions include in this system: `Calculate Total Size of the Directory`, `Search by Extension` (both with or without . is acceptable), `XML Serialization`.
- Other than `ImageFile`, `TextFile`, `WordFile`, a `GenericFile` was also added for those uncategorized file type (Not use in the sample case).

## Project layout

- `src/models/` - domain models organized into `directory/`, `file/` and `file/files/` for concrete files.
- `src/sampleData.ts` - example data builder (uses `createdAt` values).
- `src/test/` - a small TypeScript test runner (`testDomain.ts`).
- `docs/diagram.puml` - PlantUML diagram for the domain model.

## Requirements

- Node.js (16+ recommended)
- npm

## Quick start

Install dev dependencies:
```bash
npm install
```

Run the quick TypeScript test runner:
```bash
npm test
```

Build (TypeScript compile):
```bash
npm run build
```

Run the compiled app (if you build to `dist`):
```bash
npm start
```

## Notes about model behavior

- Every `File` must be constructed with a `createdAt: Date`. The `File` base enforces this.
- Files should always be added to a `Directory` (via `Directory.add(...)`). `Directory.add` sets the child's `parent` property.
- `print()` produces a console tree using Chinese labels (`目錄` for first-level directories and `子目錄` for deeper directories) and localized file labels (`純文字檔`, `圖片`, `Word 檔案`).
- `toXml()` outputs compact tags like `<需求規格書_docx>...</需求規格書_docx>` matching the project's example format.

## PlantUML

See `docs/diagram.puml` for the domain model diagram you can paste into a PlantUML editor.
Below is the graph
<img width="921" height="539" alt="cloud-file-system-domain" src="https://github.com/user-attachments/assets/46431166-9022-4bd2-ac1e-47b9c48cdadb" />



## GitHub Pages

To publish this project to GitHub Pages using `gh-pages` package:

```bash
npm run build
npm run deploy
```
A mock page to review is here: https://kayliao.github.io/cloud-file-system-domain/

The image show the page. '顯示目錄樹', 'XML 輸出', '總容量', '搜尋副檔名' are buttons that can be push. The result output will be at 輸出結果。

Press the '總容量' at 目錄樹 (每個目錄可單獨計算容量) will show a notify of the size.

<img width="1729" height="1177" alt="image" src="https://github.com/user-attachments/assets/d378e3ea-5c33-44ea-8933-2288d829aaae" />

## Docker Image

To build the docker image and run:

```bash
docker build --no-cache -t cloudfilesystem-ts .
docker run -it --rm -p 8080:8080 cloudfilesystem-ts sh
```

You will can run to see the mock sample data result in the console by running:

```bash
npm start
```

<img width="1245" height="910" alt="image" src="https://github.com/user-attachments/assets/12b2a70b-ecb4-418b-bbe9-0c93eba39e73" />

Run below in the console can open a local static page to try:

```bash
npx http-server -p 8080 -c-1
# open at http://localhost:8080/dist/
```


