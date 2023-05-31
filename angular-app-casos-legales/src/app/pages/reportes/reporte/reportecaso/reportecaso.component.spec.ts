import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportecasoComponent } from './reportecaso.component';

describe('ReportecasoComponent', () => {
  let component: ReportecasoComponent;
  let fixture: ComponentFixture<ReportecasoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportecasoComponent]
    });
    fixture = TestBed.createComponent(ReportecasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
