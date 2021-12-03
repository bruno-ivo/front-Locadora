import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly APICliente = '/api/clientes';

  constructor(private http: HttpClient) {}

  public listarCLientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.APICliente}`);
  }

  public adicionarCliente(data: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.APICliente}`, data);
  }
  public atualizarCliente(data: Cliente): Observable<Cliente> {
    console.log(data);
    return this.http.put<Cliente>(`${this.APICliente}/${data.id}`, data);
  }

  public removerCliente(data: Cliente): Observable<any> {
    return this.http.delete<Cliente>(`${this.APICliente}/${data.id}`);
  }

  //Tentativa com promise direto no service

  /* export class Change<T> {
    type!: 'insert' | 'update' | 'remove';

    key: any;

    data!: Partial<T>;
  } */
  /*   cliente: Cliente[] = [];

     private cliente$ = new BehaviorSubject<Cliente[]>([]);  */
  /*   updateOrders(change: Change<Cliente>, data: Cliente) {
      change.data = data;
      const clientes = applyChanges(this.cliente$.getValue(), [change], { keyExpr: 'id' });
      this.cliente$.next(clientes);
    } */
  /*   updateOrders(change: Change<Cliente>, data: Cliente) {
    change.data = data;
    const clientes = applyChanges(this.cliente$.getValue(), [change], { keyExpr: 'id' });
    this.cliente$.next(clientes);
  } */

  //listarCLientes(): Observable<Cliente[]> {
  //return this.http.get<Cliente[]>(`${this.APICliente}`);
  /* this.http.get<Cliente[]>(`${this.APICliente}`,{ withCredentials: true }).toPromise().then((cliente) => {
      this.cliente$.next(cliente);
    });
    return this.cliente$.asObservable(); */

  /*   async adicionarCliente(change: Change<Cliente>): Promise<Cliente> {
      const httpParams = new HttpParams({ fromObject: { values:
        JSON.stringify(change.data) } });
      const httpOptions = { withCredentials: true, body: httpParams };
      const url = await this.http.post<Cliente>(`${this.APICliente}/`, httpParams,  httpOptions).toPromise();
      this.updateOrders(change, url);
      return url;
    } */
  // atualizarCliente(key: any, data : Cliente): Observable<Cliente> {
  /* const httpParams = new HttpParams({ fromObject: { key: change.key, values: JSON.stringify(change.data) } });
    const httpOptions = { withCredentials: true, body: httpParams }; */
  // this.atualizaMudancas(dados, data);
  //const url =  await this.http.put<Cliente>(`${this.APICliente}/${key}`, httpParams, httpOptions).toPromise();
  /* this.updateOrders(change, url); */
  /*     .pipe(
      mergeMap(
        event => {
          return url.map(
            () =>  data , change.data
            )
          }
          )
          ); */

  /*  async removerCliente(key: any, change: Change<Cliente>): Promise<any> {
    const httpParams = new HttpParams({ fromObject: { key: change.key }});
    const httpOptions = { withCredentials: true, body: httpParams };
    //debugger;
    const url = await this.http.delete<Cliente>(`${this.APICliente}/${key}`,httpOptions ).toPromise();
    this.updateOrders(change, url);
    return url;
  } */

  /*   async salvarAlteracoes(change: any){
/*     switch (change.type) {
      case 'insert':
        return this.adicionarCliente(change);
      case 'update':
        return this.atualizarCliente(change.key, change);
      case 'remove':
        return this.removerCliente(change.key, change);
    } */

  /*  if (change.type == 'insert')
    return this.adicionarCliente(change.data);
    else if (change.type == 'update') {
      //applyChanges([this.cliente$.getValue()], [change.data], { keyExpr: 'id' });
      change.data = Object.assign(change.key, change.data);
      let alterado = this.atualizarCliente(change.key, change.data);
      return this.cliente = applyChanges(this.cliente, [alterado], { keyExpr: 'id'});
    } else if (change.type == 'remove') {
      //applyChanges([this.cliente], [change.data], {keyExpr: 'id'});
      return this.removerCliente(change.key);
    } else return EMPTY;
  } */
}
