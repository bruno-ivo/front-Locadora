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

  async adicionarPedido(event: any){
    let dados = event.data;
    dados.ValorTotal = 0;
    console.log(dados);
    const pedidoNovo = await this.pedidoService.adicionarPedido(dados).toPromise();
  /*    this.pedidos.forEach(() =>  {
      event.data.valorTotal = event.data.valorTotal + event.data.itensDoPedido.valorTotal;
    }); */

    //this.getPedidos();
  }

  async editarPedido(e: any){

  }

  async removerPedido(e: any){
   this.pedidos =  await this.pedidoService.removerPedido(e.key.id).toPromise();
   this.getPedidos();
  }

  getDisplayCliente(cliente: Cliente){
    if (cliente) {
      return cliente.codigoDoCliente + ' - ' + cliente.nome;
    }
    return cliente;
  }

  getDisplayFilme(filme: Filme){
    if (filme) {
      return filme.codigoDoFilme + ' - ' + filme.nomeDoFilme + ' - ' + filme.tipo;
    }
    return filme;
  }

  adicionarLinhaNoGrid(e: any){
    let item = e.changes[0];
    if(item.type=='insert'){
      item.data.valorTotal = item.data.quantidade*item.data.filme.valorDoFilme;
    }
    else if(item.type=='update' && item.data.quantidade){
      item.data.valorTotal = item.data.quantidade*item.key.filme.valorDoFilme;
    }
  }

  valueChangeFilme(event: any, data: any){
    data.data.filme = event;
    event = new Filme();
    console.log(event);
  }

  valueChangeCliente(event: any, data:any){
    data.data.cliente = event;
    event = new Cliente();
    console.log(event);

  }

  onInitNewRowItemPedido(event: any){
    if(!event.data.itensDoPedido){
      event.data.itensDoPedido = new Array<ItensDoPedido>();
    }
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

/*     let itensDoPedido = new ItensDoPedido();

itensDoPedido.pedido = e.data.pedido;
itensDoPedido.quantidade =  e.data.quantidade;
itensDoPedido.filme.nomeDoFilme =  e.data.filme.nomeDoFilme;
itensDoPedido.filme.tipo =  e.data.filme.tipo;
itensDoPedido.filme.codigo =  e.data.filme.codigo;
itensDoPedido.filme.valorDoFilme =  e.data.filme.valorDoFilme;
itensDoPedido.valorTotal =  e.data.filme.valorDoFilme * e.data.quantidade;

e.push(this.itensPedido); */




/*     data.data.itemPedido = e;
let item = new ItensDoPedido();
item.id = e
item.filme = e;
item.pedido = e;
item.quantidade = e;
item.valorTotal = e;

console.log(item);


this.itensPedido.push(item);
*/
//item.quantidade =  e.data.quantidade;
//item.id = e.change.id;
//item.valorTotal = item.filme.valorDoFilme * e.change.data.quantidade;
// data.data.valorDoFilme = item.filme.valorDoFilme;
//console.log(e);
