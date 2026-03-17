import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ZoomCanvasComponent } from '../../shared/zoom-canvas/zoom-canvas.component';

@Component({
  selector: 'ds-linked-list-visual',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterModule, MatIconModule, ZoomCanvasComponent],
  templateUrl: './linked-list-visual.component.html',
  styleUrl: './linked-list-visual.component.scss',
})
export class LinkedListVisualComponent {
  readonly list = signal<number[]>([1, 2, 3, 4]);
  readonly highlightIndex = signal<number | null>(null);
  readonly message = signal('');

  inputValue = '';

  prepend(): void {
    const val = parseInt(this.inputValue, 10);
    if (isNaN(val)) return;
    this.list.update((l) => [val, ...l]);
    this.flashIndex(0, `Prepended ${val} at head`);
    this.inputValue = '';
  }

  append(): void {
    const val = parseInt(this.inputValue, 10);
    if (isNaN(val)) return;
    this.list.update((l) => [...l, val]);
    this.flashIndex(this.list().length - 1, `Appended ${val} at tail`);
    this.inputValue = '';
  }

  removeHead(): void {
    if (this.list().length === 0) {
      this.message.set('List is empty!');
      return;
    }
    const val = this.list()[0];
    this.list.update((l) => l.slice(1));
    this.message.set(`Removed head: ${val}`);
  }

  removeTail(): void {
    if (this.list().length === 0) {
      this.message.set('List is empty!');
      return;
    }
    const val = this.list()[this.list().length - 1];
    this.list.update((l) => l.slice(0, -1));
    this.message.set(`Removed tail: ${val}`);
  }

  reverse(): void {
    this.list.update((l) => [...l].reverse());
    this.message.set('List reversed');
  }

  reset(): void {
    this.list.set([1, 2, 3, 4]);
    this.highlightIndex.set(null);
    this.message.set('');
  }

  private flashIndex(idx: number, msg: string): void {
    this.highlightIndex.set(idx);
    this.message.set(msg);
    setTimeout(() => this.highlightIndex.set(null), 1200);
  }
}
