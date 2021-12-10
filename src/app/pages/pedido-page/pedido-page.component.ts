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
import { ItemPedido } from '../../shared/models/itens-do-pedido';
import applyChanges from 'devextreme/data/apply_changes';


@Component({
  selector: 'app-pedido-page',
  templateUrl: './pedido-page.component.html',
  styleUrls: ['./pedido-page.component.scss']
})
export class PedidoPageComponent implements OnInit {

  pedidos: Pedido[] = [];

  clientes: Cliente[] = [];

  filmes: Filme[] = [];

  itensPedido: ItemPedido[] = [];


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
    let dados: Pedido = event.data;
    dados.valorTotal = 0;
    console.log(dados);
    const pedidoNovo = await this.pedidoService.adicionarPedido(dados).toPromise();
    this.pedidos = applyChanges(this.pedidos, [pedidoNovo], {keyExpr: 'id'});
    this.getPedidos();
  }

  async editarPedido(e: any){
    e.data = Object.assign(e.oldData, e.newData);
    const pedidoAlterado = await this.pedidoService.atualizarPedido(e.data).toPromise();
    this.pedidos.push(pedidoAlterado);
    this.getPedidos();
  }

  async removerPedido(e: any){
   this.pedidos =  await this.pedidoService.removerPedido(e.key).toPromise();
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

  adicionarLinhaNoGrid(event: any, data: any){
    for(let item of event.changes){
      if(item.type=='insert'){
        item.data.valorTotal = item.data.quantidade*item.data.filme.valorDoFilme;
        console.log(item.data.valorTotal);
      }
      else if(item.type=='update'){
        item.data = Object.assign(event.key, event.data);
        item.data.valorTotal = item.data.quantidade*item.key.filme.valorDoFilme;
        data.value = applyChanges(data.value, [item.data], {keyExpr: 'id'});
        console.log(item.data.valorTotal);

      }
    }

    data.setValue(data.value);
  }

  valueChangeFilme(event: any, data: any){
    data.data.filme = event;
    event = new Filme();
    console.log(event);
    data.setValue(this.filmes.find(x => x.id == event));
  }

  valueChangeCliente(event: any, data:any){
    data.setValue(this.clientes.find(x => x.id == event));
  }

  onInitNewRowItemPedido(event: any){
    if(!event.data.itensDoPedido){
      event.data.itensDoPedido = new Array<ItemPedido>();
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
