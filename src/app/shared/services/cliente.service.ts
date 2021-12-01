import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import applyChanges from 'devextreme/data/apply_changes';
import { EMPTY } from 'rxjs';

/* export class Change<T> {
  type?: 'insert' | 'update' | 'remove';

  key: any;

  data?: Partial<T>;
} */
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  cliente: Cliente[] = [];

  private cliente$ = new BehaviorSubject<Cliente[]>([]);

  private readonly APICliente = '/api/clientes';

  constructor(private http: HttpClient) {}

  updateOrders(change: any, data: Cliente) {
    change.data = data;
    const clientes = applyChanges(this.cliente$.getValue(), [change], { keyExpr: 'id' });
    this.cliente$.next(clientes);
  }

  listarCLientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.APICliente}`);
  }

  adicionarCliente(data: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.APICliente}`, data);
  }

   atualizarCliente(data: Cliente, key: any): Observable<Cliente> {
    //const httpParams = new HttpParams({ fromObject: { key: data.id, values: JSON.stringify(data.nome) } })
    // this.atualizaMudancas(dados, data);
    const url =  this.http.put<Cliente>(`${this.APICliente}/${key}`, data);
    return url;
  }

  removerCliente(key: any): Observable<any> {
    /*     const httpParams = new HttpParams({ fromObject: { key: data.id} });
    const httpOptions = { withCredentials: true, body: httpParams }; */
    debugger;
    return this.http.delete<Cliente>(`${this.APICliente}/${key}`);
  }

   salvarAlteracoes(change: any) {
    if (change.type == 'insert')
    return this.adicionarCliente(change.data);
    else if (change.type == 'update') {
      //applyChanges([this.cliente$.getValue()], [change.data], { keyExpr: 'id' });
      return this.atualizarCliente(change.data, change.key);
    } else if (change.type == 'remove') {
      //applyChanges([this.cliente], [change.data], {keyExpr: 'id'});
      return this.removerCliente(change.key);
    } else return EMPTY;
  }
}
