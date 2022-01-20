import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { TicketCreateComponent } from './components/ticket/ticket-create/ticket-create.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';
import { TicketReadComponent } from './components/ticket/ticket-read/ticket-read.component';
import { TicketUpdateComponent } from './components/ticket/ticket-update/ticket-update.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { NavComponent } from './components/nav/nav.component';
import { TechnicienCreateComponent } from './components/technicien/technicien-create/technicien-create.component';
import { TechnicienDeleteComponent } from './components/technicien/technicien-delete/technicien-delete.component';
import { TechnicienListComponent } from './components/technicien/technicien-list/technicien-list.component';
import { TechnicienUpdateComponent } from './components/technicien/technicien-update/technicien-update.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'techniciens',            component:   TechnicienListComponent },
      { path: 'techniciens/create',     component: TechnicienCreateComponent },
      { path: 'techniciens/update/:id', component: TechnicienUpdateComponent },
      { path: 'techniciens/delete/:id', component: TechnicienDeleteComponent },

      { path: 'clientes',            component:   ClienteListComponent },
      { path: 'clientes/create',     component: ClienteCreateComponent },
      { path: 'clientes/update/:id', component: ClienteUpdateComponent },
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent },

      { path: 'tickets',            component:   TicketListComponent },
      { path: 'tickets/create',     component: TicketCreateComponent },
      { path: 'tickets/update/:id', component: TicketUpdateComponent },
      { path: 'tickets/read/:id',   component:    TicketReadComponent},
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
