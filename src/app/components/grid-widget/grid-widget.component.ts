import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GridOptions } from '../../interfaces/dashboard-config';

@Component({
  selector: 'app-grid-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-widget.component.html',
  styleUrls: ['./grid-widget.component.scss'],
})
export class GridWidgetComponent {
  @Input({ required: true }) options!: GridOptions;
}
