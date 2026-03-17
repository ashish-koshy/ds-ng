import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ZoomCanvasComponent } from '../../shared/zoom-canvas/zoom-canvas.component';

@Component({
  selector: 'ds-queue-visual',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterModule, MatIconModule, ZoomCanvasComponent],
  templateUrl: './queue-visual.component.html',
  styleUrl: './queue-visual.component.scss',
})
export class QueueVisualComponent {
  readonly queue = signal<number[]>([5, 15, 25]);
  readonly highlightFront = signal(false);
  readonly highlightRear = signal(false);
  readonly message = signal('');

  inputValue = '';

  enqueue(): void {
    const val = parseInt(this.inputValue, 10);
    if (isNaN(val)) return;
    this.queue.update((q) => [...q, val]);
    this.message.set(`Enqueued ${val} at rear`);
    this.highlightRear.set(true);
    setTimeout(() => this.highlightRear.set(false), 1200);
    this.inputValue = '';
  }

  dequeue(): void {
    if (this.queue().length === 0) {
      this.message.set('Queue is empty!');
      return;
    }
    const val = this.queue()[0];
    this.queue.update((q) => q.slice(1));
    this.message.set(`Dequeued ${val} from front`);
  }

  front(): void {
    if (this.queue().length === 0) {
      this.message.set('Queue is empty!');
      return;
    }
    this.message.set(`Front is ${this.queue()[0]}`);
    this.highlightFront.set(true);
    setTimeout(() => this.highlightFront.set(false), 1200);
  }

  reset(): void {
    this.queue.set([5, 15, 25]);
    this.highlightFront.set(false);
    this.highlightRear.set(false);
    this.message.set('');
  }
}
