import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface DataStructureCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  topics: string[];
}

@Component({
  selector: 'ds-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly cards: DataStructureCard[] = [
    {
      title: 'Array',
      description:
        'Visualize array operations: insert, delete, search, and sorting algorithms.',
      icon: 'view_column',
      route: '/array',
      color: '#3f51b5',
      topics: ['Insert', 'Delete', 'Search', 'Sorting'],
    },
    {
      title: 'Linked List',
      description:
        'Explore singly and doubly linked list traversal, insertion, and removal.',
      icon: 'linear_scale',
      route: '/linked-list',
      color: '#e91e63',
      topics: ['Traverse', 'Insert', 'Remove', 'Reverse'],
    },
    {
      title: 'Stack',
      description:
        'Understand LIFO principle with push, pop, and peek operations.',
      icon: 'layers',
      route: '/stack',
      color: '#009688',
      topics: ['Push', 'Pop', 'Peek', 'LIFO'],
    },
    {
      title: 'Queue',
      description:
        'Learn FIFO principle with enqueue, dequeue, and circular queues.',
      icon: 'queue',
      route: '/queue',
      color: '#ff9800',
      topics: ['Enqueue', 'Dequeue', 'FIFO', 'Circular'],
    },
    {
      title: 'Binary Tree',
      description:
        'Visualize tree traversals: in-order, pre-order, post-order, and BFS.',
      icon: 'account_tree',
      route: '/tree',
      color: '#9c27b0',
      topics: ['Inorder', 'Preorder', 'Postorder', 'BFS'],
    },
    {
      title: 'Graph',
      description:
        'Explore graph structures with BFS, DFS traversals. Add nodes and edges.',
      icon: 'hub',
      route: '/graph',
      color: '#06b6d4',
      topics: ['BFS', 'DFS', 'Adjacency', 'Traversal'],
    },
  ];
}
