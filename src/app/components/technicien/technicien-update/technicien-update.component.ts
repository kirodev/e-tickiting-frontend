import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technicien } from 'src/app/models/technicien';
import { TechnicienService } from 'src/app/services/technicien.service';


@Component({
  selector: 'app-technicien-update',
  templateUrl: './technicien-update.component.html',
  styleUrls: ['./technicien-update.component.css']
})
export class TechnicienUpdateComponent implements OnInit {

  technicien: Technicien = {
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
    private service: TechnicienService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.technicien.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.technicien.id).subscribe(resposta => {
      resposta.profiles = []
      this.technicien = resposta;
    })
  }

  update(): void {
    this.service.update(this.technicien).subscribe(() => {
      this.toast.success('Technicien atualizado com sucesso', 'Update');
      this.router.navigate(['techniciens'])
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
    if(this.technicien.profiles.includes(profile)) {
      this.technicien.profiles.splice(this.technicien.profiles.indexOf(profile), 1);
    } else {
      this.technicien.profiles.push(profile);
    }
    
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.tel.valid
     && this.email.valid && this.password.valid
  }
}