import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from '@components';
import { DashboardConfig } from '@interfaces';
import { IndexComponent } from './index.component';

// 創建 dashboard component 的模擬
class MockDashboardComponent {}

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  const defaultConfig: DashboardConfig = {
    widgets: [
      {
        id: 'grid1',
        title: '員工資料表',
        type: 'grid',
        position: {
          left: 0,
          top: 0,
          width: 8,
          height: 5,
        },
        options: {
          headers: [
            { fieldId: 'id', displayText: '編號' },
            { fieldId: 'name', displayText: '姓名' },
            { fieldId: 'department', displayText: '部門' },
            { fieldId: 'position', displayText: '職位' },
          ],
          data: [
            { id: 1, name: '張三', department: '研發部', position: '工程師' },
            {
              id: 2,
              name: '李四',
              department: '研發部',
              position: '資深工程師',
            },
            { id: 3, name: '王五', department: '市場部', position: '經理' },
          ],
        },
      },
      {
        id: 'text1',
        title: '部門公告',
        type: 'text',
        position: {
          left: 8,
          top: 0,
          width: 4,
          height: 3,
        },
        options: {
          content: '下週二進行季度檢討會議，請各部門準備相關資料。',
          color: '#333',
          background: '#f9f9f9',
        },
      },
      {
        id: 'text2',
        title: '重要提醒',
        type: 'text',
        position: {
          left: 8,
          top: 3,
          width: 4,
          height: 2,
        },
        options: {
          content: '本月目標已完成 75%',
          color: '#fff',
          background: '#28a745',
        },
      },
      {
        id: 'grid2',
        title: '專案進度表',
        type: 'grid',
        position: {
          left: 0,
          top: 5,
          width: 12,
          height: 4,
        },
        options: {
          headers: [
            { fieldId: 'project', displayText: '專案名稱' },
            { fieldId: 'leader', displayText: '負責人' },
            { fieldId: 'progress', displayText: '進度' },
            { fieldId: 'deadline', displayText: '截止日期' },
          ],
          data: [
            {
              project: '系統重構',
              leader: '張三',
              progress: '60%',
              deadline: '2023/06/30',
            },
            {
              project: '新功能開發',
              leader: '李四',
              progress: '45%',
              deadline: '2023/07/15',
            },
            {
              project: 'UI 優化',
              leader: '王五',
              progress: '90%',
              deadline: '2023/06/15',
            },
          ],
        },
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexComponent, FormsModule],
      // 使用模擬替換真實組件
      providers: [
        { provide: DashboardComponent, useClass: MockDashboardComponent },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default dashboard config', () => {
    // 檢查初始化的組態是否包含預期的小工具數量
    expect(component.dashboardConfig).toBeDefined();
    expect(component.dashboardConfig.widgets.length).toBe(4);
    expect(component.dashboardConfig.widgets[0].id).toBe('grid1');
    expect(component.dashboardConfig.widgets[1].id).toBe('text1');
  });

  it('should update txtConfig with stringified dashboardConfig', () => {
    // 檢查 txtConfig 是否正確地反映了 dashboardConfig
    expect(component.txtConfig).toBe(JSON.stringify(component.dashboardConfig));
  });

  it('should update dashboardConfig when changeConfig is called with valid JSON', () => {
    // 準備新的配置
    const newConfig: DashboardConfig = {
      widgets: [
        {
          id: 'new-widget',
          title: '測試小工具',
          type: 'text',
          position: { left: 0, top: 0, width: 6, height: 3 },
          options: { content: '測試內容', color: '#000', background: '#fff' },
        },
      ],
    };
    component.txtConfig = JSON.stringify(newConfig);

    // 調用方法
    component.changeConfig();

    // 驗證結果
    expect(component.dashboardConfig.widgets.length).toBe(1);
    expect(component.dashboardConfig.widgets[0].id).toBe('new-widget');
    expect(component.dashboardConfig.widgets[0].title).toBe('測試小工具');
  });

  it('should not update dashboardConfig when changeConfig is called with invalid JSON', () => {
    // 保存原始配置以便比較
    const originalConfig = JSON.parse(
      JSON.stringify(component.dashboardConfig)
    );

    // 設置無效的JSON
    component.txtConfig = '{invalid json}';

    // 模擬 window.alert
    spyOn(window, 'alert');

    // 調用方法
    component.changeConfig();

    // 驗證結果: 配置應該保持不變，alert 應該被調用
    expect(window.alert).toHaveBeenCalledWith('請輸入有效的 JSON 格式');
    expect(component.dashboardConfig).toEqual(originalConfig);
  });

  it('should call changeConfig when button is clicked', () => {
    // 間諜方法
    spyOn(component, 'changeConfig');

    // 找到按鈕並點擊
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    // 確認方法被調用
    expect(component.changeConfig).toHaveBeenCalled();
  });
});
