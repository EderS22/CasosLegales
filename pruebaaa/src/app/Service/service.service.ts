import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Categorias } from '../Model/Categorias'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url = "https://api.thecatapi.com/v1/categories";
  getCategoria(){
    return this.http.get<Categorias[]>(this.Url);
  }
}
