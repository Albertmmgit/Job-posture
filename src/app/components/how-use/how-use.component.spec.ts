import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowUseComponent } from './how-use.component';

describe('HowUseComponent', () => {
  let component: HowUseComponent;
  let fixture: ComponentFixture<HowUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowUseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
