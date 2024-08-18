import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-request',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './list-request.component.html',
  styleUrl: './list-request.component.css'
})
export class ListRequestComponent implements OnInit{
  
  requests: any[] = [];
  filtroNombres: string = '';
  constructor(private requestService: RequestService,private router: Router) { }

  ngOnInit(): void {
    this.GetRequests();
  }

  onSearchChange(searchValue: string): void {
    this.filtroNombres = searchValue;
    this.GetRequests();
  }

  GetRequests(): void {
    this.requestService.getRequests(this.filtroNombres).subscribe(
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
