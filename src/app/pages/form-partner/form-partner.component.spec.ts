import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPartnerComponent } from './form-partner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FormPartnerComponent', () => {
  let component: FormPartnerComponent;
  let fixture: ComponentFixture<FormPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPartnerComponent, HeaderComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ToastModule, FormsModule, ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
