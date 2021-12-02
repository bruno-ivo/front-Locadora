import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import applyChanges from 'devextreme/data/apply_changes';
/* import { EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators'; */

export class Change<T> {
  type!: 'insert' | 'update' | 'remove';

  key: any;

  data!: Partial<any>;
}
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  //cliente: Cliente[] = [];

  private cliente$ = new BehaviorSubject<Cliente[]>([]);

  private readonly APICliente = '/api/clientes';

  constructor(private http: HttpClient) {}

  updateOrders(change: Change<Cliente>, data: Cliente) {
    change.data = data;
    const clientes = applyChanges(this.cliente$.getValue(), [change], { keyExpr: 'id' });
    this.cliente$.next(clientes);
  }

  listarCLientes(): Observable<Cliente[]> {
    //return this.http.get<Cliente[]>(`${this.APICliente}`);
    this.http.get<Cliente[]>(`${this.APICliente}`,{ withCredentials: true }).toPromise().then((cliente) => {
      this.cliente$.next(cliente);
    });
    return this.cliente$.asObservable();
  }

/*   adicionarCliente(data: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.APICliente}`, data);
  } */

  async adicionarCliente(change: Change<Cliente>): Promise<Cliente> {
    const httpParams = new HttpParams({ fromObject: { values:
      JSON.stringify(change.data) } });
    const httpOptions = { withCredentials: true, body: httpParams };
    const url = await this.http.post<Cliente>(`${this.APICliente}/`, httpParams,  httpOptions).toPromise();
    this.updateOrders(change, url);
    return url;
  }

  async atualizarCliente(key: any, change : Change<Cliente>): Promise<any> {
    const httpParams = new HttpParams({ fromObject: { key: change.key, values: JSON.stringify(change.data) } });
    const httpOptions = { withCredentials: true, body: httpParams };
    // this.atualizaMudancas(dados, data);
    const url =  await this.http.put<Cliente>(`${this.APICliente}/${key}`, httpParams, httpOptions).toPromise();
    this.updateOrders(change, url);
/*     .pipe(
     mergeMap(
       event => {
          return url.map(
            () =>  data , change.data
          )
       }
     )
      ); */
    console.log(url);

    return url;
  }
/*
  removerCliente(key: any): Observable<any> {
         const httpParams = new HttpParams({ fromObject: { key: data.id} });
    const httpOptions = { withCredentials: true, body: httpParams };
    debugger;
    return this.http.delete<Cliente>(`${this.APICliente}/${key}`);
  } */

  async removerCliente(key: any, change: Change<Cliente>): Promise<any> {
    const httpParams = new HttpParams({ fromObject: { key: change.key }});
    const httpOptions = { withCredentials: true, body: httpParams };
    //debugger;
    const url = await this.http.delete<Cliente>(`${this.APICliente}/${key}`,httpOptions ).toPromise();
    this.updateOrders(change, url);
    return url;
  }

  async salvarAlteracoes(change: Change<Cliente>): Promise<any>{
    switch (change.type) {
      case 'insert':
        return this.adicionarCliente(change);
      case 'update':
        return this.atualizarCliente(change.key, change);
      case 'remove':
        return this.removerCliente(change.key, change);
    }

    /* if (change.type == 'insert')
    return this.adicionarCliente(change.data);
    else if (change.type == 'update') {
      //applyChanges([this.cliente$.getValue()], [change.data], { keyExpr: 'id' });
      return this.atualizarCliente(change.key, change);
    } else if (change.type == 'remove') {
      //applyChanges([this.cliente], [change.data], {keyExpr: 'id'});
      return this.removerCliente(change.key);
    } else return EMPTY; */
  }
}
