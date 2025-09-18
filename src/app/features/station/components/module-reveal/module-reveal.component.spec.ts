import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRevealComponent } from './module-reveal.component';

describe('ModuleRevealComponent', () => {
  let component: ModuleRevealComponent;
  let fixture: ComponentFixture<ModuleRevealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleRevealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
