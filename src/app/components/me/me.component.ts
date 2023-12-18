import { UsuarioOutputDTO } from './../../models/usuario';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarroService } from 'src/app/services/carro.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {
  currentUsuario?: UsuarioOutputDTO;

  messagesErrors: string[] = [];
  showModal = false;
  idCarroRemove = -1;
  showModalRemove = false;
  message = "";

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private carroService: CarroService
  ) {}

  ngOnInit(): void {
    this.hideLoading();
    this.getMe();

  }

  getMe(): void {
    this.showLoading();
    this.usuarioService.getMe().subscribe({
      next: (data) => {
        this.currentUsuario = data;
        console.log(data);
        this.hideLoading();
      },
      error: (e) => {
        this.alertErro(e);
        this.hideLoading();
      }
    });
  }

  adicionarCarro():void {
    this.router.navigate(['/carros/add']);
  }

  confirmRemove(id: any): void {
    if (id) {
      this.idCarroRemove = id;
      this.openModalRemove();
    } else {
      alert('Selecione um carro.');
    }
  }

  removeCarro(id: number): void{
    this.showLoading();
    this.carroService.delete(id).subscribe({
      next: (data) => {
        console.log("Deletou Carro");
        this.closeModalRemove();
        this.hideLoading();
      },
      error: (e) => {
        this.alertErro(e);
        this.hideLoading();
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
      this.idCarroRemove = -1;
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
