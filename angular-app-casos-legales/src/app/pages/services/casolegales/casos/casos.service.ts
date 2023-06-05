import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import { AcusadoPorCaso } from 'src/app/pages/models/casoslegales/AcusadoPorCaso';
import { Caso } from 'src/app/pages/models/casoslegales/Caso';
import { DetalleVeredicto } from 'src/app/pages/models/casoslegales/DetalleVeredicto';
import { EvidenciaPorCaso } from 'src/app/pages/models/casoslegales/EvidenciaPorCaso';
import { TestigoPorCaso } from 'src/app/pages/models/casoslegales/TestigoPorCaso';
import { Veredicto } from 'src/app/pages/models/casoslegales/Veredicto';
import { reporte } from 'src/app/pages/models/casoslegales/reporte';

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

    insertarCaso(item:Caso){
        return this.http.post(API_URL + 'Casos/Insertar', item);
    }

    insertarAcusadoPorCaso(item:AcusadoPorCaso){
        return this.http.post(API_URL + 'AcusadosPorCaso/Insertar', item);
    }

    insertTestigoPorCaso(item:TestigoPorCaso){
        return this.http.post(API_URL + 'TestigosPorCaso/Insertar', item);
    }

    insertEvidenciaPorCaso(item:EvidenciaPorCaso){
        return this.http.post(API_URL + 'EvidenciasPorCaso/Insertar', item);
    }

    insertarVeredicto(item:Veredicto){
        return this.http.post(API_URL + 'Veredictos/Insertar', item);
    }

    insertarDetalleVeredicto(item:DetalleVeredicto){
        return this.http.post(API_URL + 'DetallesVeredicto/Insertar', item);
    }




    DatosReporte(id: number){
        return this.http.get<reporte[]>(API_URL + 'Casos/BuscarDatosReporte?id='+ id)
    }
    ReporteAcusadosPorCaso(id: number){
        return this.http.get<AcusadoPorCaso[]>(API_URL + 'AcusadosPorCaso/AcusadoPorCasoReporte?id='+ id)
    } 
    ReporteEvidenciaporCaso(id: number){
        return this.http.get<EvidenciaPorCaso[]>(API_URL + 'EvidenciasPorCaso/ReporteEvidenciaPorCaso?id='+ id)
    } 
    ReporteTestigosPorCaso(id: number){
        return this.http.get<TestigoPorCaso[]>(API_URL + 'TestigosPorCaso/TestigosPorCasoReporte?id='+ id)
    } 
    ReporteVeredicto(id: number){
        return this.http.get<Veredicto[]>(API_URL + 'Veredictos/VeredictoReporte?id='+ id)
    }

}
