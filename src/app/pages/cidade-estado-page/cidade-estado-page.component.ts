import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cidade-estado-page',
  templateUrl: './cidade-estado-page.component.html',
  styleUrls: ['./cidade-estado-page.component.scss']
})
export class CidadeEstadoPageComponent implements OnInit {

  valorEstado: any;

  valorCidade: any;


  onMudouValorEstado(evento: any){
    this.valorEstado = evento;
    console.log(evento);
  }

  onMudouValorCidade(evento: any){
    this.valorCidade = evento;
    console.log(evento);
  }


  constructor() { }

  ngOnInit(): void {
  }


}
