# CloudFileSystem (TypeScript)

A small TypeScript domain model for a cloud-style file system. This project demonstrates:

- A simple domain model: `FileSystemItem`, `Directory`, `File` and concrete file types (`ImageFile`, `TextFile`, `WordFile`, `GenericFile`).
- Validation: names are required and each `File` requires a `createdAt` timestamp.
- Pretty `print()` output and XML export with the format used in this project.

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

## GitHub Pages

To publish this project to GitHub Pages you can build the repository and push the build output (e.g. `dist/` or `docs/`) to your `gh-pages` branch or configure the repository Pages settings to use `/docs` or the `gh-pages` branch. Example using `gh-pages` package (optional):

```bash
npm run build
npx gh-pages -d dist
```

## Next steps

- Convert tests to a test framework (Jest/Mocha) for better CI integration.
- Add a small CLI to generate sample XML or print outputs to stdout.
