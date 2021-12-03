import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../models/filme';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private readonly APIFilmes = '/api/filmes';

  constructor(private http: HttpClient) { }

  public listarFilmes(): Observable<Filme[]>{
    return this.http.get<Filme[]>(`${this.APIFilmes}`);
  }

  public adicionaFilme(data: Filme): Observable<Filme>{
    return this.http.post<Filme>(`${this.APIFilmes}`, data);
  }

  public atualizaFilme(data: Filme): Observable<Filme>{
    return this.http.put<Filme>(`${this.APIFilmes}/${data.id}`, data);
  }

  public removerFilme(data: Filme): Observable<any>{
    return this.http.delete<Filme>(`${this.APIFilmes}/${data.id}`);
  }
}
