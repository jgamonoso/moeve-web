import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeCounterComponent } from './molecule-counter.component';

describe('MoleculeCounterComponent', () => {
  let component: MoleculeCounterComponent;
  let fixture: ComponentFixture<MoleculeCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculeCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculeCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
