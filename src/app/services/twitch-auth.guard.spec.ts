import { TestBed } from '@angular/core/testing';

import { TwitchAuthGuard } from 'src/app/services/twitch-auth-guard.service';

describe('AuthGuard', () => {
  let guard: TwitchAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TwitchAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
