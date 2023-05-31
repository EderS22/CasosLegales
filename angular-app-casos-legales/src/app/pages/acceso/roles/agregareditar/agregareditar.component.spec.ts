import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregareditarComponent } from './agregareditar.component';

describe('AgregareditarComponent', () => {
  let component: AgregareditarComponent;
  let fixture: ComponentFixture<AgregareditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregareditarComponent]
    });
    fixture = TestBed.createComponent(AgregareditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
