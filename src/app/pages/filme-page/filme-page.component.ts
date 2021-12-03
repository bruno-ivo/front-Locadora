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

@Component({
  selector: 'app-filme-page',
  templateUrl: './filme-page.component.html',
  styleUrls: ['./filme-page.component.scss']
})
export class FilmePageComponent implements OnInit {

  filmes: Filme[] = [];

  tiposMidia: any = Object.values(TipoDeMidiaEnum);


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
  ],
  declarations: [FilmePageComponent],
  exports: [FilmePageComponent],
})
export class FilmePageComponentModule {}
