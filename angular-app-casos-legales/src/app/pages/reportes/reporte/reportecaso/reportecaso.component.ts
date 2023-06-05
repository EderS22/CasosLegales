import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { forEach } from 'lodash';


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
    public EmpresaService: EmpresaService
  ) { }

  ngOnInit(): void {

    this.IdCaso = 4;
    if (this.IdCaso === null) {

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

        localStorage.setItem(
          'InformacionGeneral',
          '\n-Fecha del caso: ' + data.caso_Fecha +
          '\n-Tipo de caso: ' + data.tica_Nombre +
          '\n-Descripcion del caso: ' + data.caso_Descripcion +
          '\n-Juez encargado del caso: ' + data.abju_AbogadoNombre
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

      })


    if (localStorage.getItem('InformacionGeneral') !== null && localStorage.getItem('InformacionDemandante') !== null) {
      var InformacionGeneral = localStorage.getItem('InformacionGeneral');
      var InformacionDemandante = localStorage.getItem('InformacionDemandante');
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
          y = y + 30;
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
      
        var i = 1;
        for (let index = 0; index < URLImagenDemnadado.length - 1; index++, i++) {
          console.log(URLImagenDemnadado[index])
          doc.addImage('data:image/jpeg;base64,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', '', mx, y, w, h);
          mx = mx + 45
          if (i == 4) {
            i = 0;
            y = y + 30;
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
