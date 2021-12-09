import { Filme } from './filme';

export class ItensDoPedido{
  id!: number ;
  pedido!: number;
  quantidade!: number;
  filme!: Filme;
  valorTotal!: number;
}
