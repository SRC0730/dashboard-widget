import { JsonPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '@components';
import { DashboardConfig } from '@interfaces';
import { DialogModule } from 'primeng/dialog';
import { IntermediateLevelComponent } from './intermediate-level.component';

describe('IntermediateLevelComponent', () => {
  let component: IntermediateLevelComponent;
  let fixture: ComponentFixture<IntermediateLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IntermediateLevelComponent,
        FormsModule,
        DialogModule,
        JsonPipe,
      ],
      // 建立模擬的 DashboardComponent
      providers: [
        {
          provide: DashboardComponent,
          useValue: jasmine.createSpyObj('DashboardComponent', ['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IntermediateLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.showDialog).toBeFalse();
    expect(component.filterName).toBe('');
    expect(component.filterFields).toEqual([]);
    expect(component.dashboardConfig).toBeDefined();
    expect(component.dashboardConfig.widgets.length).toBe(3);
    expect(component.txtConfig).toBe(JSON.stringify(component.dashboardConfig));
  });

  it('should update dashboardConfig when onConfigChange is called with valid JSON', () => {
    const newConfig: DashboardConfig = {
      widgets: [
        {
          id: 'test1',
          title: 'Test Widget',
          type: 'grid',
          position: { left: 0, top: 0, width: 6, height: 3 },
          options: {
            headers: [{ fieldId: 'test', displayText: 'Test' }],
            data: [{ test: 'value' }],
          },
        },
      ],
    };

    component.txtConfig = JSON.stringify(newConfig);
    component.onConfigChange();

    expect(component.dashboardConfig).toEqual(newConfig);
  });

  it('should handle invalid JSON in onConfigChange', () => {
    spyOn(window, 'alert');
    component.txtConfig = '{ invalid json }';
    component.onConfigChange();

    expect(window.alert).toHaveBeenCalledWith('請輸入有效的 JSON 格式');
  });

  it('should update existing filter when onFilterNameChange is called and filter exists', () => {
    component.filterFields = [{ fieldId: 'name', value: 'old name' }];
    component.filterName = 'new name';
    component.showDialog = true;

    component.onFilterNameChange();

    expect(component.filterFields.length).toBe(1);
    expect(component.filterFields[0]).toEqual({
      fieldId: 'name',
      value: 'new name',
    });
    expect(component.showDialog).toBeFalse();
  });

  it('should add new filter when onFilterNameChange is called and filter does not exist', () => {
    component.filterFields = [];
    component.filterName = 'test name';
    component.showDialog = true;

    component.onFilterNameChange();

    expect(component.filterFields.length).toBe(1);
    expect(component.filterFields[0]).toEqual({
      fieldId: 'name',
      value: 'test name',
    });
    expect(component.showDialog).toBeFalse();
  });
});
