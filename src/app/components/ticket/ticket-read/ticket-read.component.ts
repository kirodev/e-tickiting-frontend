import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-read',
  templateUrl: './ticket-read.component.html',
  styleUrls: ['./ticket-read.component.css']
})
export class TicketReadComponent implements OnInit {

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

  constructor(
    private ticketService: TicketService,
    private toastService:    ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ticket.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.ticketService.findById(this.ticket.id).subscribe(resposta => {
      this.ticket = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
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