import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridOptions } from '../../interfaces/dashboard-config';
import { GridWidgetComponent } from './grid-widget.component';

describe('GridWidgetComponent', () => {
  let component: GridWidgetComponent;
  let fixture: ComponentFixture<GridWidgetComponent>;

  // 測試用的默認 options 數據
  const mockGridOptions: GridOptions = {
    headers: [
      { fieldId: 'name', displayText: '姓名' },
      { fieldId: 'age', displayText: '年齡' },
      { fieldId: 'email', displayText: '電子郵件' },
    ],
    data: [
      { name: '張三', age: 30, email: 'zhang@example.com' },
      { name: '李四', age: 25, email: 'li@example.com' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridWidgetComponent);
    component = fixture.componentInstance;
    // 設置預設的 options
    component.options = mockGridOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept options input correctly', () => {
    expect(component.options).toBe(mockGridOptions);
    expect(component.options.headers.length).toBe(3);
    expect(component.options.data.length).toBe(2);
  });

  it('should update when options change', () => {
    const newMockOptions: GridOptions = {
      headers: [
        { fieldId: 'id', displayText: '編號' },
        { fieldId: 'title', displayText: '標題' },
      ],
      data: [
        { id: 1, title: '項目一' },
        { id: 2, title: '項目二' },
        { id: 3, title: '項目三' },
      ],
    };

    component.options = newMockOptions;
    fixture.detectChanges();

    expect(component.options).toBe(newMockOptions);
    expect(component.options.headers.length).toBe(2);
    expect(component.options.data.length).toBe(3);
  });

  it('should have headers with correct field IDs', () => {
    const headerIds = component.options.headers.map((h) => h.fieldId);
    expect(headerIds).toContain('name');
    expect(headerIds).toContain('age');
    expect(headerIds).toContain('email');
  });

  it('should have data with expected properties', () => {
    const firstDataItem = component.options.data[0];
    expect(firstDataItem.name).toBeDefined();
    expect(firstDataItem.age).toBeDefined();
    expect(firstDataItem.email).toBeDefined();
  });
});
