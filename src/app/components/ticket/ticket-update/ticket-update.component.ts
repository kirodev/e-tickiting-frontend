import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models/ticket';
import { Cliente } from 'src/app/models/cliente';
import { Technicien } from 'src/app/models/technicien';
import { TicketService } from 'src/app/services/ticket.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TechnicienService } from 'src/app/services/technicien.service';

@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent implements OnInit {

  ticket: Ticket = {
    priorite:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    technicien:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTechnicien: '',
  }

  clientes: Cliente[] = []
  techniciens: Technicien[] = []

  priorite: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  technicien:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private ticketService: TicketService,
    private clienteService: ClienteService,
    private technicienService: TechnicienService,
    private toastService:    ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ticket.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTechniciens();
  }

  findById(): void {
    this.ticketService.findById(this.ticket.id).subscribe(resposta => {
      this.ticket = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  update(): void {
    this.ticketService.update(this.ticket).subscribe(resposta => {
      this.toastService.success('Ticket atualizado com sucesso', 'Atualizar ticket');
      this.router.navigate(['tickets']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTechniciens(): void {
    this.technicienService.findAll().subscribe(resposta => {
      this.techniciens = resposta;
    })
  }

  validaCampos(): boolean {
    return this.priorite.valid && this.status.valid && this.titulo.valid 
       && this.observacoes.valid && this.technicien.valid && this.cliente.valid
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'OUVERT'
    } else if(status == '1') {
      return 'EM EN COURS'
    } else {
      return 'FERMÉE'
    }
  }

  retornaPrioridade(priorite: any): string {
    if(priorite == '0') {
      return 'BAIXA'
    } else if(priorite == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }
  
}