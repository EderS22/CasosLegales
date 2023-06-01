import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';

const API_URL = GlobalComponent.API_URL;

const API_File = "https://www.file.io/" ;

@Injectable({
  providedIn: 'root'
})
export class CasosService {

  constructor(private http: HttpClient) { }

  getLinkImageDemandante(file:FormData){
    return this.http.post<any>(API_File, file);
  }   
   
}
