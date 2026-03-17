import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ArrayVisualComponent } from './array-visual.component';

describe('ArrayVisualComponent', () => {
  let component: ArrayVisualComponent;
  let fixture: ComponentFixture<ArrayVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayVisualComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrayVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default array', () => {
    expect(component.array()).toEqual([10, 20, 30, 40, 50]);
  });

  describe('push', () => {
    it('should append value to end of array', () => {
      component.inputValue = '99';
      component.push();
      expect(component.array()).toContain(99);
      expect(component.array()[component.array().length - 1]).toBe(99);
    });

    it('should not push when input is not a number', () => {
      component.inputValue = 'abc';
      component.push();
      expect(component.array().length).toBe(5);
    });
  });

  describe('pop', () => {
    it('should remove last element', () => {
      component.pop();
      expect(component.array().length).toBe(4);
      expect(component.array()).not.toContain(50);
    });

    it('should set message when array is empty', () => {
      component.array.set([]);
      component.pop();
      expect(component.message()).toBe('Array is empty!');
    });
  });

  describe('insertAt', () => {
    it('should insert value at given index', () => {
      component.inputValue = '99';
      component.inputIndex = '2';
      component.insertAt();
      expect(component.array()[2]).toBe(99);
    });

    it('should set error message for invalid index', () => {
      component.inputValue = '99';
      component.inputIndex = '100';
      component.insertAt();
      expect(component.message()).toBe('Invalid value or index');
    });
  });

  describe('removeAt', () => {
    it('should remove element at given index', () => {
      component.inputIndex = '0';
      component.removeAt();
      expect(component.array()[0]).toBe(20);
    });

    it('should set error message for invalid index', () => {
      component.inputIndex = '99';
      component.removeAt();
      expect(component.message()).toBe('Invalid index');
    });
  });

  describe('reset', () => {
    it('should restore array to default state', () => {
      component.array.set([]);
      component.reset();
      expect(component.array()).toEqual([10, 20, 30, 40, 50]);
    });
  });
});
