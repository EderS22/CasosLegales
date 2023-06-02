import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { EmpleadoService } from 'src/app/pages/services/casolegales/empleadoservice/empleado.service';
import { UsuariosService } from 'src/app/pages/services/acceso/usuario/usuarios.service';
import { getDateMeta } from '@fullcalendar/core/internal';


@Component({
  selector: 'app-reportecaso',
  templateUrl: './reportecaso.component.html',
  styleUrls: ['./reportecaso.component.scss']
})

export class ReportecasoComponent implements OnInit {

  @ViewChild('pdfViewer', { static: true }) pdfViewer!: ElementRef;
  errorMessage!: string;

  constructor(
    public service: EmpleadoService,
    public UsuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.generatePDF();
  }

  generatePDF(): void {
    var doc = new jsPDF();
    const logoImg = '../../../../../assets/images/users/logoLeyMaxima.png'; //logo


    // Ajustar márgenes y agregar texto con saltos de línea automáticos
    doc.setLineWidth(0.5); // Establecer el ancho de línea para los márgenes
    const marginX = 10; // Margen izquierdo
    const marginY = 40; // Margen superior
    const maxWidth = 190; // Ancho máximo de texto
    console.log(maxWidth)
    const lineHeight = 5; // Altura de línea

    doc.setFont('Times New Roman')
    var text = 'La película inicia con una transmisión enviada:' + ' \n\npor el agente Leland Turbo a su amigo,' + ' el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugar. La película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugar.\n'; // Texto largo
    doc.setFontSize(12); // Establecer tamaño de fuente

    //doc.text(text, marginX, marginY, { maxWidth: 190, align: "justify" })


    


    /*
    let y = marginY; // Posición vertical inicial
    const lines = doc.splitTextToSize(text, maxWidth, { align: "justify" }); // Dividir el texto en líneas

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (y + lineHeight > doc.internal.pageSize.height - marginY) {
        doc.addPage(); // Agregar una nueva página si no hay suficiente espacio vertical
        y = marginY; // Reiniciar la posición vertical en la nueva página
      }
      //doc.text(line, marginX, y, { align: 'justify' }); // Agregar la línea de texto
      doc.text(line,  marginX, y, { maxWidth: maxWidth, align: "justify" });
      y += lineHeight; // Incrementar la posición vertical
    }
    */



    /*
    var text = 'hola';
    const lines2 = doc.splitTextToSize(text, maxWidth); // Dividir el texto en líneas
    for (let i = 0; i < lines2.length; i++) {
      if (y + lineHeight > doc.internal.pageSize.height - marginY) {
        doc.addPage(); // Cambiar a la siguiente página si no hay suficiente espacio vertical
        y = marginY; // Restablecer la posición vertical inicial
      }
      doc.text(lines2[i], marginX, y, { align: 'justify', lineHeightFactor: 1.5, maxWidth: 190 }); // Agregar la línea de texto
      y += lineHeight; // Aumentar la posición vertical
    }


    */

    /*
    this.UsuarioService.getUsuarios().subscribe(
      (data: any) => {
        localStorage.setItem('imagen', JSON.stringify(data.data));
      },
      (error: any) => {
        console.error('Ocurrió un error:', error);
      }
    );

    var w = 25;
    var h = 25;
    var mx = 15
    const currentUserString = localStorage.getItem('imagen');
    let img2: any; // Puedes ajustar el tipo de 'currentUser' según la estructura del objeto esperado

    if (currentUserString !== null) {
      img2 = JSON.parse(currentUserString);
      var i = 1;
      for (let index = 0; index < img2.length; index++, i++) {

        doc.addImage('https://i.ibb.co/khddQKD/logoe.png', '', mx, y, w, h);
        mx = mx + 25
        if (i == 7) {
          i = 0;
          y = y + 25;
          mx = 15
        }
        //doc.addImage('', '', mx, y, w, h);

        // if (img2[index]) {
        //   doc.addImage(img2[1].usua_img, '', mx, y, w, h);
        //   mx = mx + 20
        //   //console.log(mx)
        //   console.log(img2[index].usua_img)
        // } else {
        //   console.error('La imagen no está disponible');
        // }
      }
    }


    */


    // Agregar imagen en todas las páginas
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {

      // Obtener el ancho y alto del logo
      const imgWidth = 25;
      const imgHeight = 25;
      doc.setPage(i); // Establecer la página actual
      doc.addImage(logoImg, 'PNG', 180, 5, imgWidth, imgHeight);

      // Agregar el título "ley maxima"
      doc.setFontSize(13);
      doc.setTextColor('black');
      doc.setFont('Times New Roman');
      doc.text('Casos Legales LeyMaxima', 10, 18);

      doc.setFontSize(14);
      doc.setTextColor('black')
      doc.text('_____________________________________________________________________', 10, 20);

      //DEFINIR EL ANCHO DE LA PAGINA DONDE ESTARA EL FOOTER
      const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

      //FOOTER
      const myFooter1 = ['Casos Legales LeyMaxima', i.toString()];
      doc.setFontSize(10);
      doc.setTextColor(100)
      doc.text(myFooter1, pageWidth / 2, pageHeight - 7, { align: 'center' });
    }

    const pdfDataUri = doc.output('datauristring'); //hace visual el pdf
    this.pdfViewer.nativeElement.src = pdfDataUri;

  }

}
