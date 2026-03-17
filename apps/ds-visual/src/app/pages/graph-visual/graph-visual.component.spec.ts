import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GraphVisualComponent } from './graph-visual.component';
import {
  createDefaultGraph,
  addNode,
  addEdge,
  removeNode,
  bfsTraversal,
  dfsTraversal,
} from './graph.utils';

describe('GraphVisualComponent', () => {
  let component: GraphVisualComponent;
  let fixture: ComponentFixture<GraphVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphVisualComponent, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(GraphVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should initialize with default graph', () => {
    expect(component.graph().nodes.length).toBe(6);
    expect(component.graph().edges.length).toBe(6);
  });

  describe('addNode', () => {
    it('should add a new node', () => {
      component.nodeInput = 'G';
      component.addNode();
      expect(component.graph().nodes.some((n) => n.id === 'G')).toBe(true);
    });

    it('should not add duplicate node', () => {
      const before = component.graph().nodes.length;
      component.nodeInput = 'A';
      component.addNode();
      expect(component.graph().nodes.length).toBe(before);
    });
  });

  describe('addEdge', () => {
    it('should add a new edge', () => {
      const before = component.graph().edges.length;
      component.edgeFrom = 'D';
      component.edgeTo = 'F';
      component.addEdge();
      expect(component.graph().edges.length).toBe(before + 1);
    });
  });

  describe('removeNode', () => {
    it('should remove node and its edges', () => {
      component.nodeInput = 'B';
      component.removeNode();
      expect(component.graph().nodes.some((n) => n.id === 'B')).toBe(false);
      expect(
        component.graph().edges.some((e) => e.from === 'B' || e.to === 'B'),
      ).toBe(false);
    });
  });

  describe('traversals', () => {
    it('BFS should visit all connected nodes', () => {
      component.runBfs();
      expect(component.traversalResult().length).toBe(6);
      expect(component.traversalResult()[0]).toBe('A');
    });

    it('DFS should visit all connected nodes', () => {
      component.runDfs();
      expect(component.traversalResult().length).toBe(6);
      expect(component.traversalResult()[0]).toBe('A');
    });
  });

  describe('reset', () => {
    it('should restore default graph', () => {
      component.nodeInput = 'Z';
      component.addNode();
      component.reset();
      expect(component.graph().nodes.length).toBe(6);
    });
  });
});

describe('graph.utils', () => {
  it('createDefaultGraph has 6 nodes and 6 edges', () => {
    const g = createDefaultGraph();
    expect(g.nodes.length).toBe(6);
    expect(g.edges.length).toBe(6);
  });

  it('addNode adds a node', () => {
    let g = createDefaultGraph();
    g = addNode(g, 'Z');
    expect(g.nodes.some((n) => n.id === 'Z')).toBe(true);
  });

  it('addEdge connects two nodes', () => {
    let g = createDefaultGraph();
    g = addEdge(g, 'D', 'F');
    expect(g.edges.some((e) => e.from === 'D' && e.to === 'F')).toBe(true);
  });

  it('removeNode removes node and its edges', () => {
    let g = createDefaultGraph();
    g = removeNode(g, 'A');
    expect(g.nodes.some((n) => n.id === 'A')).toBe(false);
    expect(g.edges.some((e) => e.from === 'A' || e.to === 'A')).toBe(false);
  });

  it('bfsTraversal visits all reachable nodes', () => {
    const g = createDefaultGraph();
    const result = bfsTraversal(g, 'A');
    expect(result.length).toBe(6);
  });

  it('dfsTraversal visits all reachable nodes', () => {
    const g = createDefaultGraph();
    const result = dfsTraversal(g, 'A');
    expect(result.length).toBe(6);
  });
});
