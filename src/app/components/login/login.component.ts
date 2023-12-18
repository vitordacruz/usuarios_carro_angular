import { Component } from '@angular/core';
import { UsuarioService, LoginResponse } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

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
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hideLoading();
  }


  logar(): void {
    if (this.login.trim() === '' || this.password.trim() === '') {
      alert("Preencha login e senha");
    } else {
      this.showLoading();
      this.usuarioService.logar(this.login, this.password).subscribe({
        next: (data) => {
          console.log(data);
          if (data.content) {
            let api_key = "";
            if (data.content.startsWith("Bearer ")) {
              api_key = data.content.replace("Bearer ", '');
            } else {
              api_key = data.content;
            }
            localStorage.setItem('access_token', `${api_key}`);
            this.router.navigate(['/usuarios']);
            this.hideLoading();
          }
        },
        error: (e) => {
          this.alertErro(e),
          localStorage.removeItem('access_token');
          this.hideLoading();
        }
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

  showLoading(): void {
    let element = document.getElementById('loading');
    if (element) {
      element.style.display = '';
    }
  }

  hideLoading(): void {
    let element = document.getElementById('loading');
    if (element) {
      element.style.display = 'none';
    }
  }

}
