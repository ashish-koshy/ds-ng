import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ds-zoom-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div
      class="canvas-viewport"
      #viewport
      (wheel)="onWheel($event)"
      (mousedown)="onMouseDown($event)"
    >
      <div class="canvas-pan" [style.transform]="panTransform()">
        <div class="canvas-zoom" [style.zoom]="scale()">
          <ng-content />
        </div>
      </div>
    </div>
    <div class="canvas-controls">
      <button class="ctrl-btn" (click)="zoomIn()" title="Zoom in">
        <mat-icon>add</mat-icon>
      </button>
      <span class="zoom-label">{{ zoomPercent() }}%</span>
      <button class="ctrl-btn" (click)="zoomOut()" title="Zoom out">
        <mat-icon>remove</mat-icon>
      </button>
      <button class="ctrl-btn" (click)="resetView()" title="Reset view">
        <mat-icon>center_focus_strong</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .canvas-viewport {
        width: 100%;
        height: 100%;
        overflow: hidden;
        cursor: grab;
        background: radial-gradient(circle, #2d3348 1px, transparent 1px);
        background-size: 24px 24px;

        &:active {
          cursor: grabbing;
        }
      }

      .canvas-pan {
        transform-origin: 0 0;
        display: inline-block;
      }

      .canvas-zoom {
        display: inline-block;
        padding: 60px;
      }

      .canvas-controls {
        position: absolute;
        bottom: 16px;
        right: 16px;
        display: flex;
        align-items: center;
        gap: 4px;
        background: #1e2330;
        border: 1px solid #2d3348;
        border-radius: 10px;
        padding: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        z-index: 10;
      }

      .ctrl-btn {
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        transition: background 0.15s;

        &:hover {
          background: #2d3348;
        }

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }

      .zoom-label {
        font-size: 11px;
        font-weight: 600;
        color: #94a3b8;
        min-width: 36px;
        text-align: center;
      }
    `,
  ],
})
export class ZoomCanvasComponent {
  private readonly viewport = viewChild<ElementRef<HTMLDivElement>>('viewport');

  readonly scale = signal(1);
  readonly panX = signal(0);
  readonly panY = signal(0);

  private panning = false;
  private lastX = 0;
  private lastY = 0;

  readonly panTransform = computed(
    () => `translate(${this.panX()}px, ${this.panY()}px)`,
  );

  readonly zoomPercent = computed(() => Math.round(this.scale() * 100));

  private static readonly MIN_SCALE = 0.2;
  private static readonly MAX_SCALE = 3;
  private static readonly ZOOM_STEP = 0.15;

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta =
      event.deltaY > 0
        ? -ZoomCanvasComponent.ZOOM_STEP
        : ZoomCanvasComponent.ZOOM_STEP;
    this.applyZoom(delta, event.clientX, event.clientY);
  }

  zoomIn(): void {
    this.applyZoomCenter(ZoomCanvasComponent.ZOOM_STEP);
  }

  zoomOut(): void {
    this.applyZoomCenter(-ZoomCanvasComponent.ZOOM_STEP);
  }

  resetView(): void {
    this.scale.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  onMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return;
    this.panning = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.panning) return;
    const dx = event.clientX - this.lastX;
    const dy = event.clientY - this.lastY;
    this.panX.update((x) => x + dx);
    this.panY.update((y) => y + dy);
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  @HostListener('window:mouseup')
  onMouseUp(): void {
    this.panning = false;
  }

  private applyZoom(delta: number, clientX: number, clientY: number): void {
    const el = this.viewport()?.nativeElement;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const oldScale = this.scale();
    const newScale = Math.min(
      ZoomCanvasComponent.MAX_SCALE,
      Math.max(ZoomCanvasComponent.MIN_SCALE, oldScale + delta),
    );

    // Zoom toward mouse cursor
    const ratio = newScale / oldScale;
    this.panX.update((px) => mouseX - ratio * (mouseX - px));
    this.panY.update((py) => mouseY - ratio * (mouseY - py));
    this.scale.set(newScale);
  }

  private applyZoomCenter(delta: number): void {
    const el = this.viewport()?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    this.applyZoom(
      delta,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
    );
  }
}
