import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id:         '',
    nome:       '',
    tel:        '',
    email:      '',
    password:      '',
    profiles:     [],
    dateCreation: ''
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  tel: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.profiles = []
      this.cliente = resposta;
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso', 'Update');
      this.router.navigate(['clientes'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  addPerfil(profile: any): void {
    if(this.cliente.profiles.includes(profile)) {
      this.cliente.profiles.splice(this.cliente.profiles.indexOf(profile), 1);
    } else {
      this.cliente.profiles.push(profile);
    }
    
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.tel.valid
     && this.email.valid && this.password.valid
  }
}