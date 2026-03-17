import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ZoomCanvasComponent } from '../../shared/zoom-canvas/zoom-canvas.component';
import {
  Graph,
  createDefaultGraph,
  addNode,
  addEdge,
  removeNode,
  bfsTraversal,
  dfsTraversal,
} from './graph.utils';

type TraversalType = 'bfs' | 'dfs' | null;

@Component({
  selector: 'ds-graph-visual',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterModule, MatIconModule, ZoomCanvasComponent],
  templateUrl: './graph-visual.component.html',
  styleUrl: './graph-visual.component.scss',
})
export class GraphVisualComponent {
  readonly graph = signal<Graph>(createDefaultGraph());
  readonly traversalResult = signal<string[]>([]);
  readonly highlightedNodes = signal<Set<string>>(new Set());
  readonly message = signal('');
  readonly activeTraversal = signal<TraversalType>(null);

  nodeInput = '';
  edgeFrom = '';
  edgeTo = '';

  readonly svgWidth = computed(() => {
    const xs = this.graph().nodes.map((n) => n.x);
    return xs.length ? Math.max(600, Math.max(...xs) + 80) : 600;
  });

  readonly svgHeight = computed(() => {
    const ys = this.graph().nodes.map((n) => n.y);
    return ys.length ? Math.max(400, Math.max(...ys) + 80) : 400;
  });

  readonly edgeLines = computed(() => {
    const g = this.graph();
    const nodeMap = new Map(g.nodes.map((n) => [n.id, n]));
    return g.edges
      .map((e) => ({ from: nodeMap.get(e.from), to: nodeMap.get(e.to) }))
      .filter((e) => e.from && e.to) as {
      from: { x: number; y: number };
      to: { x: number; y: number };
    }[];
  });

  addNode(): void {
    const id = this.nodeInput.trim().toUpperCase();
    if (!id) return;
    const before = this.graph().nodes.length;
    this.graph.update((g) => addNode(g, id));
    if (this.graph().nodes.length > before) {
      this.message.set(`Added node ${id}`);
    } else {
      this.message.set(`Node ${id} already exists`);
    }
    this.clearTraversal();
    this.nodeInput = '';
  }

  addEdge(): void {
    const from = this.edgeFrom.trim().toUpperCase();
    const to = this.edgeTo.trim().toUpperCase();
    if (!from || !to) return;
    const before = this.graph().edges.length;
    this.graph.update((g) => addEdge(g, from, to));
    if (this.graph().edges.length > before) {
      this.message.set(`Added edge ${from} → ${to}`);
    } else {
      this.message.set(`Edge ${from} → ${to} already exists or invalid`);
    }
    this.clearTraversal();
    this.edgeFrom = '';
    this.edgeTo = '';
  }

  removeNode(): void {
    const id = this.nodeInput.trim().toUpperCase();
    if (!id) return;
    this.graph.update((g) => removeNode(g, id));
    this.message.set(`Removed node ${id}`);
    this.clearTraversal();
    this.nodeInput = '';
  }

  runBfs(): void {
    const start = this.graph().nodes[0]?.id;
    if (!start) return;
    const result = bfsTraversal(this.graph(), start);
    this.setTraversal(result, 'bfs', `BFS from ${start}`);
  }

  runDfs(): void {
    const start = this.graph().nodes[0]?.id;
    if (!start) return;
    const result = dfsTraversal(this.graph(), start);
    this.setTraversal(result, 'dfs', `DFS from ${start}`);
  }

  reset(): void {
    this.graph.set(createDefaultGraph());
    this.clearTraversal();
    this.message.set('');
  }

  private setTraversal(
    result: string[],
    type: TraversalType,
    label: string,
  ): void {
    this.traversalResult.set(result);
    this.activeTraversal.set(type);
    this.highlightedNodes.set(new Set(result));
    this.message.set(`${label}: [${result.join(', ')}]`);
  }

  private clearTraversal(): void {
    this.traversalResult.set([]);
    this.activeTraversal.set(null);
    this.highlightedNodes.set(new Set());
  }
}
