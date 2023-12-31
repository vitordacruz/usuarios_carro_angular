import { UsuarioOutputDTO } from './../../models/usuario';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.css']
})
export class UsuarioDetailsComponent {

  currentUsuario?: UsuarioOutputDTO;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hideLoading();
    this.getUsuario(this.route.snapshot.params['id']);

  }

  getUsuario(id: any): void {
    this.showLoading()
    this.usuarioService.get(id).subscribe({
      next: (data) => {
        this.currentUsuario = data;
        console.log(data);
        this.hideLoading();
      },
      error: (e) => {
        console.error(e);
        this.hideLoading();
      }

    });
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
