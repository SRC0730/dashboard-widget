import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import {
  DashboardConfig,
  GridFilterField,
  GridOptions,
  SuperGridOptions,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // 允許使用自定義元素（如 super-grid web component）
})
export class DashboardComponent implements OnInit {
  @Input() filterFields: GridFilterField[] = [];
  @Input({ required: true }) config!: DashboardConfig;

  ngOnInit() {
    this.loadSuperGridScripts();
  }

  // 載入 super-grid 相關檔案
  private loadSuperGridScripts() {
    // 載入 JavaScript 檔案
    const scriptElement = document.createElement('script');
    scriptElement.src = 'assets/super-grid/main.js';
    scriptElement.type = 'text/javascript';
    document.body.appendChild(scriptElement);

    // 載入 polyfills 檔案
    const polyfillsElement = document.createElement('script');
    polyfillsElement.src = 'assets/super-grid/polyfills.js';
    polyfillsElement.type = 'text/javascript';
    document.body.appendChild(polyfillsElement);

    // 載入 CSS 檔案
    const styleElement = document.createElement('link');
    styleElement.href = 'assets/super-grid/styles.css';
    styleElement.rel = 'stylesheet';
    document.head.appendChild(styleElement);
  }

  getWidgetStyle(widget: Widget): any {
    return {
      'grid-column-start': widget.position.left + 1,
      'grid-column-end': widget.position.left + widget.position.width + 1,
      'grid-row-start': widget.position.top + 1,
      'grid-row-end': widget.position.top + widget.position.height + 1,
    };
  }

  translateGridOptions(
    options: GridOptions | SuperGridOptions | TextOptions
  ): GridOptions {
    return options as GridOptions;
  }

  translateTextOptions(
    options: GridOptions | SuperGridOptions | TextOptions
  ): TextOptions {
    return options as TextOptions;
  }

  translateSuperGridOptions(
    options: GridOptions | SuperGridOptions | TextOptions
  ): SuperGridOptions {
    return options as SuperGridOptions;
  }
}
