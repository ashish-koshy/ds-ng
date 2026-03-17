import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TreeVisualComponent } from './tree-visual.component';
import { inorder, preorder, postorder, bfs, buildTree } from './tree.utils';

describe('TreeVisualComponent', () => {
  let component: TreeVisualComponent;
  let fixture: ComponentFixture<TreeVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeVisualComponent, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TreeVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should initialize with default tree', () => {
    expect(component.tree()).not.toBeNull();
    expect(component.renderNodes().length).toBeGreaterThan(0);
  });

  describe('insertNode', () => {
    it('should insert a new node', () => {
      const before = component.renderNodes().length;
      component.inputValue = '45';
      component.insertNode();
      expect(component.renderNodes().length).toBe(before + 1);
    });

    it('should not insert non-numeric value', () => {
      const before = component.renderNodes().length;
      component.inputValue = 'abc';
      component.insertNode();
      expect(component.renderNodes().length).toBe(before);
    });
  });

  describe('traversals', () => {
    it('should produce correct inorder traversal', () => {
      component.runInorder();
      expect(component.traversalResult()).toEqual([20, 30, 40, 50, 60, 70, 80]);
    });

    it('should produce correct preorder traversal', () => {
      component.runPreorder();
      expect(component.traversalResult()).toEqual([50, 30, 20, 40, 70, 60, 80]);
    });

    it('should produce correct BFS traversal', () => {
      component.runBfs();
      expect(component.traversalResult()).toEqual([50, 30, 70, 20, 40, 60, 80]);
    });
  });

  describe('reset', () => {
    it('should restore default tree', () => {
      component.inputValue = '99';
      component.insertNode();
      component.reset();
      expect(component.renderNodes().length).toBe(
        component.DEFAULT_VALUES.length,
      );
    });
  });
});

describe('tree.utils', () => {
  const tree = buildTree([50, 30, 70, 20, 40, 60, 80]);

  it('inorder should return sorted values', () => {
    expect(inorder(tree)).toEqual([20, 30, 40, 50, 60, 70, 80]);
  });

  it('preorder should return root first', () => {
    expect(preorder(tree)).toEqual([50, 30, 20, 40, 70, 60, 80]);
  });

  it('postorder should return root last', () => {
    expect(postorder(tree)).toEqual([20, 40, 30, 60, 80, 70, 50]);
  });

  it('bfs should return level order', () => {
    expect(bfs(tree)).toEqual([50, 30, 70, 20, 40, 60, 80]);
  });
});
