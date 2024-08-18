import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-user',
  standalone: true,
  imports: [],
  templateUrl: './start-user.component.html',
  styleUrl: './start-user.component.css'
})

export class StartUserComponent implements AfterViewInit {

  constructor(private router: Router) { }

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

