import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTrueFalseComponent } from './module-true-false.component';

describe('ModuleTrueFalseComponent', () => {
  let component: ModuleTrueFalseComponent;
  let fixture: ComponentFixture<ModuleTrueFalseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleTrueFalseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleTrueFalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
