import { Usuario } from './../../models/usuario';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Carro } from './../../models/carro';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {
  usuario = new Usuario();
  passwordConfirm = "";
  showModal = false;
  carro = new Carro();
  anoCarro:any = "";

  private readonly formatoData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  submitted = false;

  messagesErrors: string[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {

    this.usuario.cars = [];
    this.usuario.cars.push(new Carro());

  }

  saveUsuario(): void {
    if (this.validUsuario()) {
      console.log('this.usuario', this.usuario);
      this.usuario.cars = [];
      this.usuario.cars.push(this.carro);

      this.usuarioService.create(this.usuario).subscribe({
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

  newUsuario(): void {
    this.submitted = false;
    this.usuario = new Usuario();
    this.carro = new Carro();
    this.anoCarro = "";
    this.passwordConfirm = "";
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
      if (this.carro) {
        if (!this.carro.color || this.carro.color.trim() === "") {
          valido = false;
          mensagem.push("Preencha a cor do Carro \n");
        }
        if (!this.carro.licensePlate || this.carro.licensePlate.trim() === "") {
          valido = false;
          mensagem.push("Preencha a placa do Carro \n");
        }
        if (!this.carro.model || this.carro.model.trim() === "") {
          valido = false;
          mensagem.push("Preencha o modelo do Carro \n");
        }
        if (!this.anoCarro || this.anoCarro.trim() === '') {
          valido = false;
          mensagem.push("Preencha o ano do Carro \n");
        } else {
          if (isNaN(this.anoCarro)) {
            valido = false;
            mensagem.push("O ano do Carro deve ver um número \n");
          } else {
            try {
              console.log('this.anoCarro', this.anoCarro);
              const ano = parseInt(this.anoCarro);
              this.carro.year = ano;
            } catch (error) {
              valido = false;
              mensagem.push("O ano do Carro deve ver um número \n");
            }
          }
        }
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
