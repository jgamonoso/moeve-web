import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationTooltipComponent } from './station-tooltip.component';

describe('StationTooltipComponent', () => {
  let component: StationTooltipComponent;
  let fixture: ComponentFixture<StationTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
