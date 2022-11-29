import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamOverlayComponent } from 'src/app/feature/twitch/components/stream-overlay/stream-overlay.component';

describe('StreamOverlayComponent', () => {
  let component: StreamOverlayComponent;
  let fixture: ComponentFixture<StreamOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StreamOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
