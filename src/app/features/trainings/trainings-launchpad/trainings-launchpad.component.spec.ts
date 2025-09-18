import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsLaunchpadComponent } from './trainings-launchpad.component';

describe('TrainingsLaunchpadComponent', () => {
  let component: TrainingsLaunchpadComponent;
  let fixture: ComponentFixture<TrainingsLaunchpadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingsLaunchpadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingsLaunchpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
