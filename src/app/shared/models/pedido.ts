import { Cliente } from 'src/app/shared/models/cliente';
import { ItemPedido } from './itens-do-pedido';

export class Pedido{
  id!: number ;
  cliente!: Cliente;
  dataDeLocacao!: Date;
  dataDeDevolucao!: Date;
  valorTotal!: number;
  itensDoPedido!: ItemPedido[];
}
