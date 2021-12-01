import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  DxFormModule,
  DxLoadIndicatorModule,
  DxSelectBoxModule,
  DxDataGridModule,
  DevExtremeModule,
} from 'devextreme-angular';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrls: ['./cliente-page.component.scss'],
})
export class ClientePageComponent implements OnInit {
  clientes: Cliente[] = [];

  /*
  changes: Change<Cliente>[] = [];
  ordersSubscription: Subscription = new Subscription;

  clientes$: Observable<Cliente[]> = new Observable<Cliente[]> ();

*/

  isLoading = false;

  //editRowKey?: number| undefined;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();

    //this.clientes$ = this.clienteService.listarCLientes();

    /*     this.isLoading = false;
    this.ordersSubscription = this.clientes$.subscribe((): void => {
      this.isLoading = false;
      this.clientes$
    }); */
  }

  getClientes() {
    this.clienteService.listarCLientes().subscribe((c) => {
      this.clientes = c;
    });
  }

  /*   get changesText(): string {
    return JSON.stringify(this.changes.map((change) => ({
      type: change.type,
      key: change.type !== 'insert' ? change.key : undefined,
      data: change.data,
    })), null, ' ');
  } */

  onSaving(event: any) {
    //debugger;
    const change = event.changes[0];

    if (change) {
      event.cancel = false;
      event.promise = this.processSaving(change);
      console.log(event.changes);
    }
  }

  async processSaving(change: any) {
    this.isLoading = true;

    try {
      await this.clienteService.salvarAlteracoes(change).toPromise();
    } finally {
      this.isLoading = false;
      this.getClientes();
      //this.router.navigate(['/clientes']);
    }
  }

  /*
  async adicionarCliente(change: Change<Cliente>): Promise<Cliente>{
    const httpParams = new HttpParams({ fromObject: { values:
      JSON.stringify(change.data) } });
    const httpOptions =  { withCredentials: true, body: httpParams };
    const data = await this.http.post<Cliente>(`${this.APICliente}/InsertOrder`,
      httpParams, httpOptions).toPromise();

     this.updateOrders(change, data);

     return data;
  }

  async atualizarCliente(change: Change<Cliente>): Promise<Cliente>{
    const httpParams = new HttpParams({ fromObject: { key: change.key, values: JSON.stringify(change.data) } });
    const httpOptions = { withCredentials: true, body: httpParams };
    const data = await this.http.put<Cliente>(`${this.APICliente}/UpdateOrder`, httpParams,
    httpOptions).toPromise();

    this.updateOrders(change, data);


    return data;
  }

  async removerCliente(change: Change<Cliente>): Promise<Cliente>{
    const httpParams = new HttpParams({ fromObject: { key: change.key } });
    const httpOptions = { withCredentials: true, body: httpParams };
    const data = await this.http.delete<Cliente>(`${this.APICliente}/DeleteOrder`,
    httpOptions).toPromise();

    this.updateOrders(change, data);

    return data;
  }
*/
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DevExtremeModule,
    HttpClientModule,
  ],
  declarations: [ClientePageComponent],
  exports: [ClientePageComponent],
})
export class ClientePageComponentModule {}
