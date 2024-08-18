import { Component } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-request',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.css'
})
export class AddRequestComponent {
  disabled=false;
  request = {
    Tipo: '',
    tipoDocumento: '',
    numeroDocumento: '',
    Nombres: '',
    primerApellido: '',
    segundoApellido: '',
    Direccion: '',
    nroCelular: '',
    otroTelefono: '',
    Correo: '',
    nombreGrupo: '',
    Categoria: 0,
    Banda: '',
    carroAlegorico: '',
    Reina: '',
    totalMayores: 0,
    totalMenores: 0
  };
  constructor(private requestService: RequestService, private router: Router) { }

  addRequest(): void {
    this.requestService.addRequest(this.request).subscribe(
      response => {
        console.log('Solicitud creada con éxito', response);
        this.router.navigate(['/start-request']); // Redirige al dashboard o a otra vista
      },
      error => {
        console.error('Error al crear la solicitud', error);
      }
    );
  } 
}
