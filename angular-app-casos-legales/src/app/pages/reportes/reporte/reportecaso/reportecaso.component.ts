import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';

import 'jspdf-autotable';
import { EmpleadoService } from 'src/app/pages/services/casolegales/empleadoservice/empleado.service';
import { empleado } from 'src/app/pages/models/casoslegales/empleados';
import { getDateMeta } from '@fullcalendar/core/internal';

@Component({
  selector: 'app-reportecaso',
  templateUrl: './reportecaso.component.html',
  styleUrls: ['./reportecaso.component.scss']
})

export class ReportecasoComponent implements OnInit {

  
  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  errorMessage!: string;

  constructor(public service: EmpleadoService) { }

  ngOnInit(): void {
    this.generatePDF();
  }

  generatePDF(): void {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const header = ['Id', 'Nombre Completo', 'Sexo', 'Estado Civil'];
    const myFooter = ['Casos Legales LeyMaxima ',currentDate ];
    const tableData: any[] = [];
    //const pageCount = doc.internal.getNumberOfPages();

    const logoImg = '../../../../../assets/images/users/logoLeyMaxima.png';
    doc.addImage(logoImg, 'PNG', 180, 5, 25, 25);

    this.service.getempleados().subscribe(
      (response: any) => {
        console.log(response.data);
        const data = response.data;

        data.forEach((empleado: any) => {
          const rowData: any[] = [
            empleado.empe_Id,
            empleado.empe_NombreCompleto,
            empleado.empe_Sexo,
            empleado.eciv_Descripcion
          ];
          tableData.push(rowData);
        });

        doc.setFontSize(18);
        doc.text('Listado de Empleados', 14, 35);

        (doc as any).autoTable({
          head: [header],
          body: tableData,
          margin: { top: 40, bottom: 20 }
        });

        // PAGE FORMAT
        const pageHeight =doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        const pageWidth =doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        //FOOTER
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(myFooter, pageWidth / 2, pageHeight - 5, { align: 'center' });

        
        const pdfDataUri = doc.output('datauristring');
        this.pdfViewer.nativeElement.src = pdfDataUri;
      },
      (error: any) => {
        this.errorMessage = 'Se produjo un error al obtener los datos de los empleados.';
        console.error(error);
      }
    );
  }


}
