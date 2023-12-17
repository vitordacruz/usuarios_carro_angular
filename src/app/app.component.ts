import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Usuarios Carro';

  constructor(
    private usuarioService: UsuarioService
  ) {}


  logout():void  {
    this.usuarioService.logOut();
    alert("Você deslogou com sucesso");
  }
}
