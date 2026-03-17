export interface GraphNode {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
}

export function createDefaultGraph(): Graph {
  return {
    directed: false,
    nodes: [
      { id: 'A', x: 300, y: 60 },
      { id: 'B', x: 150, y: 180 },
      { id: 'C', x: 450, y: 180 },
      { id: 'D', x: 80, y: 320 },
      { id: 'E', x: 250, y: 320 },
      { id: 'F', x: 380, y: 320 },
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'F' },
      { from: 'E', to: 'F' },
    ],
  };
}

export function addNode(graph: Graph, id: string): Graph {
  if (graph.nodes.some((n) => n.id === id)) return graph;
  const angle = Math.random() * Math.PI * 2;
  const r = 120 + Math.random() * 80;
  const cx = 300 + r * Math.cos(angle);
  const cy = 220 + r * Math.sin(angle);
  return {
    ...graph,
    nodes: [...graph.nodes, { id, x: Math.round(cx), y: Math.round(cy) }],
  };
}

export function addEdge(graph: Graph, from: string, to: string): Graph {
  if (from === to) return graph;
  if (
    !graph.nodes.some((n) => n.id === from) ||
    !graph.nodes.some((n) => n.id === to)
  )
    return graph;
  const exists = graph.edges.some(
    (e) =>
      (e.from === from && e.to === to) ||
      (!graph.directed && e.from === to && e.to === from),
  );
  if (exists) return graph;
  return { ...graph, edges: [...graph.edges, { from, to }] };
}

export function removeNode(graph: Graph, id: string): Graph {
  return {
    ...graph,
    nodes: graph.nodes.filter((n) => n.id !== id),
    edges: graph.edges.filter((e) => e.from !== id && e.to !== id),
  };
}

function adjacencyList(graph: Graph): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const n of graph.nodes) adj.set(n.id, []);
  for (const e of graph.edges) {
    adj.get(e.from)?.push(e.to);
    if (!graph.directed) adj.get(e.to)?.push(e.from);
  }
  return adj;
}

export function bfsTraversal(graph: Graph, startId: string): string[] {
  const adj = adjacencyList(graph);
  const visited = new Set<string>();
  const result: string[] = [];
  const queue: string[] = [startId];
  visited.add(startId);
  while (queue.length > 0) {
    const node = queue.shift() as string;
    result.push(node);
    for (const neighbor of adj.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}

export function dfsTraversal(graph: Graph, startId: string): string[] {
  const adj = adjacencyList(graph);
  const visited = new Set<string>();
  const result: string[] = [];
  function dfs(node: string): void {
    visited.add(node);
    result.push(node);
    for (const neighbor of adj.get(node) ?? []) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }
  }
  dfs(startId);
  return result;
}
