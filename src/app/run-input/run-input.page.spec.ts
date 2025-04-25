import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunInputPage } from './run-input.page';

describe('RunInputPage', () => {
  let component: RunInputPage;
  let fixture: ComponentFixture<RunInputPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RunInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
