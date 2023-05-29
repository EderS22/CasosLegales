import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';

const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CasosService {

    constructor(private http: HttpClient) { }

    
}
