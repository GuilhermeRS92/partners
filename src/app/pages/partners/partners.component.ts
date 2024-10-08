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
  viewPartner(partnerId: string){
    this.router.navigate(['/parceiros/detalhes', partnerId]);

  }

  editPartner(partnerId: string){
    this.router.navigate(['/parceiros/editar', partnerId]);
  }

  addPartner(){
    this.router.navigate(['/parceiros/cadastrar']);
  }

  deletePartner(partnerId: string, partnerName: string){
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir ${partnerName}?`,
      acceptLabel: 'Sim',
      accept: () => {
        this.partnersService.deletePartner(partnerId)
        .subscribe(() => {
          this.partners = this.partners.filter(partner => partner.id !== partnerId);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Parceiro excluído com sucesso!'
          });
        });
      },
      rejectLabel: 'Não'
    })
  }

  sharePage(first: number, rows: number){
    const baseUrl = `${location.protocol}//${location.host}`;
    const updatedUrl = `${baseUrl}/parceiros/p/${(first / rows) + 1}/r/${rows}`;

    navigator.clipboard.writeText(updatedUrl)
      .then(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Compartilhado',
          detail: `Link para a página ${ first + 1 } copiada com sucesso!`
        });
      })
      .catch(err => {
        console.error('Erro ao copiar o link:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao copiar o link para a página ${ first / rows}.`
        });
      });
  }

}

