import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-request-consultation',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './list-request-consultation.component.html',
  styleUrl: './list-request-consultation.component.css'
})
export class ListRequestConsultationComponent{
  requests: any[] = [];
  
  Tipo: string = '';
  Categoria: string = '';
  nombreGrupo?: string;
  Solicitante?: string;
  constructor(private requestService: RequestService,private router: Router) { }

  searchRequest(): void {
    this.requestService.getRequestFilter(this.Tipo, this.Categoria, this.nombreGrupo, this.Solicitante).subscribe(
      data => {
        this.requests = data;
      },
      error => {
        console.error('Error al obtener las solicitudes', error);
      }
    );
  }


  

  SailStarttRequest(): void {
    this.router.navigate(['/user/start-user']); 
  }
  SailListRequest(): void {
    this.router.navigate(['/request/list-request']); 
  }
  SailListConsultationRequest(): void {
    this.router.navigate(['/list-request-consultation']);
  }


  ngAfterViewInit() {
    this.initializeNavbarToggle();
  }
  private initializeNavbarToggle() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const pageContainer = document.querySelector('.page-container');

    if (navbarToggle && pageContainer) {
      navbarToggle.addEventListener('click', () => {
        pageContainer.classList.toggle('navbar-open');
      });
    }
  }
}
