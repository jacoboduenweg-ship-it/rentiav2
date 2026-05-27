import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescargarreciboPage } from './descargarrecibo.page';

describe('DescargarreciboPage', () => {
  let component: DescargarreciboPage;
  let fixture: ComponentFixture<DescargarreciboPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarreciboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
