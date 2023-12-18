import { Component } from '@angular/core';
import { CarroService } from 'src/app/services/carro.service';
import { CarroInput } from 'src/app/models/carro';

@Component({
  selector: 'app-add-carro',
  templateUrl: './add-carro.component.html',
  styleUrls: ['./add-carro.component.css']
})
export class AddCarroComponent {
  showModal = false;
  messagesErrors: string[] = [];
  carro = new CarroInput();
  anoCarro:any = "";
  submitted = false;

  constructor(
    private carroService: CarroService
  ) {}

  ngOnInit(): void {
    this.hideLoading();
  }

  saveCarro(): void {
    if (this.validCarro()) {
      this.showLoading();
      this.carroService.create(this.carro).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.hideLoading();
        },
        error: (e) => {
          this.alertErro(e);
          this.hideLoading();
        }
      });
    }
  }

  newCarro(): void {
    this.submitted = false;
    this.showModal = false;
    this.messagesErrors = [];
    this.carro = new CarroInput();
    this.anoCarro = "";
  }

  validCarro(): boolean {
    let valido = true;
    let mensagem = [];

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
