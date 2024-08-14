import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPartnersComponent } from './form-partner.component';

describe('FormsPartnersComponent', () => {
  let component: FormsPartnersComponent;
  let fixture: ComponentFixture<FormsPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
