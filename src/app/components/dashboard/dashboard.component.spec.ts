import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DashboardConfig, GridOptions, TextOptions, Widget } from '@interfaces';
import { GridWidgetComponent } from '../grid-widget/grid-widget.component';
import { TextWidgetComponent } from '../text-widget/text-widget.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  // 模擬測試數據
  const mockGridWidget: Widget = {
    id: 'grid1',
    title: 'Grid Widget',
    type: 'grid',
    position: { left: 0, top: 0, width: 2, height: 2 },
    options: {
      headers: [{ fieldId: 'name', displayText: 'Name' }],
      data: [{ name: 'Test Item' }],
    } as GridOptions,
  };

  const mockTextWidget: Widget = {
    id: 'text1',
    title: 'Text Widget',
    type: 'text',
    position: { left: 2, top: 0, width: 1, height: 1 },
    options: {
      content: 'Test Content',
      color: '#000000',
      background: '#ffffff',
    } as TextOptions,
  };

  const mockConfig: DashboardConfig = {
    widgets: [mockGridWidget, mockTextWidget],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, GridWidgetComponent, TextWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // 提供模擬配置
    component.config = mockConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive and render the config with correct number of widgets', () => {
    // 檢查 config 是否正確綁定
    expect(component.config).toEqual(mockConfig);

    // 檢查是否呈現正確數量的 widgets
    const widgetElements = fixture.debugElement.queryAll(
      By.css('.widget-item')
    );
    expect(widgetElements.length).toBe(mockConfig.widgets.length);
  });

  it('should calculate the correct widget styles based on position', () => {
    const styles = component.getWidgetStyle(mockGridWidget);

    expect(styles['grid-column-start']).toBe(mockGridWidget.position.left + 1);
    expect(styles['grid-column-end']).toBe(
      mockGridWidget.position.left + mockGridWidget.position.width + 1
    );
    expect(styles['grid-row-start']).toBe(mockGridWidget.position.top + 1);
    expect(styles['grid-row-end']).toBe(
      mockGridWidget.position.top + mockGridWidget.position.height + 1
    );
  });

  it('should correctly translate grid options', () => {
    const gridOptions = component.translateGridOptions(mockGridWidget.options);

    expect(gridOptions).toBe(mockGridWidget.options as GridOptions);
    expect(gridOptions.headers).toBeDefined();
    expect(gridOptions.data).toBeDefined();
  });

  it('should correctly translate text options', () => {
    const textOptions = component.translateTextOptions(mockTextWidget.options);

    expect(textOptions).toBe(mockTextWidget.options as TextOptions);
    expect(textOptions.content).toBeDefined();
    expect(textOptions.color).toBeDefined();
    expect(textOptions.background).toBeDefined();
  });

  it('should render grid widget for type grid', () => {
    const gridWidgetDebug = fixture.debugElement.query(
      By.directive(GridWidgetComponent)
    );
    expect(gridWidgetDebug).toBeTruthy();
  });

  it('should render text widget for type text', () => {
    const textWidgetDebug = fixture.debugElement.query(
      By.directive(TextWidgetComponent)
    );
    expect(textWidgetDebug).toBeTruthy();
  });

  it('should display widget titles correctly', () => {
    const widgetTitles = fixture.debugElement.queryAll(
      By.css('.widget-header h3')
    );

    expect(widgetTitles[0].nativeElement.textContent).toContain(
      mockGridWidget.title
    );
    expect(widgetTitles[1].nativeElement.textContent).toContain(
      mockTextWidget.title
    );
  });

  it('should handle empty widgets array', () => {
    // 設置空 widgets 陣列
    component.config = { widgets: [] };
    fixture.detectChanges();

    const widgetElements = fixture.debugElement.queryAll(
      By.css('.widget-item')
    );
    expect(widgetElements.length).toBe(0);
  });
});
