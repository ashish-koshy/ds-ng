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
  TreeNode,
  buildRenderNodes,
  buildTree,
  insert,
  bfs,
  inorder,
  postorder,
  preorder,
  RenderNode,
} from './tree.utils';

type Traversal = 'inorder' | 'preorder' | 'postorder' | 'bfs' | null;

@Component({
  selector: 'ds-tree-visual',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterModule, MatIconModule, ZoomCanvasComponent],
  templateUrl: './tree-visual.component.html',
  styleUrl: './tree-visual.component.scss',
})
export class TreeVisualComponent {
  readonly DEFAULT_VALUES = [50, 30, 70, 20, 40, 60, 80];

  readonly tree = signal<TreeNode | null>(buildTree(this.DEFAULT_VALUES));
  readonly traversalResult = signal<number[]>([]);
  readonly highlightedNodes = signal<Set<number>>(new Set());
  readonly message = signal('');
  readonly activeTraversal = signal<Traversal>(null);

  inputValue = '';

  readonly renderNodes = computed<RenderNode[]>(() => {
    const root = this.tree();
    if (!root) return [];
    return buildRenderNodes(root, 300, 40, 120, this.highlightedNodes());
  });

  readonly svgWidth = computed(() => {
    if (!this.renderNodes().length) return 600;
    const xs = this.renderNodes().map((n) => n.x);
    return Math.max(600, Math.max(...xs) + 60);
  });

  readonly svgHeight = computed(() => {
    if (!this.renderNodes().length) return 100;
    return Math.max(...this.renderNodes().map((n) => n.y)) + 60;
  });

  insertNode(): void {
    const val = parseInt(this.inputValue, 10);
    if (isNaN(val)) return;
    this.tree.update((t) => insert(t, val));
    this.clearTraversal();
    this.message.set(`Inserted ${val}`);
    this.inputValue = '';
  }

  runInorder(): void {
    const result = inorder(this.tree());
    this.setTraversal(result, 'inorder', 'Inorder (Left → Root → Right)');
  }

  runPreorder(): void {
    const result = preorder(this.tree());
    this.setTraversal(result, 'preorder', 'Preorder (Root → Left → Right)');
  }

  runPostorder(): void {
    const result = postorder(this.tree());
    this.setTraversal(result, 'postorder', 'Postorder (Left → Right → Root)');
  }

  runBfs(): void {
    const result = bfs(this.tree());
    this.setTraversal(result, 'bfs', 'BFS (Level Order)');
  }

  reset(): void {
    this.tree.set(buildTree(this.DEFAULT_VALUES));
    this.clearTraversal();
    this.message.set('');
  }

  private setTraversal(result: number[], type: Traversal, label: string): void {
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
