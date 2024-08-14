import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Partner } from 'src/app/models/partner.model';
import { PartnersService } from 'src/app/services/partners.service';

@Component({
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PartnersComponent {

  partners: Partner[] = [];

  first: number = 0;

  rows = 10;

  constructor(
    private partnersService: PartnersService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
      this.partnersService.getPartners()
      .subscribe(partners => {
        this.partners = partners
        const page = this.route.snapshot.paramMap.get('page');
        const rows = this.route.snapshot.paramMap.get('rows');
        if(page && rows){
          this.rows = parseInt(rows);
          this.first = (parseInt(page) - 1) * this.rows;
        }
      });
  }
  viewPartner(customerId: string){
    this.router.navigate(['/parceiros/detalhes', customerId]);

  }

  editPartner(customerId: string){
    this.router.navigate(['/parceiros/editar', customerId]);
  }

  addPartner(){
    this.router.navigate(['/parceiros/cadastrar']);
  }

  deletePartner(customerId: string, curstomerName: string){
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir ${curstomerName}?`,
      accept: () => {
        this.partnersService.deletePartner(customerId)
        .subscribe(() => {
          this.partners = this.partners.filter(partner => partner.id !== customerId);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Parceiro excluído com sucesso!'
          });
        });
      }
    })
  }

  sharePage(first: number, rows: number){
    const baseUrl = `${location.protocol}//${location.host}`;
    const updatedUrl = `${baseUrl}/parceiros/p/${(first / rows) + 1}/r/${rows}`;

    navigator.clipboard.writeText(updatedUrl)
      .then(() => {
        this.messageService.add({
          severity: 'info',
          key: 'shareAlert',
          summary: 'Compartilhado',
          detail: `Link para a página ${ first + 1 } copiada com sucesso!`
        });
      })
      .catch(err => {
        console.error('Erro ao copiar o link:', err);
        this.messageService.add({
          severity: 'error',
          key: 'shareAlert',
          summary: 'Erro',
          detail: `Erro ao copiar o link para a página ${ first / rows}.`
        });
      });
  }

}

