import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkedListVisualComponent } from './linked-list-visual.component';

describe('LinkedListVisualComponent', () => {
  let component: LinkedListVisualComponent;
  let fixture: ComponentFixture<LinkedListVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedListVisualComponent, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(LinkedListVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should initialize with default list', () => {
    expect(component.list()).toEqual([1, 2, 3, 4]);
  });

  describe('prepend', () => {
    it('should add value to the head', () => {
      component.inputValue = '0';
      component.prepend();
      expect(component.list()[0]).toBe(0);
    });
  });

  describe('append', () => {
    it('should add value to the tail', () => {
      component.inputValue = '99';
      component.append();
      expect(component.list()[component.list().length - 1]).toBe(99);
    });
  });

  describe('removeHead', () => {
    it('should remove first element', () => {
      component.removeHead();
      expect(component.list()[0]).toBe(2);
    });

    it('should show error for empty list', () => {
      component.list.set([]);
      component.removeHead();
      expect(component.message()).toBe('List is empty!');
    });
  });

  describe('removeTail', () => {
    it('should remove last element', () => {
      component.removeTail();
      expect(component.list()[component.list().length - 1]).toBe(3);
    });
  });

  describe('reverse', () => {
    it('should reverse the list', () => {
      component.reverse();
      expect(component.list()).toEqual([4, 3, 2, 1]);
    });
  });

  describe('reset', () => {
    it('should restore default state', () => {
      component.list.set([]);
      component.reset();
      expect(component.list()).toEqual([1, 2, 3, 4]);
    });
  });
});
