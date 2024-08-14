import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnersComponent } from './pages/partners/partners.component';
import { FormPartnerComponent } from './pages/form-partner/form-partner.component';

const PARTNERS_ROUTES: Routes = [
  {
    path: '',
    component: PartnersComponent,
  },
  {
    path: 'p/:page/r/:rows',
    component: PartnersComponent,
  },
  {
    path: 'cadastrar',
    component: FormPartnerComponent
  },
  {
    path: 'editar/:id',
    component: FormPartnerComponent
  },
  {
    path: 'detalhes/:id',
    component: FormPartnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(PARTNERS_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}