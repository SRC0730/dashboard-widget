# Entry Level

## 如何啟動執行整個專案

1. 開發環境
  
   - node：`18.19.1`
   - angular cli：`19.2.6`
   - angular：`19.2.5`

2. 安裝相依套件

   ```bash
   npm install
   ```

3. 啟動開發伺服器

   ```bash
   npm start
   ```

4. 開啟瀏覽器，瀏覽 `http://localhost:4200`（預設port）

## 如何驗證功能是否正確

1. 執行單元測試

   ```bash
   npm test
   ```

2. 驗證目標

   - 確認儀表板能正確顯示所有小工具
   - 測試 text-widget 顯示是否正確
   - 測試 grid-widget 顯示是否正確

3. 提供 textarea 切換 dashboardConfig 內容

## 簡易的專案架構說明

- **components**: 共用元件
  - **dashboard**: 儀表板 (dashboard) 元件
  - **grid-widget**: 表格類型 (grid) 元件
  - **text-widget**: 純文字顯示 (text) 元件
- **features**: 功能模組
  - **index**: 主頁面功能
- **interfaces**: 介面
  - **dashboard-config**: 儀表板 (dashboard) 設定介面
