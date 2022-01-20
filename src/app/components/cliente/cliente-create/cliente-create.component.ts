import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    tel: '',
    email: '',
    password: '',
    profiles: [],
    dateCreation: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  tel: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(private service: ClienteService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

 create(): void {
   this.service.create(this.cliente).subscribe(() => {
     this.toast.success("Cliente Cadastrado com sucesso", "Cadastro");
     this.router.navigate(['clientes']);
   }, ex =>{
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
  return this.nome.valid && this.tel.valid && this.email.valid && this.password.valid;
}

}
