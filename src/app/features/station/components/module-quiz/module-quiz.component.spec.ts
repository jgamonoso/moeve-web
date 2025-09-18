import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleQuizComponent } from './module-quiz.component';

describe('ModuleQuizComponent', () => {
  let component: ModuleQuizComponent;
  let fixture: ComponentFixture<ModuleQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
