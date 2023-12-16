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
  showModal = false;
  showModalRemove = false;
  message = "";
  idUsuarioRemove = -1;

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
      error: (e) => {
        this.alertErro(e);
      }
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
      error: (e) => {
        this.alertErro(e);
      }
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

  confirmRemove(id?:number): void {
    if (id) {
      this.idUsuarioRemove = id;
      this.openModalRemove();
    } else {
      alert('Selecione um usuário.');
    }
  }

  remove(id?:number): void {
    this.usuarioService.delete(id).subscribe({
      next: (data) => {
        console.log("Deletou Usuário");
        this.retrieveUsuarios();
        this.closeModalRemove();
      },
      error: (e) => {
        this.alertErro(e);
      }
    });
  }

  openModalRemove(): void {
    const modelDiv = document.getElementById('modalRemove');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
      this.showModalRemove = true;
    }
  }

  closeModalRemove() {
    const modelDiv = document.getElementById('modalRemove');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
      this.message = "";
      this.showModalRemove = false;
      this.idUsuarioRemove = -1;
    }
  }

  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
      this.showModal = true;
    }
  }

  closeModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
      this.message = "";
      this.showModal = false;
    }
  }

  alertErro(e: any) {
    console.error(e);
    if (e && e.error) {
      console.log("e.error", e.error);
      if (e.error.message) {
        this.message = e.error.message;
      } else if(e.message) {
        console.log("e.message", e.message);
        this.message = e.message;
      } else {
        console.log("Erro message vazio");
      }
    } else if(e.message) {
      console.log("e.message", e.message);
      this.message = e.message;
    }
    this.openModel();
  }

  goToUsuarioEditar(id?:number): void {
    if (!id) {
      this.message = "Selecione um Usuário";
      this.openModel();
    } else {
      this.router.navigate(['/usuarios/add/' + id]);
    }
  }

}
