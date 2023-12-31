import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { UsuarioDetailsComponent } from './components/usuario-details/usuario-details.component';
import { UpdateUsuarioComponent } from './components/update-usuario/update-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { MeComponent } from './components/me/me.component';
import { AddCarroComponent } from './components/add-carro/add-carro.component';

const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/add', component: AddUsuarioComponent },
  { path: 'usuarios/add/:id', redirectTo: 'usuarios/update/:id', pathMatch: 'full' },
  { path: 'usuarios/update/:id', component: UpdateUsuarioComponent },
  { path: 'usuarios/:id', component: UsuarioDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'me', component: MeComponent },
  { path: 'carros/add', component: AddCarroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
