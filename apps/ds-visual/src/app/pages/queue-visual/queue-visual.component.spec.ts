import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QueueVisualComponent } from './queue-visual.component';

describe('QueueVisualComponent', () => {
  let component: QueueVisualComponent;
  let fixture: ComponentFixture<QueueVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueVisualComponent, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(QueueVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should initialize with default queue', () => {
    expect(component.queue()).toEqual([5, 15, 25]);
  });

  describe('enqueue', () => {
    it('should add value to rear', () => {
      component.inputValue = '99';
      component.enqueue();
      expect(component.queue()[component.queue().length - 1]).toBe(99);
    });
  });

  describe('dequeue', () => {
    it('should remove front element', () => {
      component.dequeue();
      expect(component.queue()[0]).toBe(15);
    });

    it('should show empty message when queue is empty', () => {
      component.queue.set([]);
      component.dequeue();
      expect(component.message()).toBe('Queue is empty!');
    });
  });

  describe('front', () => {
    it('should show front element in message', () => {
      component.front();
      expect(component.message()).toBe('Front is 5');
    });
  });

  describe('reset', () => {
    it('should restore default state', () => {
      component.queue.set([]);
      component.reset();
      expect(component.queue()).toEqual([5, 15, 25]);
    });
  });
});
