import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '@components';
import { DashboardConfig } from '@interfaces';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [DashboardComponent, FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  dashboardConfig: DashboardConfig = {
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

  txtConfig = JSON.stringify(this.dashboardConfig);

  changeConfig() {
    try {
      JSON.parse(this.txtConfig);
    } catch (e) {
      alert('請輸入有效的 JSON 格式');
      return;
    }

    this.dashboardConfig = JSON.parse(this.txtConfig);
  }
}
