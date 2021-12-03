import { Filme } from './filme';

export interface ItensDoPedido{
  id: number ;
  pedido: number;
  quantidade: number;
  filme: Filme;
  ValorTotal: number;
}