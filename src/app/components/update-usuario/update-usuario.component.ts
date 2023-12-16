import { Usuario } from './../../models/usuario';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Carro } from './../../models/carro';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent {
  usuario = new Usuario();
  passwordConfirm = "";
  showModal = false;

  private readonly formatoData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  submitted = false;

  messagesErrors: string[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getUsuario(this.route.snapshot.params['id']);
    }

  }

  getUsuario(id: any): void {
    this.usuarioService.get(id).subscribe({
      next: (data) => {
        console.log(data);
        this.usuario = data;
      },
      error: (e) => console.error(e)
    });
  }

  saveUsuario(): void {
    if (this.validUsuario()) {
      console.log('this.usuario', this.usuario);
      if (this.usuario.id) {
        this.usuarioService.update(this.usuario.id, this.usuario).subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e) => {
            this.alertErro(e);
          }
        });
      }
    }
  }

  validUsuario(): boolean {
    let valido = true;
    let mensagem = [];
    if (!this.usuario) {
      valido = false;
      mensagem.push("Preencha informações do Usuario");
      return valido;
    } else {
      if (!this.usuario.firstName || this.usuario.firstName.trim() === '') {
        valido = false;
        mensagem.push("Informe o nome \n");
      }
      if (!this.usuario.lastName || this.usuario.lastName.trim() === '') {
        valido = false;
        mensagem.push("Informe o sobrenome \n");
      }
      if (!this.usuario.email || this.usuario.email.trim() === '') {
        valido = false;
        mensagem.push("Informe o e-mail \n");
      }
      if (!this.usuario.login || this.usuario.login.trim() === '') {
        valido = false;
        mensagem.push("Informe o login \n");
      }
      if (!this.usuario.phone || this.usuario.phone.trim() === '') {
        valido = false;
        mensagem.push("Informe o telefone \n");
      }
      if (!this.usuario.birthday || !this.validDate(this.usuario.birthday)) {
        valido = false;
        mensagem.push("A data de Nascimento deve ser informada no formato DD/MM/YYYY \n");
      }
      if (!this.usuario.password || this.usuario.password.trim() === '') {
        valido = false;
        mensagem.push("Preencha a Senha \n");
      }
      if (!this.passwordConfirm || this.passwordConfirm.trim() === '') {
        valido = false;
        mensagem.push("Preencha a Confirmação da Senha \n");
      }
      if (this.usuario.password && this.passwordConfirm && (this.usuario.password  !== this.passwordConfirm)) {
        valido = false;
        mensagem.push("A Senha e a Confirmação da Senha não coincidem \n");
      }
      if (!valido) {
        this.messagesErrors = mensagem;
        this.openModel();
      }
      return valido;
    }
  }

  validDate(dt: string): boolean {
    const ok = this.formatoData.test(dt);
    console.log("ok", ok);
    if (!ok)
      return false;
    else {
      const arrayDate = dt.split("/");
      const dia =  parseInt(arrayDate[0]);
      const mes =  parseInt(arrayDate[1]);

      console.log("dia", dia);
      console.log("mes", mes);
      if (dia > 31 || dia <= 0) {
        return false;
      } else if(mes > 12 || mes <= 0) {
        return false;
      } else {
        return true;
      }
    };
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
