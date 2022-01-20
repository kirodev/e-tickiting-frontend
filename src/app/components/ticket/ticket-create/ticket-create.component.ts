import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models/ticket';
import { Cliente } from 'src/app/models/cliente';
import { Technicien } from 'src/app/models/technicien';
import { TicketService } from 'src/app/services/ticket.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TechnicienService } from 'src/app/services/technicien.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTechniciens();
  }

  create(): void {
    this.ticketService.create(this.ticket).subscribe(resposta => {
      this.toastService.success('Ticket criado com sucesso', 'Nouveau ticket');
      this.router.navigate(['tickets']);
    }, ex => {
      console.log(ex);
      
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

}