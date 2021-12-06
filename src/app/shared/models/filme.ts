import { TipoDeMidiaEnum } from './tipo-de-midia.enum';
export interface Filme{
  id: number ;
  nomeDoFilme: string;
  tipo: TipoDeMidiaEnum;
  codigo: string;
  ValorDoFilme: number;
}
