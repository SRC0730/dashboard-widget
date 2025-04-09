import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  DashboardConfig,
  GridFilterField,
  GridOptions,
  TextOptions,
  Widget,
} from '@interfaces';
import { GridWidgetComponent } from '../grid-widget/grid-widget.component';
import { TextWidgetComponent } from '../text-widget/text-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GridWidgetComponent, TextWidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @Input() filterFields: GridFilterField[] = [];
  @Input({ required: true }) config!: DashboardConfig;

  getWidgetStyle(widget: Widget): any {
    return {
      'grid-column-start': widget.position.left + 1,
      'grid-column-end': widget.position.left + widget.position.width + 1,
      'grid-row-start': widget.position.top + 1,
      'grid-row-end': widget.position.top + widget.position.height + 1,
    };
  }

  translateGridOptions(options: GridOptions | TextOptions): GridOptions {
    return options as GridOptions;
  }

  translateTextOptions(options: GridOptions | TextOptions): TextOptions {
    return options as TextOptions;
  }
}
