import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl = 'http://localhost:3000/user'; // URL de tu backend

  // constructor(private http: HttpClient) { }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(${apiUrl}/auth/login, { Usuario, password });
  // }

  // private getAuthHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token'); // Obtener token del almacenamiento local
  //   return new HttpHeaders().set('Authorization', Bearer ${token});
  // }
}
