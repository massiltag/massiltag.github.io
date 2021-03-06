import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsComponent } from './socials.component';

describe('SocialComponent', () => {
  let component: SocialsComponent;
  let fixture: ComponentFixture<SocialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
