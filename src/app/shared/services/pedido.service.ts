import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly APIPedido = '/api/pedidos';

  constructor(private http: HttpClient) { }

  public listarPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.APIPedido}`);
  }

  public adicionarPedido(data: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(`${this.APIPedido}`, data);
  }

  public atualizarPedido(data: Pedido): Observable<Pedido>{
    return this.http.put<Pedido>(`${this.APIPedido}/${data.id}`, data);
  }

  public removerPedido(data: Pedido):Observable<any>{
    return this.http.delete<Pedido>(`${this.APIPedido}/${data.id}`);
  }
}
