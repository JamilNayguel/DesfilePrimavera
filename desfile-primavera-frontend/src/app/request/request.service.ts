import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'http://localhost:3000/api/request';

  constructor(private http: HttpClient) { }

  addRequest(request: any): Observable<any> {
    return this.http.post('${this.apiUrl}/create', request);
  }


  getRequests(Nombres: string = ''): Observable<any[]> {
    let params = new HttpParams();

    if (Nombres) {
      params = params.set('Nombres', Nombres);
    }
    return this.http.get<any[]>('${this.apiUrl}/search',{ params });
  }
  
  getRequestById(Nro: string): Observable<any> {
    return this.http.get<any>('${this.apiUrl}/view/${id}');
  }


  getRequestFilter(Tipo: string, Categoria: string, nombreGrupo?: string, Solicitante?: string): Observable<any[]> {
    let params = new HttpParams()
      .set('Tipo', Tipo)
      .set('Categoria', Categoria);

    if (nombreGrupo) {
      params = params.set('nombreGrupo', nombreGrupo);
    }

    if (Solicitante) {
      params = params.set('Solicitante', Solicitante);
    }

    return this.http.get<any[]>('${this.apiUrl}/filter', { params });
  }

}
