import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DxFormModule, DxLoadIndicatorModule, DxSelectBoxModule, DevExtremeModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { Filme } from '../../shared/models/filme';
import { FilmeService } from '../../shared/services/filme.service';
import { TipoDeMidiaEnum } from '../../shared/models/tipo-de-midia.enum';
import { FirstKeysToConsolePipe, FirstKeysToConsoleModule } from '../../shared/core/first-keys-to-console.pipe';

@Component({
  selector: 'app-filme-page',
  templateUrl: './filme-page.component.html',
  styleUrls: ['./filme-page.component.scss']
})
export class FilmePageComponent implements OnInit {

  filmes: Filme[] = [];

   tiposMidia = this.getEnumArray(TipoDeMidiaEnum);

  /* tiposMidia: string[] = ['DVD', 'VHS' ]; */


  constructor(private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.getFilmes();
  }

  async getFilmes(){
    this.filmes = await this.filmeService.listarFilmes().toPromise();
  }

  async adicionarFilme(e: any){
    let filmeNovo = await this.filmeService.adicionaFilme(e.data).toPromise();
    this.filmes.push(filmeNovo);
    this.getFilmes();
  }

  async editaFilme(e: any){
    e.data = Object.assign(e.oldData, e.newData);
    let filmeAlterado = await this.filmeService.atualizaFilme(e.data).toPromise();
    this.filmes.concat(filmeAlterado);
    this.getFilmes();
  }

  async removerFilme(e: any){
    this.filmes = await this.filmeService.removerFilme(e.key).toPromise();
    this.getFilmes();
  }

  getTipoValue(data: any ){

    return data;
  }

  setTipoValue(event: any){
//    event.value = this.getKey(TipoDeMidiaEnum, event.value);
    this.getTipoValue(this.getKey(TipoDeMidiaEnum, event.value));
  }


  getKey(type: any, currentValue: string): string {
    for (let key in type) {
        if (type[key]==currentValue) {
            return key;
        }
    }
    return "";
}

getEnumArray(type: any): Array<any> {
  debugger;
  let novo = new Array();
  for (let key in type) {
      novo.push(type[key]);
  }
  return novo;
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
    FirstKeysToConsoleModule
  ],
  declarations: [FilmePageComponent],
  exports: [FilmePageComponent],
})
export class FilmePageComponentModule {}
