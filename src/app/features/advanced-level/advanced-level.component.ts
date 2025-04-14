import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '@components';
import { DashboardConfig, GridFilterField } from '@interfaces';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-advanced-level',
  standalone: true,
  imports: [DashboardComponent, FormsModule, DialogModule],
  templateUrl: './advanced-level.component.html',
  styleUrl: './advanced-level.component.scss',
})
export class AdvancedLevelComponent {
  showDialog = false;
  filterName = '';
  filterFields: GridFilterField[] = [];
  dashboardConfig: DashboardConfig = {
    widgets: [
      {
        id: 'grid1',
        title: 'Gird 1',
        type: 'grid',
        position: {
          left: 0,
          top: 0,
          width: 12,
          height: 3,
        },
        options: {
          headers: [
            { fieldId: 'name', displayText: 'User Name' },
            { fieldId: 'role', displayText: 'User Role' },
          ],
          data: [
            { name: 'Mike', role: 'Engineer' },
            { name: 'Jeff', role: 'Engineer' },
          ],
        },
      },
      {
        id: 'custom-widget-01',
        title: 'Super Gird 1',
        type: 'super-grid',
        position: {
          left: 0,
          top: 4,
          width: 5,
          height: 3,
        },
        options: {
          headers: [
            { fieldId: 'name', displayText: 'Name' },
            { fieldId: 'age', displayText: 'Age' },
          ],
          data: [
            { name: 'Mike', age: 38 },
            { name: 'Hao', age: 18 },
          ],
          sortColumns: ['age'],
        },
      },
    ],
  };

  txtConfig = JSON.stringify(this.dashboardConfig);

  onConfigChange() {
    try {
      JSON.parse(this.txtConfig);
    } catch (e) {
      alert('請輸入有效的 JSON 格式');
      return;
    }

    this.dashboardConfig = JSON.parse(this.txtConfig);
  }

  onFilterNameChange() {
    this.showDialog = false;

    // 如果 filterName 為空，清空 filterFields
    if (this.filterName === '') {
      this.filterFields = this.filterFields.filter(
        (filter) => filter.fieldId !== 'name'
      );
      return;
    }

    // 判斷filterFields 是否有 fieldId: 'name'
    const index = this.filterFields.findIndex(
      (filter) => filter.fieldId === 'name'
    );

    // 如果有，則更新 value
    if (index !== -1) {
      this.filterFields[index].value = this.filterName;
      return;
    }

    // 如果沒有，則新增一筆資料
    this.filterFields = [
      ...this.filterFields,
      { fieldId: 'name', value: this.filterName },
    ];
  }
}
