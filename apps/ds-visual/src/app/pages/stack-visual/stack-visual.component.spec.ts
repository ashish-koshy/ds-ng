import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StackVisualComponent } from './stack-visual.component';

describe('StackVisualComponent', () => {
  let component: StackVisualComponent;
  let fixture: ComponentFixture<StackVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackVisualComponent, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(StackVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should initialize with default stack', () => {
    expect(component.stack()).toEqual([3, 7, 12]);
  });

  describe('push', () => {
    it('should add value to the top', () => {
      component.inputValue = '99';
      component.push();
      expect(component.stack()[component.stack().length - 1]).toBe(99);
    });

    it('should not push non-numeric value', () => {
      component.inputValue = 'xyz';
      component.push();
      expect(component.stack().length).toBe(3);
    });
  });

  describe('pop', () => {
    it('should remove top element', () => {
      component.pop();
      expect(component.stack()).toEqual([3, 7]);
    });

    it('should show underflow message when empty', () => {
      component.stack.set([]);
      component.pop();
      expect(component.message()).toBe('Stack underflow!');
    });
  });

  describe('peek', () => {
    it('should show top element in message', () => {
      component.peek();
      expect(component.message()).toBe('Top is 12');
    });

    it('should show empty message when stack is empty', () => {
      component.stack.set([]);
      component.peek();
      expect(component.message()).toBe('Stack is empty!');
    });
  });

  describe('reset', () => {
    it('should restore default state', () => {
      component.stack.set([]);
      component.reset();
      expect(component.stack()).toEqual([3, 7, 12]);
    });
  });
});
