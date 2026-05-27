import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanjearvalePage } from './canjearvale.page';

describe('CanjearvalePage', () => {
  let component: CanjearvalePage;
  let fixture: ComponentFixture<CanjearvalePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CanjearvalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
