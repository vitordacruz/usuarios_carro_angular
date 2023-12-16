import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioOutputDTO } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent {
  usuarios?: UsuarioOutputDTO[];
  currentUsuario?: UsuarioOutputDTO;
  currentIndex = -1;

  login = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveUsuarios();
  }

  retrieveUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  searchLogin(): void {

    this.currentUsuario = {};
    this.currentIndex = -1;

    this.usuarioService.getByLogin(this.login).subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });

  }

  setActiveUser(usuario: UsuarioOutputDTO, index: number): void {
    this.currentUsuario = usuario;
    this.currentIndex = index;
  }

  alertAindaNaoImplementado(): void {
    alert("Ainda não implementado!");
  }

  goToUsuarioDetalhes(id?:number): void {
    this.router.navigate(['/usuarios/' + id]);
  }

  remove(id?:number): void {
    this.usuarioService.delete(id).subscribe({
      next: (data) => {
        console.log("Deletou");
        this.retrieveUsuarios();
      },
      error: (e) => console.error(e)
    });
  }

}
