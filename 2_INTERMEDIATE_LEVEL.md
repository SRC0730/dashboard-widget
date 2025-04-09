# Intermediate Level

## 題目

- 在儀錶板上增加一個 "Filter By Name" 按鈕，點擊後針對所有 grid 類型 widget 進行 filter
  - 只要針對 "type": "grid" 的 widget 進行 filter
  - 只要 filter 欄位設定內有 "fieldId": "name" 的即可，如果表格沒有 name 欄位，不需要 filter
  - 注意 :
    - filter 過程請勿更動原來的 JSON 內容，由 widget 內處理 filter 邏輯

## 新功能的設計方式

- 在元件新增 `filterFields` attribute，使用 Angular 的 `@Input` 在元件間傳遞過濾條件。
- 資料傳遞方式 (feature)`IntermediateLevelComponent` -> (component) `DashboardComponent` -> (component)`GridWidgetComponent`
- 在 `GridWidgetComponent` 實作介面呈現 data filter

## 是否有想過其他解決方式？如果有請說明不同方式及優缺點

### 1. dataService 實作

實作 filter 功能在 client side，透過 remoteService 實作 call api 取得資料後，元件再透過 dataService 去完成 GridWidget 的 filter 功能。

**優點**：

- 集中式資料管理，讓 filter 邏輯與 UI 元件解耦。
- 可重用性高，同一個 filter 邏輯可以被多個元件使用
- 更容易進行單元測試，因為 dataService 可以獨立測試。
- 符合單一職責原則 (SRP)，讓元件專注於呈現，dataService 專注於資料處理。

**缺點**：

- 增加了應用架構的複雜度
- 如果每個 widget 的 filter 邏輯差異較大，可能需要額外處理例外狀況。
- 狀態管理需要更謹慎規劃，避免不同元件間資料不同步的問題。
- 當元件數量增加時，需要確保 dataService 的效能不會造成瓶頸。

### 2. api 端實作

實作 filter 功能在 server side，前端只要將查詢條件帶入 api data 中。

**優點**：

- 降低前端邏輯複雜度，前端專注於呈現與互動。
- 減少前端資料處理負擔。
- 前端程式碼更簡潔，降低維護成本。

**缺點**：

- 增加後端負擔，需要處理更多查詢邏輯。
- 每次過濾條件變更都需要重新向伺服器請求資料，增加網路請求次數。
- 在網速低的環境下體驗較差，每次過濾都需要等待網路處理。
- 不適合需要即時過濾的場景
