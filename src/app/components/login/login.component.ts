import { Component } from '@angular/core';
import { UsuarioService, LoginResponse } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = "";
  submitted = false;
  password = "";
  messagesErrors: string[] = [];
  showModal = false;

  constructor(
    private usuarioService: UsuarioService
  ) {}


  logar(): void {
    if (this.login.trim() === '' || this.password.trim() === '') {
      alert("Preencha login e senha");
    } else {
      this.usuarioService.logar(this.login, this.password).subscribe({
        next: (data) => {
          console.log(data);
          localStorage.setItem('api_key', `${data.content}`);
        },
        error: (e) => this.alertErro(e)
      });
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

}
