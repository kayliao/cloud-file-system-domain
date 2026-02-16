# 使用 Node 24 Alpine
FROM node:24-alpine

# 建立工作目錄
WORKDIR /app

# 複製 package.json 與 lockfile
COPY package.json package-lock.json* ./

# 安裝依賴
RUN npm install

# 全域安裝 TypeScript
RUN npm install -g typescript
RUN npm install -g http-server

# 複製專案檔案
COPY . .

# 編譯 TypeScript
# RUN tsc
RUN npm run build

# 進入容器後啟動 shell
# CMD ["node", "dist/main.js"]
CMD ["http-server", "dist", "-p", "8080", "-c-1"]
