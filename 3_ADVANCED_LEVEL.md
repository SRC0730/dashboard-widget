# Advanced Level

## 整體架構的設計方向

### repo 架構

- dashboard 團隊
  
  dashboard-widget：<https://github.com/SRC0730/dashboard-widget>

- widget 團隊
  
  super-grid：<https://github.com/SRC0730/super-grid>
  
  (**有製作一頁 demo.html**)

### 說明

super-grid 輸出成 `web component` 形式，再由 dashboard 根據 widget.type 判斷載入該 component。

**補充**：先前僅有簡單如何在 html 載入 web component，這次實作比較缺乏實際運用經驗。

## 是否有想過其他解決方式？如果有請說明不同方式及優缺點

有，但因不同網頁框架整合的經驗較少，先前經驗大部分還是會傾向統一開發框架。

### 1. 統一開發框架

統一使用單一框架和工具，集中開發所有元件。

**優點**：

- 程式碼風格和架構一致性高
- 減少整合問題
- 較容易實現大方向發展

**缺點**：

- 缺乏自主性，可能影響技術創新。
- 不適應多團隊獨立開發情境
- 擴展性較差

### 2. iframe

每個 Widget 使用 iframe ，實現跨團隊開發的完全獨立性。

**優點**：

- 絕對的隔離性，避免 CSS 和 JavaScript 衝突
- 支援不同框架的 Widget 共存
- 安全性更高，特別是整合第三方內容時

**缺點**：

- parent 與 child component 之間資訊交換複雜度大幅增加
- 較耗使用者&伺服器記憶體和效能(成本高)
- 樣式較難統一
- RWD 整合性較差

### 3. Request & Response 加工處理 (ARR 反向代理)

類似 iframe 做法，補充最近我正在製作的 Chatbot，若公司各網站都需要載入這個 component，可透過 IIS 修改原本 response content，增加 Chatbot component DOM 片段，以不修改 source code 方式附加 component。

**優缺點**：與 iframe 差不多，以下為補充事項：

- 減少 parent site source code 維護成本，由 proxy 控制哪些 site 加入 response 內容。
- 較適合簡單的使用情境

## 請根據設計出來的架構嘗試回答題說明目中的「進階申論」問題

- dashboard 團隊如何與 widget 團隊進行溝通 (如元件溝通介面設計、widget 如何註冊進 dashboard 等)?

- 整體架構上是否可能有效能問題 (performance issue)，如果有預想到的問題，當真正發生時該如何優化?

- 如果遇到了效能問題，如何監控並證明問題來自 dashboard 開發團隊還是 widget 開發團隊?

- 原來的 grid widget 功能，希望能針對特定某個 column 呈現進行客製化，且 column 客製化也希望交由外部團隊開發；你會怎麼設計？

- 如果 widget 之間需要有互相溝通的需求，例如 super-grid widget 特定欄位排序後，所有 grid 和 super-grid widget 只要有相同名稱欄位都需要排序；你會怎麼設計？

- 任何其他想法或建議，自由發揮
