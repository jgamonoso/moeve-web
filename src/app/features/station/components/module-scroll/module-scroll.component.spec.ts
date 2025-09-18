import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleScrollComponent } from './module-scroll.component';

describe('ModuleScrollComponent', () => {
  let component: ModuleScrollComponent;
  let fixture: ComponentFixture<ModuleScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
