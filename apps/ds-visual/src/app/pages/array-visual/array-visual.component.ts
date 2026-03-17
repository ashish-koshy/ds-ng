import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ZoomCanvasComponent } from '../../shared/zoom-canvas/zoom-canvas.component';

@Component({
  selector: 'ds-array-visual',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterModule, MatIconModule, ZoomCanvasComponent],
  templateUrl: './array-visual.component.html',
  styleUrl: './array-visual.component.scss',
})
export class ArrayVisualComponent {
  readonly array = signal<number[]>([10, 20, 30, 40, 50]);
  readonly highlightIndex = signal<number | null>(null);
  readonly message = signal<string>('');

  inputValue = '';
  inputIndex = '';

  push(): void {
    const val = parseInt(this.inputValue, 10);
    if (isNaN(val)) return;
    this.array.update((arr) => [...arr, val]);
    const idx = this.array().length - 1;
    this.flashIndex(idx, `Pushed ${val} at index ${idx}`);
    this.inputValue = '';
  }

  pop(): void {
    if (this.array().length === 0) {
      this.message.set('Array is empty!');
      return;
    }
    const removed = this.array()[this.array().length - 1];
    this.array.update((arr) => arr.slice(0, -1));
    this.message.set(`Popped ${removed}`);
  }

  insertAt(): void {
    const val = parseInt(this.inputValue, 10);
    const idx = parseInt(this.inputIndex, 10);
    if (isNaN(val) || isNaN(idx) || idx < 0 || idx > this.array().length) {
      this.message.set('Invalid value or index');
      return;
    }
    this.array.update((arr) => [...arr.slice(0, idx), val, ...arr.slice(idx)]);
    this.flashIndex(idx, `Inserted ${val} at index ${idx}`);
    this.inputValue = '';
    this.inputIndex = '';
  }

  removeAt(): void {
    const idx = parseInt(this.inputIndex, 10);
    if (isNaN(idx) || idx < 0 || idx >= this.array().length) {
      this.message.set('Invalid index');
      return;
    }
    const removed = this.array()[idx];
    this.array.update((arr) => arr.filter((_, i) => i !== idx));
    this.message.set(`Removed ${removed} from index ${idx}`);
    this.inputIndex = '';
  }

  reset(): void {
    this.array.set([10, 20, 30, 40, 50]);
    this.highlightIndex.set(null);
    this.message.set('');
  }

  private flashIndex(idx: number, msg: string): void {
    this.highlightIndex.set(idx);
    this.message.set(msg);
    setTimeout(() => this.highlightIndex.set(null), 1200);
  }
}
