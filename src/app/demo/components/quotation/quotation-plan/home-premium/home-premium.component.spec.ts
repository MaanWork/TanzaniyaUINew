import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePremiumComponent } from './home-premium.component';

describe('HomePremiumComponent', () => {
  let component: HomePremiumComponent;
  let fixture: ComponentFixture<HomePremiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePremiumComponent]
    });
    fixture = TestBed.createComponent(HomePremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
