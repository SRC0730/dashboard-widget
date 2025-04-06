import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TextOptions } from '../../interfaces/dashboard-config';
import { TextWidgetComponent } from './text-widget.component';

describe('TextWidgetComponent', () => {
  let component: TextWidgetComponent;
  let fixture: ComponentFixture<TextWidgetComponent>;

  // 準備測試數據
  const mockTextOptions: TextOptions = {
    content: '測試文本內容',
    color: '#FF0000',
    background: '#F0F0F0',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextWidgetComponent);
    component = fixture.componentInstance;

    // 設置輸入屬性
    component.options = mockTextOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive input options correctly', () => {
    expect(component.options).toBeDefined();
    expect(component.options).toEqual(mockTextOptions);
  });

  it('should display the correct text content', () => {
    const textWidgetElement = fixture.debugElement.query(
      By.css('.text-widget')
    );
    expect(textWidgetElement.nativeElement.textContent.trim()).toBe(
      mockTextOptions.content
    );
  });

  // Helper function to convert hex color to RGB array and compare with computed style
  const assertColorMatches = (
    element: HTMLElement,
    styleProperty: string,
    hexColor: string
  ) => {
    const rgbColor = window.getComputedStyle(element)[
      styleProperty as keyof CSSStyleDeclaration
    ] as string;
    const rgbValues = rgbColor.match(/\d+/g)!;
    const [red, green, blue] = rgbValues.map((val) => parseInt(val, 10));

    const hexWithoutHash = hexColor.replace('#', '');
    const expectedRed = parseInt(hexWithoutHash.slice(0, 2), 16);
    const expectedGreen = parseInt(hexWithoutHash.slice(2, 4), 16);
    const expectedBlue = parseInt(hexWithoutHash.slice(4, 6), 16);

    expect(red).toBeCloseTo(expectedRed, 0);
    expect(green).toBeCloseTo(expectedGreen, 0);
    expect(blue).toBeCloseTo(expectedBlue, 0);
  };

  it('should apply the correct text color', () => {
    const textWidgetElement = fixture.debugElement.query(
      By.css('.text-widget')
    );
    assertColorMatches(
      textWidgetElement.nativeElement,
      'color',
      mockTextOptions.color
    );
  });

  it('should apply the correct background color', () => {
    const textWidgetElement = fixture.debugElement.query(
      By.css('.text-widget')
    );
    assertColorMatches(
      textWidgetElement.nativeElement,
      'backgroundColor',
      mockTextOptions.background
    );
  });

  it('should update view when options change', () => {
    // 修改選項
    const updatedOptions: TextOptions = {
      content: '更新後的內容',
      color: '#00FF00',
      background: '#000000',
    };

    component.options = updatedOptions;
    fixture.detectChanges();

    const textWidgetElement = fixture.debugElement.query(
      By.css('.text-widget')
    );

    expect(textWidgetElement.nativeElement.textContent.trim()).toBe(
      updatedOptions.content
    );
    assertColorMatches(
      textWidgetElement.nativeElement,
      'color',
      updatedOptions.color
    );
    assertColorMatches(
      textWidgetElement.nativeElement,
      'backgroundColor',
      updatedOptions.background
    );
  });
});
