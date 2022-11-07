import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedialogComponent } from './evaluatedialog.component';

describe('EvaluatedialogComponent', () => {
  let component: EvaluatedialogComponent;
  let fixture: ComponentFixture<EvaluatedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluatedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
