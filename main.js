import { buildSample } from "./sampleData.js";
import { Directory } from "./models/directory/Directory.js";
const root = buildSample();
export default root; // 前端可以 import
// ----------------------
// Node console 顯示
// ----------------------
console.log("=== 樹狀結構 ===");
console.log(root.print());
console.log("\n=== XML ===");
console.log(root.toXml());
console.log("\n=== 總容量 ===");
console.log(`${root.getTotalSize() / 1000} KB`);
console.log("\n=== 搜尋 .docx ===");
const results = root.searchByExtension("docx");
results.forEach(f => console.log(f));
// ----------------------
// 瀏覽器前端 DOM 顯示
// ----------------------
// 遞迴渲染目錄樹（每個目錄有容量按鈕）
function renderTree(dir, parentElement) {
    const div = document.createElement("div");
    div.style.marginLeft = "20px";
    const nameSpan = document.createElement("span");
    nameSpan.textContent = dir.name + " [目錄]";
    div.appendChild(nameSpan);
    const sizeBtn = document.createElement("button");
    sizeBtn.textContent = "總容量";
    sizeBtn.onclick = () => {
        alert(`${dir.name} 的總容量: ${dir.getTotalSize() / 1000} KB`);
    };
    div.appendChild(sizeBtn);
    dir.children.forEach((c) => {
        if (c instanceof Directory) {
            renderTree(c, div);
        }
        else {
            const fileDiv = document.createElement("div");
            fileDiv.style.marginLeft = "20px";
            fileDiv.textContent = c.name;
            div.appendChild(fileDiv);
        }
    });
    parentElement.appendChild(div);
}
// 初始化 DOM
if (typeof window !== "undefined") {
    const container = document.getElementById("treeContainer");
    if (container) {
        renderTree(root, container);
    }
    // ===== 保留你原本的按鈕功能 =====
    const output = document.getElementById("output");
    document.getElementById("showTree").onclick =
        () => output.textContent = root.print();
    document.getElementById("showXml").onclick =
        () => output.textContent = root.toXml();
    document.getElementById("calculateSize").onclick =
        () => output.textContent = `${root.getTotalSize() / 1000} KB`;
    document.getElementById("searchBtn").onclick = () => {
        // 取得輸入值並移除開頭的點號（如果有）
        let ext = document.getElementById("searchExt").value.trim();
        if (ext.startsWith('.'))
            ext = ext.slice(1);
        // 搜尋，取得完整路徑
        const files = root.searchByExtension(ext);
        // 顯示結果
        output.textContent = files.length > 0 ? files.join("\n") : "找不到檔案";
    };
}
