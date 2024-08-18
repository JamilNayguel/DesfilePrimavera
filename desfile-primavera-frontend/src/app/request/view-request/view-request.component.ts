import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../request.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-request',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './view-request.component.html',
  styleUrl: './view-request.component.css'
})
export class ViewRequestComponent implements OnInit {
  request: any = {};

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.GetRequests(id);
  }

  GetRequests(id: string | null): void {
    if (id) {
      this.requestService.getRequestById(id).subscribe(
        data => {
          this.request = data;
        },
        error => {
          console.error('Error al obtener la solicitud', error);
        }
      );
    }
  }
}
