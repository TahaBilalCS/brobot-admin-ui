import { TestBed } from '@angular/core/testing';

import { ObsWebsocketService } from 'src/app/feature/twitch/services/obs/obs-websocket.service';

describe('ObsWebsocketService', () => {
  let service: ObsWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObsWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
