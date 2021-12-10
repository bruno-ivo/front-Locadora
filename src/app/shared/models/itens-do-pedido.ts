import { Filme } from './filme';
import { Pedido } from './pedido';

export class ItemPedido{
  id!: number ;
  pedido!: Pedido;
  quantidade!: number;
  filme!: Filme;
  valorTotal!: number;
}
