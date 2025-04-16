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

`因無相關實作經驗，以下透過 ChatGPT 回答相關 QnA，供未來實作參考。`

### dashboard 團隊如何與 widget 團隊進行溝通 (如元件溝通介面設計、widget 如何註冊進 dashboard 等)?

在目前的 Web Component 架構下，我將採用以下方法進行跨團隊溝通：

1. **元件溝通介面設計**：
   - 建立共同維護的介面定義檔案，如現有的 `dashboard-config.ts`，明確定義 Widget 需符合的屬性和方法
   - 使用 Custom Events 機制實現 Dashboard 與 Widget 間的通訊，確保鬆散耦合
   - 採用「契約優先設計」(Contract-First Design)，提前確定雙方共同遵守的介面規範

2. **Widget 註冊機制**：
   - 建立 Widget Registry 服務，負責管理所有可用的 Widget
   - Widget 團隊需提供符合規範的 manifest 檔案，包含：
     - Widget 識別碼、名稱、描述
     - 必要資源的 URL (JS/CSS)
     - 支援的事件和接收的參數
   - 提供動態載入機制，透過 `import()` 或 `customElements.define()` 等方式註冊 Web Component

3. **開發工作流程**：
   - 共用 Widget 範本與開發指南，明確元件生命週期
   - 實作 Widget 測試框架，確保 Widget 在獨立環境和整合環境中皆能正常運作
   - 定期召開技術同步會議，調整介面規範及解決整合問題

### 整體架構上是否可能有效能問題 (performance issue)，如果有預想到的問題，當真正發生時該如何優化?

在目前基於 Web Component 的微前端架構中，可能的效能問題包括：

1. **資源載入效能問題**：
   - 問題：每個 Widget 獨立載入資源可能導致重複載入相同程式庫、增加 HTTP 請求
   - 優化方案：
     - 實作共用依賴管理機制，避免載入重複資源
     - 使用 HTTP/2 降低多請求影響
     - 建立資源預載入策略，優先載入關鍵 Widget
     - 採用漸進式載入，先顯示 Dashboard 框架，再非同步載入各 Widget

2. **DOM 渲染效能**：
   - 問題：大量 Widget 同時渲染可能造成頁面卡頓
   - 優化方案：
     - 實作虛擬滾動 (Virtual Scrolling)，僅渲染可視區域的 Widget
     - 採用優先級渲染策略，重要 Widget 先渲染
     - 使用 Web Workers 處理大量數據計算，避免阻塞主執行緒

3. **記憶體管理問題**：
   - 問題：Widget 生命週期管理不當可能造成記憶體洩漏
   - 優化方案：
     - 確保 Widget 正確實作 `disconnectedCallback()` 清理資源
     - 實作 Widget 池化 (Pooling) 機制，重用 Widget 實例
     - 定期檢測並釋放未使用的資源

4. **資料傳輸效能問題**：
   - 問題：大量或頻繁的 Widget 間通訊可能導致效能瓶頸
   - 優化方案：
     - 實作資料批次處理機制，減少事件觸發頻率
     - 使用 SharedWorker 或 IndexedDB 實現高效共享狀態
     - 採用變更偵測機制，只處理實際變更的資料

### 如何監控並證明問題來自 dashboard 開發團隊還是 widget 開發團隊?

建立全面的監控與效能追蹤系統：

1. **元件級效能指標收集**：
   - 為每個 Widget 和 Dashboard 核心實作自動化效能指標收集
   - 追蹤關鍵指標：初始化時間、渲染時間、記憶體使用量、事件處理延遲
   - 使用 `Performance API` 和自定義標記進行精確計時

2. **前端效能監控平台**：
   - 實作集中式監控儀表板，呈現各 Widget 和整體系統的效能指標
   - 整合 Web Vitals 等核心指標，測量使用者體驗
   - 設置自動化警報機制，當指標超出閾值時通知相關團隊

3. **問題歸屬判定流程**：
   - 透過效能瀑布圖 (Performance Waterfall) 分析載入順序與影響
   - 使用元件邊界追蹤，隔離各 Widget 對系統整體的影響
   - 建立可視化比較工具，對比不同版本中各元件效能變化

4. **共同責任與改善機制**：
   - 建立效能預算 (Performance Budget)，限制各元件資源使用上限
   - 開發效能測試套件，作為 PR 合併前的必要檢查項目
   - 定期進行聯合效能檢視會議，共同尋找最佳化機會

### 針對特定 column 客製化顯示的設計方案

為了支援特定 column 呈現客製化且允許外部團隊開發，我設計以下方案：

1. **自定義列渲染器框架**：
   - 擴展 Widget 介面，增加 `columnRenderers` 屬性，允許註冊自訂渲染器
   - 渲染器採用 Web Component 規範，可獨立開發與發佈
   - 每個渲染器需遵循標準介面，包含輸入資料格式和生命週期鉤子

2. **渲染器註冊與發現機制**：
   - 建立渲染器註冊服務，負責管理所有可用的列渲染器
   - 提供渲染器市集 (Marketplace)，外部團隊可發佈經審核的渲染器
   - 使用懶載入技術，僅當需要時才載入特定渲染器

3. **實作示例**：

   ```typescript
   // Column 渲染器介面
   export interface ColumnRenderer extends HTMLElement {
     // 接收資料並初始化渲染器
     setData(value: any, row: any, columnDef: GridHeader): void;
     
     // 渲染器生命週期鉤子
     onAttach(): void;
     onDetach(): void;
   }

   // 在 Grid 配置中使用
   export interface ExtendedGridHeader extends GridHeader {
     // 指定使用的渲染器名稱
     renderer?: string;
     // 渲染器額外配置
     rendererOptions?: Record<string, any>;
   }
   ```

4. **安全性與效能考量**：
   - 實作沙箱機制，限制外部渲染器的權限
   - 提供效能測試工具，確保渲染器不會影響整體系統效能
   - 建立版本管理與向後相容策略

### Widget 之間的溝通設計 (如 grid 排序同步)

為了實現 Widget 間的互相溝通，特別是 super-grid widget 排序後同步到相同欄位名稱的其他 grid，我設計以下方案：

1. **事件匯流排 (Event Bus) 機制**：
   - 建立集中式事件匯流排，作為所有 Widget 間通訊的中心
   - 基於發布/訂閱模式，解耦發送者與接收者
   - 支援事件過濾與轉換，允許 Widget 只接收關心的事件

2. **Widget 協調器 (Coordinator) 服務**：
   - 實作特定領域的協調器服務，如 `GridSynchronizationService`
   - 負責轉換、聚合事件並協調相關 Widget 的行為
   - 提供衝突解決機制，處理多個 Widget 同時發起的操作

3. **排序同步實作方案**：

   ```typescript
   // 在 Dashboard 層級實作
   class DashboardGridCoordinator {
     // 註冊所有網格 Widget
     registerGrid(gridId: string, gridApi: GridApi): void { /* ... */ }
     
     // 處理排序變更事件
     handleSortChange(sourceGridId: string, fieldName: string, sortDirection: 'asc' | 'desc'): void {
       // 對所有註冊的網格 (除了來源) 套用相同排序
       this.registeredGrids.forEach(grid => {
         if (grid.id !== sourceGridId && grid.hasColumn(fieldName)) {
           grid.applySort(fieldName, sortDirection);
         }
       });
     }
   }
   ```

4. **狀態持久化與載入**：
   - 實作狀態管理，保存與還原 Widget 狀態 (包含排序狀態)
   - 提供 URL 參數機制，允許透過 URL 共享特定的 Dashboard 狀態
   - 建立 Widget 狀態同步服務，確保各 Widget 狀態一致性

### 其他想法與建議

1. **微前端架構深化**：
   - 考慮採用 Module Federation 或 SystemJS 增強動態載入能力
   - 建立共享狀態管理機制，可考慮 Redux 或自訂觀察者模式
   - 實作流式 UI 更新，優先處理重要內容，提升使用者感知性能

2. **開發流程優化**：
   - 建立 Widget 開發套件 (SDK)，簡化第三方團隊開發流程
   - 提供本地模擬環境，允許 Widget 開發者在獨立環境測試
   - 自動化測試與發佈流程，縮短開發迭代週期

3. **擴展性考量**：
   - 設計支援動態主題切換的 Widget 樣式系統
   - 實作 Widget 的國際化 (i18n) 架構，支援多語言
   - 建立 Widget 權限管理，根據使用者角色顯示不同內容

4. **使用者體驗提升**：
   - 提供 Widget 間的拖放互動功能
   - 實作 Widget 個人化設定，讓使用者自訂 Dashboard 布局
   - 設計適應性 Dashboard，根據不同裝置自動調整佈局

5. **維運與監控建議**：
   - 整合 APM 工具，全面監控前端應用效能
   - 建立集中式錯誤追蹤機制，即時發現並解決問題
   - 設計漸進式功能推出機制，降低新功能對系統穩定性的風險
