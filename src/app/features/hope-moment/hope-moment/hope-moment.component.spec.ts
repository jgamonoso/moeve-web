import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopeMomentComponent } from './hope-moment.component';

describe('HopeMomentComponent', () => {
  let component: HopeMomentComponent;
  let fixture: ComponentFixture<HopeMomentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HopeMomentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HopeMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
