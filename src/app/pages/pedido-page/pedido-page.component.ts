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
import { Filme } from 'src/app/shared/models/filme';
import { FilmeService } from '../../shared/services/filme.service';
import { ItensDoPedido } from '../../shared/models/itens-do-pedido';


@Component({
  selector: 'app-pedido-page',
  templateUrl: './pedido-page.component.html',
  styleUrls: ['./pedido-page.component.scss']
})
export class PedidoPageComponent implements OnInit {

  pedidos: Pedido[] = [];

  clientes: Cliente[] = [];

  filmes: Filme[] = [];

  itensPedido: ItensDoPedido[] = [];

  constructor(private pedidoService: PedidoService,
              private clienteService: ClienteService,
              private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.getPedidos();
    this.getClientes();
    this.getFilmes();
  }

  async getClientes(){
   this.clientes = await this.clienteService.listarCLientes().toPromise();
  }

  async getFilmes(){
    this.filmes = await this.filmeService.listarFilmes().toPromise();
  }

  async getPedidos(){
    this.pedidos = await this.pedidoService.listarPedidos().toPromise();
  }

  async adicionarPedido(e: any){
    let pedidoNovo = await this.pedidoService.adicionarPedido(e.data).toPromise();
    this.pedidos.push(pedidoNovo);
    this.getPedidos();
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

  getDisplayFilme(filme: Filme){
    if (filme) {
      return filme.codigo + ' - ' + filme.nomeDoFilme + ' - ' + filme.tipo;
    }
    return filme;
  }

  adicionarLinhaDeItem(e: any){
    console.log(e);
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
