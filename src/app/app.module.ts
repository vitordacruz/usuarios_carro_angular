import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { UsuarioDetailsComponent } from './components/usuario-details/usuario-details.component';
import { UpdateUsuarioComponent } from './components/update-usuario/update-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from '../environments/environment';
import { MeComponent } from './components/me/me.component';
import { AddCarroComponent } from './components/add-carro/add-carro.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    UsuarioListComponent,
    AddUsuarioComponent,
    UsuarioDetailsComponent,
    UpdateUsuarioComponent,
    LoginComponent,
    MeComponent,
    AddCarroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080", "usuarios-carros.onrender.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
