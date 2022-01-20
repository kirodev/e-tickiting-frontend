import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technicien } from 'src/app/models/technicien';
import { TechnicienService } from 'src/app/services/technicien.service';

@Component({
  selector: 'app-technicien-delete',
  templateUrl: './technicien-delete.component.html',
  styleUrls: ['./technicien-delete.component.css']
})
export class TechnicienDeleteComponent implements OnInit {

  technicien: Technicien = {
    id:         '',
    nome:       '',
    tel:        '',
    email:      '',
    password:      '',
    profiles:     [],
    dateCreation: ''
  }

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

  delete(): void {
    this.service.delete(this.technicien.id).subscribe(() => {
      this.toast.success('Technicien deletado com sucesso', 'Delete');
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

}