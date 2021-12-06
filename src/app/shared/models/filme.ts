import { TipoDeMidiaEnum } from './tipo-de-midia.enum';
export interface Filme{
  id: number ;
  nomeDoFilme: string;
  tipo: TipoDeMidiaEnum;
  codigo: string;
  valorDoFilme: number;
}
