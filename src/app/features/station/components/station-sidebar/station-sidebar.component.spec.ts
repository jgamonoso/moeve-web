import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationSidebarComponent } from './station-sidebar.component';

describe('StationSidebarComponent', () => {
  let component: StationSidebarComponent;
  let fixture: ComponentFixture<StationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
