import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TextOptions } from '../../interfaces/dashboard-config';

@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss'],
})
export class TextWidgetComponent {
  @Input({ required: true }) options!: TextOptions;
}
