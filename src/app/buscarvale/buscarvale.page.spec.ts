import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarvalePage } from './buscarvale.page';

describe('BuscarvalePage', () => {
  let component: BuscarvalePage;
  let fixture: ComponentFixture<BuscarvalePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarvalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
