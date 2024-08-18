import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http:HttpClient) {}

  login(Usuario: string, Contrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { Usuario, Contrasena };

    return this.http.post<any>('${this.apiUrl}/login', body, { headers }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token); // Guardar el token en localStorage
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Remover el token al cerrar sesión
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Verificar si el usuario está autenticado
  }

}