import { TipoDeMidiaEnum } from './tipo-de-midia.enum';
export class Filme{
  id!: number ;
  nomeDoFilme!: string;
  tipo!: TipoDeMidiaEnum;
  codigoDoFilme!: string;
  valorDoFilme!: number;
}
