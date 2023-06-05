import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { dI } from '@fullcalendar/core/internal-common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { forEach } from 'lodash';
import { Router } from '@angular/router';

import { UsuariosService } from 'src/app/pages/services/acceso/usuario/usuarios.service';
import { CasosService } from 'src/app/pages/services/casolegales/casos/casos.service';
import { CivilService } from 'src/app/pages/services/casolegales/civilesservice/civil.service';
import { EmpresaService } from 'src/app/pages/services/casolegales/empresaservice/empresa.service';


@Component({
  selector: 'app-reportecaso',
  templateUrl: './reportecaso.component.html',
  styleUrls: ['./reportecaso.component.scss']
})

export class ReportecasoComponent implements OnInit {

  @ViewChild('pdfViewer', { static: true }) pdfViewer!: ElementRef;
  errorMessage!: string;
  IdCaso!: number;


  constructor(
    public UsuarioService: UsuariosService,
    public CasoService: CasosService,
    public CivilesService: CivilService,
    public EmpresaService: EmpresaService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.IdCaso = parseInt(localStorage.getItem("caso_IdReporte") ?? '0', 0);

    if (this.IdCaso === 0) {
      this.router.navigate([""]);
    }

    this.generatePDF();

  }

  generatePDF(): void {
    var doc = new jsPDF();
    const logoImg = '../../../../../assets/images/users/logoLeyMaxima.png'; //logo


    // Ajustar márgenes y agregar texto con saltos de línea automáticos
    doc.setLineWidth(0.5); // Establecer el ancho de línea para los márgenes
    const marginX = 10; // Margen izquierdo
    const marginY = 45; // Margen superior
    const maxWidth = 190; // Ancho máximo de texto

    const lineHeight = 5; // Altura de línea

    doc.setFont('Times New Roman')
    doc.setFontSize(18); // Establecer tamaño de fuente
    doc.text('Información General del Caso', 10, 40);

    this.CasoService.DatosReporte(this.IdCaso)
      .subscribe((data: any) => {

        var caso_Abierto = 'Abierto'
        if (data.caso_Abierto === false) {
          caso_Abierto = 'Cerrado'
        }

        const fechaOriginal = data.caso_Fecha;
        const fecha = new Date(fechaOriginal);
        const anio = fecha.getFullYear();
        const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
        const dia = ("0" + fecha.getDate()).slice(-2);
        const fechaFormateada = dia + "/" + mes + "/" + anio;

        localStorage.setItem(
          'InformacionGeneral',
          '\n-Fecha del caso: ' + fechaFormateada +
          '\n-Tipo de caso: ' + data.tica_Nombre +
          '\n-Descripcion del caso: ' + data.caso_Descripcion +
          '\n-Juez encargado del caso: ' + data.abju_AbogadoNombre +
          '\n-Estado del Caso: ' + caso_Abierto
        );

        if (data.caso_TipoDemandante == 'C') {

          this.CivilesService.BuscarCivil(data.caso_IdDemandante)
            .subscribe((civil: any) => {

              localStorage.setItem(
                'InformacionDemandante',
                '\n-Tipo de demandante: ' + 'Civil' +
                '\n-Nombre del demandante: ' + civil.civi_NombreCompleto +
                '\n-DNI del demandante: ' + civil.civi_DNI +
                '\n-Sexo del demandante: ' + civil.civi_Sexo +
                '\n-Telefono del demandante: ' + civil.civi_Telefono
              )

            })
        }
        else {

          this.EmpresaService.BuscarEmpresa(data.caso_IdDemandante)
            .subscribe((civil: any) => {


              localStorage.setItem(
                'InformacionDemandante',
                '\n-Tipo de demandante: ' + 'Empresa' +
                '\n-Nombre de la empresa demandante: ' + civil.emsa_Nombre +
                '\n-RTN de la empresa demandante: ' + civil.emsa_RTN +
                '\n-Nombre del representante de la empresa demandante: ' + civil.emsa_RepresentanteNombre +
                '\n-DNI del representante de la empresa demandante: ' + civil.emsa_RepresentanteDNI +
                '\n-Telefono del representante de la empresa demandante: ' + civil.emsa_RepresentanteTelefono +
                '\n-Sexo del representante de la empresa demandante: ' + civil.emsa_RepresentanteSexo
              )

            })
        }

        localStorage.setItem('Veredicto','');
        this.CasoService.ReporteVeredicto(this.IdCaso)
          .subscribe((data: any) => {
            localStorage.setItem('Veredicto','');
            console.log(data)
            if(data.caso_Id > 0){
              localStorage.setItem(
                'Veredicto',
                '\n-Veredicto: ' + data.vere_Descripcion
              )
            }
          })


      })


    if (localStorage.getItem('InformacionGeneral') !== null && localStorage.getItem('InformacionDemandante') !== null) {
      var InformacionGeneral = localStorage.getItem('InformacionGeneral');
      var InformacionDemandante = localStorage.getItem('InformacionDemandante');
      var Veredicto = localStorage.getItem('Veredicto');
      if (InformacionGeneral !== null && InformacionDemandante !== null) {
        doc.setFontSize(13); // Establecer tamaño de fuente

        let y = marginY; // Posición vertical inicial
        const lines = doc.splitTextToSize(InformacionGeneral, maxWidth); // Dividir el texto en líneas

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (y + lineHeight > doc.internal.pageSize.height - marginY) {
            doc.addPage(); // Agregar una nueva página si no hay suficiente espacio vertical
            y = marginY; // Reiniciar la posición vertical en la nueva página
          }
          //doc.text(line, marginX, y, { align: 'justify' }); // Agregar la línea de texto
          doc.text(line, marginX, y, { maxWidth: maxWidth, align: "justify" });
          y += lineHeight; // Incrementar la posición vertical
        }

        // INFORMACION DEL DEMANDANTE
        doc.setFontSize(18); // Establecer tamaño de fuente
        doc.text('\n\nInformacion del Demandante', marginX, y)
        y += 18;

        doc.setFontSize(13); // Establecer tamaño de fuen
        const lines2 = doc.splitTextToSize(InformacionDemandante?.toString(), maxWidth); // Dividir el texto en líneas

        for (let i = 0; i < lines2.length; i++) {
          const line = lines2[i];
          if (y + lineHeight > doc.internal.pageSize.height - marginY) {
            doc.addPage(); // Agregar una nueva página si no hay suficiente espacio vertical
            y = marginY; // Reiniciar la posición vertical en la nueva página
          }
          //doc.text(line, marginX, y, { align: 'justify' }); // Agregar la línea de texto
          doc.text(line, marginX, y, { maxWidth: maxWidth, align: "justify" });
          y += lineHeight; // Incrementar la posición vertical
        }

        if (Veredicto !== null) {

          // INFORMACION DEL DEMANDANTE
          doc.setFontSize(18); // Establecer tamaño de fuente
          doc.text('\n\nVeredicto', marginX, y)
          y += 18;

          doc.setFontSize(13); // Establecer tamaño de fuen
          const vere = doc.splitTextToSize(Veredicto?.toString(), maxWidth); // Dividir el texto en líneas

          for (let i = 0; i < vere.length; i++) {
            const line = vere[i];
            if (y + lineHeight > doc.internal.pageSize.height - marginY) {
              doc.addPage(); // Agregar una nueva página si no hay suficiente espacio vertical
              y = marginY; // Reiniciar la posición vertical en la nueva página
            }
            //doc.text(line, marginX, y, { align: 'justify' }); // Agregar la línea de texto
            doc.text(line, marginX, y, { maxWidth: maxWidth, align: "justify" });
            y += lineHeight; // Incrementar la posición vertical
          }
        }

      }

    }



    //---------  ACUSADOS POR CASO ------

    doc.addPage()
    doc.setFontSize(18); // Establecer tamaño de fuente
    doc.text('Información de los Acusados', 10, 40);
    this.CasoService.ReporteAcusadosPorCaso(this.IdCaso)
      .subscribe((acus: any) => {
        localStorage.setItem('InformacionAcusado', '')
        acus.data.forEach((item: any) => {
          if (item.acus_TipoAcusado == 'C') {
            this.CivilesService.BuscarCivil(item.acus_Acusado)
              .subscribe((civil: any) => {
                localStorage.setItem(
                  'InformacionAcusado',
                  localStorage.getItem('InformacionAcusado') +
                  '\n-Tipo de Acusado: ' + 'Civil' +
                  '\n-Nombre del acusado: ' + civil.civi_NombreCompleto +
                  '\n-DNI del acusado: ' + civil.civi_DNI +
                  '\n-Sexo del acusado: ' + civil.civi_Sexo +
                  '\n-Telefono del acusado: ' + civil.civi_Telefono + '\n\n'
                )
              })
          }
          else {
            this.EmpresaService.BuscarEmpresa(item.acus_Acusado)
              .subscribe((civil: any) => {
                localStorage.setItem(
                  'InformacionAcusado',
                  '\n-Tipo de demandante: ' + 'Empresa' +
                  '\n-Nombre de la empresa demandante: ' + civil.emsa_Nombre +
                  '\n-RTN de la empresa demandante: ' + civil.emsa_RTN +
                  '\n-Nombre del representante de la empresa demandante: ' + civil.emsa_RepresentanteNombre +
                  '\n-DNI del representante de la empresa demandante: ' + civil.emsa_RepresentanteDNI +
                  '\n-Telefono del representante de la empresa demandante: ' + civil.emsa_RepresentanteTelefono +
                  '\n-Sexo del representante de la empresa demandante: ' + civil.emsa_RepresentanteSexo
                )
              })
          }
        })
      })

    if (localStorage.getItem('InformacionAcusado') !== null) {
      var InformacionAcusado = localStorage.getItem('InformacionAcusado');

      if (InformacionAcusado !== null) {
        doc.setFontSize(13); // Establecer tamaño de fuente

        let y = marginY; // Posición vertical inicial
        const lines = doc.splitTextToSize(InformacionAcusado, maxWidth); // Dividir el texto en líneas

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (y + lineHeight > doc.internal.pageSize.height - marginY) {
            doc.addPage(); // Agregar una nueva página si no hay suficiente espacio vertical
            y = marginY; // Reiniciar la posición vertical en la nueva página
          }
          //doc.text(line, marginX, y, { align: 'justify' }); // Agregar la línea de texto
          doc.text(line, marginX, y, { maxWidth: maxWidth, align: "justify" });
          y += lineHeight; // Incrementar la posición vertical
        }
      }
    }



    // ------ TESTIMONIOS


    this.CasoService.ReporteTestigosPorCaso(this.IdCaso)
      .subscribe((acus: any) => {
        localStorage.setItem('TestigosDemandante', '')
        localStorage.setItem('TestigosDemandado', '')

        acus.data.forEach((item: any) => {

          if (item.teca_Demandante == true) {

            this.CivilesService.BuscarCivil(item.teca_Testigo)
              .subscribe((civil: any) => {

                localStorage.setItem(
                  'TestigosDemandante',
                  localStorage.getItem('TestigosDemandante') +
                  '\n-Nombre del testigo: ' + civil.civi_NombreCompleto +
                  '\n-DNI del testigo: ' + civil.civi_DNI +
                  '\n-Sexo del testigo: ' + civil.civi_Sexo +
                  '\n-Telefono del testigo: ' + civil.civi_Telefono +
                  '\n-Testimonio: ' + item.teca_Declaracion + '\n\n'
                )

              })
          }
          else {
            this.CivilesService.BuscarCivil(item.teca_Testigo)
              .subscribe((civil: any) => {

                localStorage.setItem(
                  'TestigosDemandado',
                  localStorage.getItem('TestigosDemandado') +
                  '\n-Nombre del testigo: ' + civil.civi_NombreCompleto +
                  '\n-DNI del testigo: ' + civil.civi_DNI +
                  '\n-Sexo del testigo: ' + civil.civi_Sexo +
                  '\n-Telefono del testigo: ' + civil.civi_Telefono +
                  '\n-Testimonio: ' + item.teca_Declaracion + '\n\n'
                )
              })
          }
        })
      })


    doc.addPage()
    doc.setFontSize(18); // Establecer tamaño de fuente
    doc.text('Testimonios Demandante', 10, 40);

    if (localStorage.getItem('TestigosDemandante') !== null && localStorage.getItem('TestigosDemandado') !== null) {
      var TestimoniosDemandate = localStorage.getItem('TestigosDemandante');
      var TestimoniaDemandado = localStorage.getItem('TestigosDemandado');

      if (TestimoniosDemandate !== null && TestimoniaDemandado !== null) {
        doc.setFontSize(13); // Establecer tamaño de fuente

        let y = marginY; // Posición vertical inicial
        const lines = doc.splitTextToSize(TestimoniosDemandate, maxWidth); // Dividir el texto en líneas

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (y + lineHeight > doc.internal.pageSize.height - marginY) {
            doc.addPage(); // Agregar una nueva página si no hay suficiente espacio vertical
            y = marginY; // Reiniciar la posición vertical en la nueva página
          }
          //doc.text(line, marginX, y, { align: 'justify' }); // Agregar la línea de texto
          doc.text(line, marginX, y, { maxWidth: maxWidth, align: "justify" });
          y += lineHeight; // Incrementar la posición vertical
        }

        doc.setFontSize(18); // Establecer tamaño de fuente
        doc.text('Testimonios Demandado', 10, y);
        y += 5
        doc.setFontSize(13); // Establecer tamaño de fuente
        const lines2 = doc.splitTextToSize(TestimoniaDemandado, maxWidth); // Dividir el texto en líneas
        for (let i = 0; i < lines2.length; i++) {
          const line = lines2[i];
          if (y + lineHeight > doc.internal.pageSize.height - marginY) {
            doc.addPage(); // Agregar una nueva página si no hay suficiente espacio vertical
            y = marginY; // Reiniciar la posición vertical en la nueva página
          }
          //doc.text(line, marginX, y, { align: 'justify' }); // Agregar la línea de texto
          doc.text(line, marginX, y, { maxWidth: maxWidth, align: "justify" });
          y += lineHeight; // Incrementar la posición vertical
        }
      }

    }

    //EVIDENCIA
    this.CasoService.ReporteEvidenciaporCaso(this.IdCaso)
      .subscribe((acus: any) => {
          localStorage.setItem('EvidenciaDemandante', '')
          localStorage.setItem('EvidenciaDemandado', '')
          
        if (acus.data.length > 0) {
        

          acus.data.forEach((item: any) => {

            if (item.tiev_Id == 1 && item.evca_Demandante == true) {

              localStorage.setItem(
                'EvidenciaDemandante',
                localStorage.getItem('EvidenciaDemandante') + item.evca_UrlArchivo + ',,,&&&,,,'
              )

            }
            else if (item.tiev_Id == 1 && item.evca_Demandado == true) {

              localStorage.setItem(
                'EvidenciaDemandado',
                localStorage.getItem('EvidenciaDemandado') + item.evca_UrlArchivo + ',,,&&&,,,'
              )
            }


          })

        }




      })

    doc.addPage()

    var w = 40;
    var h = 40;
    var mx = 10
    let y = marginY; // Posición vertical inicial


    doc.setFontSize(18); // Establecer tamaño de fuente
    doc.text('Evidencia Demandante', 10, 40);
    y += 8;

    const currentUserString = localStorage.getItem('EvidenciaDemandante');
    const imgDemnadante = localStorage.getItem('EvidenciaDemandado');

    if (currentUserString !== null) {
     
      const URLImagen = currentUserString.split(',,,&&&,,,'); // Divide el texto en un array de palabras separadas por coma
      var i = 1;
      
      for (let index = 0; index < URLImagen.length - 1; index++, i++) {
        
        doc.addImage(URLImagen[index], '', mx, y, w, h);
        mx = mx + 45
        if (i == 4) {
          i = 0;
          y = y + 45;
          mx = 10
        }
      }
    }

    doc.addPage()
    doc.setFontSize(18); // Establecer tamaño de fuente
    doc.text('Evidencia Demandado', 10, 40);
    y += 8;
    mx = 10

    if (imgDemnadante !== null) {
      const URLImagenDemnadado = imgDemnadante.split(',,,&&&,,,');
      console.log(URLImagenDemnadado)
      var i = 1;
      for (let index = 0; index < URLImagenDemnadado.length - 1; index++, i++) {
        
        doc.addImage(URLImagenDemnadado[index], '', mx, y, w, h);
        mx = mx + 45
        if (i == 4) {
          i = 0;
          y = y + 45;
          mx = 10
        }
      }
    }

    //var text = 'La película inicia con una transmisión enviada:' + ' \n\npor el agente Leland Turbo a su amigo,' + ' el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugaLa película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugar. La película inicia con una transmisión enviada por el agente Leland Turbo a su amigo, el agente Finn McMissile, un espía británico de la MI6 sobre un proyecto malvado que descubrió y le pide una ayuda a su amigo para la extracción. Luego de recibir el mensaje de su amigo, Finn se dirige a la localización a encontrarse con Leland a bordo de un barco pesquero: El FV Northwestern, en algún lugar sobre el Océano Pacífico y se infiltra a escondidas en una plataforma petrolífera. Un grupo de automóviles conocidos como "Láminas", liderados por el Profesor Zündapp, están discutiendo sobre sus futuros planes, incluyendo un arma con forma de cámara de televisión que pronto planean poner en acción. Sin embargo Finn no llega a encontrarse con su amigo y se prepara para atacar, pero justo cuando esta a punto de hacerlo a los pocos segundos descubre que Leland ha sido transformado en un cubo de chatarra y es descubierto en la plataforma petrolífera. Aún sorprendido por la destrucción de su amigo, Finn es descubierto y se ve forzado a escapar. Tras una persecución, Finn es arrojado al mar y le disparan un cohete. El profesor Z, (como se apoda a Zündapp) y el grupo de "Láminas" creen haber hecho estallar a Finn y lo dan por muerto. Sin embargo, este posee modificaciones que le permiten nadar bajo el agua. Una vez que pasa el peligro, Finn huye buceando del lugar.\n'; // Texto largo
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
