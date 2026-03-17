import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ZoomCanvasComponent } from '../../shared/zoom-canvas/zoom-canvas.component';

@Component({
  selector: 'ds-stack-visual',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterModule, MatIconModule, ZoomCanvasComponent],
  templateUrl: './stack-visual.component.html',
  styleUrl: './stack-visual.component.scss',
})
export class StackVisualComponent {
  readonly stack = signal<number[]>([3, 7, 12]);
  readonly topHighlight = signal(false);
  readonly message = signal('');

  inputValue = '';

  push(): void {
    const val = parseInt(this.inputValue, 10);
    if (isNaN(val)) return;
    this.stack.update((s) => [...s, val]);
    this.flashTop(`Pushed ${val}`);
    this.inputValue = '';
  }

  pop(): void {
    if (this.stack().length === 0) {
      this.message.set('Stack underflow!');
      return;
    }
    const val = this.stack()[this.stack().length - 1];
    this.stack.update((s) => s.slice(0, -1));
    this.message.set(`Popped ${val}`);
  }

  peek(): void {
    if (this.stack().length === 0) {
      this.message.set('Stack is empty!');
      return;
    }
    const val = this.stack()[this.stack().length - 1];
    this.flashTop(`Top is ${val}`);
  }

  reset(): void {
    this.stack.set([3, 7, 12]);
    this.topHighlight.set(false);
    this.message.set('');
  }

  private flashTop(msg: string): void {
    this.topHighlight.set(true);
    this.message.set(msg);
    setTimeout(() => this.topHighlight.set(false), 1200);
  }
}
