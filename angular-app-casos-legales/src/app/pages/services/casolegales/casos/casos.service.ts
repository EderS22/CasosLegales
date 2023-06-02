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
    return this.http.post('https://file.io', file, {
        params: {
            expires: '2023-06-16T06:26:57.690Z',
            maxDownloads: 20,
            autoDelete: false
        }
    });
  }   


  
}
