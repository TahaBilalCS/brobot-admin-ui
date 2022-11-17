import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleOutcomeComponent } from './battle-outcome.component';

describe('BattleOutcomeComponent', () => {
  let component: BattleOutcomeComponent;
  let fixture: ComponentFixture<BattleOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleOutcomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
