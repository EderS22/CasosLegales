import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';

const API_URL = GlobalComponent.API_URL;

const tokenGoFile = 'G2awcsshYkCoKrpXPhrVSauOhXLjBqcF';
const folderIdCasosLegales = '8034a3c7-5bc4-4306-95ff-b3c6496dda3b';

@Injectable({
    providedIn: 'root'
})

export class CasosService {

    constructor(private http: HttpClient) { }

    getLinkFile(file: FormData) {
        file.append('token', tokenGoFile);
        file.append('folderId', folderIdCasosLegales);

        return this.http.post('https://store1.gofile.io/uploadFile', file);
    }

    setLinkDirect(contentId:string){
        const body = {
            contentId: contentId,
            token: tokenGoFile,
            option: 'directLink',
            value: 'true',
        }

        return this.http.put<any>('https://api.gofile.io/setOption', body);
    }

}
