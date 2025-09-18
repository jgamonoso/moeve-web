import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRendererComponent } from './module-renderer.component';

describe('ModuleRendererComponent', () => {
  let component: ModuleRendererComponent;
  let fixture: ComponentFixture<ModuleRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
