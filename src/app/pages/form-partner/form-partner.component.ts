import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Partner } from 'src/app/models/partner.model';
import { PartnersService } from 'src/app/services/partners.service';

@Component({
  templateUrl: './form-partner.component.html',
  styleUrls: ['./form-partner.component.scss'],
  providers: [MessageService]
})
export class FormPartnerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  partnerForm!: FormGroup;
  partnerInformation?: Partner = undefined
  errorMessage: boolean = false;
  isViewMode: boolean = true;
  
  headerTitle: string = 'Cadastrar Parceiro';
  headerCaption: string = 'Preencha os campos abaixo para cadastrar um novo parceiro';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnersService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.url.map(segment => segment.path).join('/');
    this.isViewMode = url.includes('detalhes');

    if(id){
      const partnerSubscription = this.partnerService.getPartnerById(id)
        .subscribe({
          next: (partner) => {
            this.partnerInformation = partner;
            if(this.isViewMode){
              this.headerTitle = `Detalhes: ${partner.name}`;
              this.headerCaption = 'Veja abaixo as informações do parceiro.';
            } else{
              this.headerTitle = `Editar: ${partner.name}`;
              this.headerCaption = 'Preencha os campos abaixo para editar o parceiro.';
            }
            this.generateFormBuild();
          },
          error: (error) => {
            this.errorMessage = true;
            console.error('Error getting partner', error);
          }
        })
        this.subscription.add(partnerSubscription);
    } else {
      this.generateFormBuild();
    }
  }

  generateFormBuild(){
    this.partnerForm = this.formBuilder.group({
      id: [this.partnerInformation?.id || null],
      createdAt: [this.partnerInformation?.createdAt || new Date()],
      name: [this.partnerInformation?.name || '', Validators.required],
      description: [this.partnerInformation?.description || '', Validators.required],
      repositoryGit: [this.partnerInformation?.repositoryGit || '', Validators.required],
      urlDoc: [this.partnerInformation?.urlDoc || '', Validators.required],
      clients: this.formBuilder.array(this.partnerInformation?.clients?.map(client => this.formBuilder.control(client, Validators.required)) || []),
      projects: this.formBuilder.array(this.partnerInformation?.projects?.map(project => this.formBuilder.control(project, Validators.required)) || [])
    });

    if(this.isViewMode){
      this.partnerForm.disable();
    }
  }

  get clients(): FormArray {
    return this.partnerForm.get('clients') as FormArray;
  }

  get projects(): FormArray {
    return this.partnerForm.get('projects') as FormArray;
  }

  addClient(): void {
    this.clients.push(this.formBuilder.control('', Validators.required));
  }

  removeClient(index: number): void {
    this.clients.removeAt(index);
  }

  addProject(): void {
    this.projects.push(this.formBuilder.control('', Validators.required));
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  save(){
    if(this.partnerForm.valid){
      const partner: Partner = this.partnerForm.value;
      console.log(partner);
      if(partner.id){
        const putPartnerSubscription = this.partnerService.putPartner(partner)
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Parceiro atualizado com sucesso!' });
            },
            error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar parceiro!' });
              console.error('Error updating partner', error);
            }
          });
        this.subscription.add(putPartnerSubscription);
      } else {
        const postPartnerSubscription = this.partnerService.postPartner(partner)
          .subscribe({
            next: (partner) => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Parceiro criado com sucesso!' });
              setTimeout(() => {
                this.router.navigate([`/parceiros/editar/${partner.id}`]);
              }, 2500);
            },
            error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar parceiro!' });
            }
          });
        this.subscription.add(postPartnerSubscription);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
