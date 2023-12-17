import { UsuarioOutputDTO } from './../../models/usuario';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {
  currentUsuario?: UsuarioOutputDTO;

  messagesErrors: string[] = [];
  showModal = false;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.getMe();

  }

  getMe(): void {
    this.usuarioService.getMe().subscribe({
      next: (data) => {
        this.currentUsuario = data;
        console.log(data);
      },
      error: (e) => {
        this.alertErro(e);
      }
    });
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
      this.messagesErrors = [];
      this.showModal = false;
    }
  }

  alertErro(e: any) {
    console.error(e);
    this.messagesErrors = [];
    if (e && e.error) {
      console.log("e.error", e.error);
      if (e.error.message) {
        this.messagesErrors.push(e.error.message);
      } else if(e.message) {
        this.messagesErrors.push(e.message);
      } else {
        console.log("Erro message vazio");
      }
    } else if(e.message) {
      console.log("e.message", e.message);
      this.messagesErrors.push(e.message);
    }
    this.openModel();
  }

}
