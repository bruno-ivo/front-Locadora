import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
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
import applyChanges from 'devextreme/data/apply_changes';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrls: ['./cliente-page.component.scss'],
})
export class ClientePageComponent implements OnInit {
  clientes: Cliente[] = [];

  isLoading = false;

  //loadPanelPosition = { of: '#gridContainer' };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();
  }

  async getClientes() {
    this.isLoading = true;
    this.clientes = await this.clienteService.listarCLientes().toPromise();
    this.isLoading = false;
  }

  onSaving(event: any) {
    this.isLoading = true;
    if (event) {
      event.cancel = true;
      event.promise = this.processSaving(event);
    }
  }

  async processSaving(event: any) {
    for (let change of event.changes) {
      if (change.type == 'insert') {
        let novoCliente = await this.clienteService
          .adicionarCliente(change.data)
          .toPromise();
        this.clientes.push(novoCliente);
        this.clientes = applyChanges(this.clientes, [novoCliente], {
          keyExpr: 'id',
        });
      } else if (change.type == 'update') {
        change.data = Object.assign(change.key, change.data);
        let clienteAlterado = await this.clienteService.atualizarCliente(change.data).toPromise();
        this.clientes = applyChanges(this.clientes, [clienteAlterado], {keyExpr: 'id'});
      } else if (change.type == 'remove') {
        await this.clienteService.removerCliente(change.key).toPromise();
      }
    }
    event.cancel = false;
    this.isLoading = false;
  }

  // metodo antigo
  /*   async processSaving(change: any) {
    this.isLoading = true;

    try {
      await (await this.clienteService.salvarAlteracoes(change));
      // this.changes = [];
    } finally {
      this.isLoading = false;
      this.getClientes();
      //this.router.navigate(['/clientes']);
    }
  } */
  /*
  ordersSubscription!: Subscription;

  clientes$: Observable<any> = new Observable<Cliente[]> ();

  changes: Change<Cliente>[] = [];



*/

  //editRowKey?: number| undefined;
  /*     this.clientes$ = this.clienteService.listarCLientes();

      this.isLoading = true;
      this.ordersSubscription = this.clientes$.subscribe((): void => {
        this.isLoading = false;
      }); */
  /*     get changesText(): string {
      return JSON.stringify(this.changes.map((change) => ({
        type: change.type,
        key: change.type !== 'insert' ? change.key : undefined,
        data: change.data,
      })), null, ' ');
    } */
  /*
  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  } */

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
