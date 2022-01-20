import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technicien } from 'src/app/models/technicien';
import { TechnicienService } from 'src/app/services/technicien.service';

@Component({
  selector: 'app-technicien-create',
  templateUrl: './technicien-create.component.html',
  styleUrls: ['./technicien-create.component.css']
})
export class TechnicienCreateComponent implements OnInit {

  technicien: Technicien = {
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

  constructor(private service: TechnicienService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

 create(): void {
   this.service.create(this.technicien).subscribe(() => {
     this.toast.success("Technicien Cadastrado com sucesso", "Cadastro");
     this.router.navigate(['techniciens']);
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
  if(this.technicien.profiles.includes(profile)) {
    this.technicien.profiles.splice(this.technicien.profiles.indexOf(profile), 1);
  } else {
    this.technicien.profiles.push(profile);
  }

 }

 validaCampos(): boolean {
  return this.nome.valid && this.tel.valid && this.email.valid && this.password.valid;
}

}
