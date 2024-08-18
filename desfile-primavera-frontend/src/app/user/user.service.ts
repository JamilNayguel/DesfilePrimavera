import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(Usuario: string, Contrasena: string): Observable<any> {
    return this.authService.login(Usuario, Contrasena);
  }

  logout(): void {
    this.authService.logout();
  }
}
