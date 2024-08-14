import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { FormPartnerComponent } from './pages/form-partner/form-partner.component';
import { HeaderComponent } from './components/header/header.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { PartnersService } from './services/partners.service';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeBr, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    PartnersComponent,
    FormPartnerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PartnersService, {provide: LOCALE_ID, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
