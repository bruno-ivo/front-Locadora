import { Cliente } from 'src/app/shared/models/cliente';
import { ItensDoPedido } from './itens-do-pedido';

export interface Pedido{
  id: number ;
  cliente: Cliente;
  dataDeLocacao: Date;
  dataDeDevolucao: Date;
  ValorTotal: number;
  itensDoPedido: ItensDoPedido[];
}
