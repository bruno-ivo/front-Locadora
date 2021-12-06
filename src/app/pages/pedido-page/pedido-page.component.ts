import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DxFormModule, DxLoadIndicatorModule, DxSelectBoxModule, DxDataGridModule, DevExtremeModule } from 'devextreme-angular';
import { Pedido } from 'src/app/shared/models/pedido';
import { PedidoService } from '../../shared/services/pedido.service';
import { Cliente } from '../../shared/models/cliente';
import { ClienteService } from '../../shared/services/cliente.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pedido-page',
  templateUrl: './pedido-page.component.html',
  styleUrls: ['./pedido-page.component.scss']
})
export class PedidoPageComponent implements OnInit {

  pedidos: Pedido[] = [];

  //clientes: any = this.clienteService.listarCLientes().toPromise();

  constructor(private pedidoService: PedidoService,
              private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  async getPedidos(){
    this.pedidos = await this.pedidoService.listarPedidos().toPromise();
  }

  async removerPedido(e: any){
   this.pedidos =  await this.pedidoService.removerPedido(e.key.id).toPromise();
   this.getPedidos();
  }

  getDisplayCliente(cliente: Cliente){
    if (cliente) {
      return cliente.codigo + ' - ' + cliente.nome;
    }
    return cliente;
  }

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
  declarations: [PedidoPageComponent],
  exports: [PedidoPageComponent],
})
export class PedidoPageComponentModule {}
