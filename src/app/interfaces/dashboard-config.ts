/**
 * Dashboard 設定
 *
 * @export
 * @interface DashboardConfig
 */
export interface DashboardConfig {
  widgets: Widget[];
}

/**
 * Widget 設定
 *
 * @export
 * @interface Widget
 */
export interface Widget {
  /**
   * 唯一識別碼
   *
   * @type {string}
   * @memberof Widget
   */
  id: string;

  /**
   * 標題
   *
   * @type {string}
   * @memberof Widget
   */
  title: string;

  /**
   * 類型
   *
   * @type {('grid' | 'text')}
   * @memberof Widget
   */
  type: 'grid' | 'text';

  /**
   * 位置
   *
   * @type {WidgetPosition}
   * @memberof Widget
   */
  position: WidgetPosition;

  /**
   * 設定內容
   *
   * @type {(GridOptions | TextOptions)}
   * @memberof Widget
   */
  options: GridOptions | TextOptions;
}

/**
 * Widget 位置設定
 *
 * @export
 * @interface WidgetPosition
 */
export interface WidgetPosition {
  /**
   * X 軸座標
   *
   * @type {number}
   * @memberof WidgetPosition
   */
  left: number;

  /**
   * Y 軸座標
   *
   * @type {number}
   * @memberof WidgetPosition
   */
  top: number;

  /**
   * Widget 寬度 (佔幾個單位 columns)
   *
   * @type {number}
   * @memberof WidgetPosition
   */
  width: number;

  /**
   * Widget 高度 (佔幾個單位 rows)
   *
   * @type {number}
   * @memberof WidgetPosition
   */
  height: number;
}

/**
 * Grid 屬性
 *
 * @export
 * @interface GridOptions
 */
export interface GridOptions {
  /**
   * 表頭
   *
   * @type {GridHeader[]}
   * @memberof GridOptions
   */
  headers: GridHeader[];

  /**
   * 資料 (與表頭對應)
   *
   * @type {any[]}
   * @memberof GridOptions
   */
  data: any[];
}

/**
 * Text 屬性
 *
 * @export
 * @interface TextOptions
 */
export interface TextOptions {
  /**
   * 文字內容
   *
   * @type {string}
   * @memberof TextOptions
   */
  content: string;

  /**
   * 文字顏色
   *
   * @type {string}
   * @memberof TextOptions
   */
  color: string;

  /**
   * 文字背景顏色
   *
   * @type {string}
   * @memberof TextOptions
   */
  background: string;
}

/**
 * Grid 表頭
 *
 * @export
 * @interface GridHeader
 */
export interface GridHeader {
  /**
   * 欄位名稱
   *
   * @type {string}
   * @memberof GridHeader
   */
  fieldId: string;

  /**
   * 顯示文字
   *
   * @type {string}
   * @memberof GridHeader
   */
  displayText: string;
}
