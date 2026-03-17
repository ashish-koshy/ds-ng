export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function insert(root: TreeNode | null, value: number): TreeNode {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) return { ...root, left: insert(root.left, value) };
  if (value > root.value) return { ...root, right: insert(root.right, value) };
  return root;
}

export function buildTree(values: number[]): TreeNode | null {
  return values.reduce<TreeNode | null>((tree, val) => insert(tree, val), null);
}

export function inorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inorder(root.left), root.value, ...inorder(root.right)];
}

export function preorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [root.value, ...preorder(root.left), ...preorder(root.right)];
}

export function postorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...postorder(root.left), ...postorder(root.right), root.value];
}

export function bfs(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const node = queue.shift() as TreeNode;
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}

export interface RenderNode {
  value: number;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
  highlighted: boolean;
}

export function buildRenderNodes(
  node: TreeNode | null,
  x: number,
  y: number,
  xOffset: number,
  highlighted: Set<number>,
  parentX?: number,
  parentY?: number,
): RenderNode[] {
  if (!node) return [];
  const current: RenderNode = {
    value: node.value,
    x,
    y,
    parentX,
    parentY,
    highlighted: highlighted.has(node.value),
  };
  const yStep = 80;
  return [
    current,
    ...buildRenderNodes(
      node.left,
      x - xOffset,
      y + yStep,
      xOffset / 2,
      highlighted,
      x,
      y,
    ),
    ...buildRenderNodes(
      node.right,
      x + xOffset,
      y + yStep,
      xOffset / 2,
      highlighted,
      x,
      y,
    ),
  ];
}
