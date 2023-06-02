import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';

const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CasosService {

  constructor(private http: HttpClient) { }

  getLinkImageDemandante(file:FormData){
    return this.http.post('https://file.io', file);
  }   

  getLinkImage(file:FormData){
    return this.http.post('https://store1.gofile.io/uploadFile', file, {
      params: {
        token: 'G2awcsshYkCoKrpXPhrVSauOhXLjBqcF',
        folderId: 'f318b7b8-c776-472e-8bea-81424bb8771a'
      }
    });
  }

  getLinkDocument(file:FormData){
    return this.http.post('https://store1.gofile.io/uploadFile', file, {
      params: {
        token: 'G2awcsshYkCoKrpXPhrVSauOhXLjBqcF',
        folderId: 'f318b7b8-c776-472e-8bea-81424bb8771a'
      }
    });
  }
  
}
