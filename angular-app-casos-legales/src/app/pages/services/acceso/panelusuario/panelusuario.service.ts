import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class PanelusuarioService {

  constructor(private http: HttpClient) { }

  apikey: string = 'f309945124142acdb4d64f0df1bb5271'

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData);
    return this.http.post<any>(`https://api.imgbb.com/1/upload?key=${this.apikey}`, formData);
  }

}
