import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonProgressBar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ConsultasService } from '../services/consultas.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-descargarrecibo',
  templateUrl: './descargarrecibo.page.html',
  styleUrls: ['./descargarrecibo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonSelectOption, IonSelect, IonItem, IonProgressBar, IonLabel, IonMenuButton,IonButtons]
})
export class DescargarreciboPage implements OnInit {

  fechapago: any;
  pagopesos: any;
  saldopesos: any;
  folio: string = '';
  montoprestamo: number = 0;
  adeudo: number = 0;
  nombcomp: string = '';
  numquincenas: number = 0;
  numpago: number = 0;
  pago:number = 0;
  datos: any = [];
  datos1: any = {};
  datos2: any = [];
  datosdiascomision: any = [];
  datosdiascomision2: any = [];
  datosliberar: any = [];

  datoscomision: any[] = [];

  datoscomisiones2: any[] = [];

  comision: number = 0;

  fecha: string = '2022-03-15';

  totalpagar: number = 0;
  mostrarDiv: boolean = false;


 saldo: any = 0;
  numdist: number = 0;
  iddist: any;

  comisiondinero: number = 0;
  comisiontotal: number = 0;
  descmora:number = 0;

  showLoader: boolean = false;
  
  filas: number = 0;
  nombreDist: any = '';
  folioBusqueda: string = '';
  encabezado: string = '';
  mensaje: string = '';
  fechaLiberacion: any = '';

  idpgare22 :any;

  constructor(private consultas: ConsultasService, public alertController: AlertController) { }

  ngOnInit() {
    this.cargar();
  }

  
  async cargar(){

    this.showProgressBar();

    this.iddist = localStorage.getItem('iddist');

    this.consultas.getFechaListado(this.iddist)
    .subscribe(todos => {
      this.datosliberar = todos;
      console.log('fecha liberada:::', this.datosliberar)
      this.fechaLiberacion = this.datosliberar[0].fechalistado.split("T")[0];
      console.log('fecha liberada:::', this.fechaLiberacion)
    })

    

    this.consultas.getUserInfo(this.iddist)
    .subscribe(async todos => {
      console.log('user infoo:::', todos)
      this.datos1 = todos;
           this.numdist = this.datos1[0].numdistribuidor;
           this.nombreDist = 
           this.datos1[0].nombre1 + ' ' + 
           this.datos1[0].nombre2 + ' ' +
           this.datos1[0].appaterno + ' ' +
           this.datos1[0].apmaterno;

           const fechaFormateada = this.fechaLiberacion
           console.log('userjkjkljlk:::', fechaFormateada)
           this.consultas.getListado(await this.numdist,  fechaFormateada)
           .subscribe(todos2 => {
            console.log(todos2); 
             this.datos = todos2;

           
 this.hideProgressBar();
              
           });

    });
   
 
  }

  obtenerFolio(event: any) {
    const valorSeleccionado = event.detail.value;
    console.log('Valor seleccionado:', valorSeleccionado);
    this.folioBusqueda = valorSeleccionado;
  }



  async alerta(encabezado: string, mensaje: string){
    const alerta = await this.alertController.create({
      header: encabezado,
      message: mensaje,
      buttons: ['OK']
    });

    await alerta.present();
  }

  showProgressBar() {
    this.showLoader = true;
  }
  
  hideProgressBar() {
    this.showLoader = false;
  }

  
generarRecibo() {

  console.log('folio busquedaa____', this.folioBusqueda);
    this.consultas.getIdPagare(Number(this.folioBusqueda)).subscribe((idpagare:any) => {
     
      console.log('PAGARE___', idpagare);

      if(idpagare[0].idpagare == null){

        console.log('11111111')
        this.consultas.getIdPagareSinVirtuales(Number(this.folioBusqueda)).subscribe((idpagare:any) => {
          console.log('PAGARE2222___', idpagare);

                this.consultas.get_reimpresion(idpagare[0].idpagare).subscribe((datos: any) => {
                  if (datos[0].reimpresion_recibo == 1) {
                      this.alerta('¡Error!', 'Ya se hizo la reimpresión de este vale, para volver a reimprimirlo, favor de asistir a sucursal');
                  } else {
        
                    
                      this.consultas.change_reimpresion(idpagare[0].idpagare).subscribe(() => {
                        let usuario = this.datos.filter((usuario:any) => usuario.folio == this.folioBusqueda);

                        console.log('DATOS', usuario);

                        const datePipe = new DatePipe('en-US');
                        const fechaFormateada = datePipe.transform(this.fechaLiberacion, 'dd-MM-yyyy');
    
                        this.folio = usuario[0].folio;
                        this.nombcomp = usuario[0].nombcomp;
                        this.numpago = usuario[0].numpago;
                        this.numquincenas = usuario[0].numquincenas;
                        this.pago = usuario[0].pago;
                        this.saldo = usuario[0].adeudo;
                        this.fechapago = fechaFormateada;
    
                         this.pagopesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(this.pago);
                         this.saldopesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(this.saldo);
                        
                        this.mostrarDiv = true;
                      });
        
                      
                  }
              });


        });
      }
      else{
        console.log('222222222')
          this.consultas.get_reimpresion(idpagare[0].idpagare).subscribe((datos: any) => {
                  if (datos[0].reimpresion_recibo == 1) {
                      this.alerta('¡Error!', 'Ya se hizo la reimpresión de este recibo, para volver a reimprimirlo, favor de asistir a sucursal');
                  } else {
        
                    
                      this.consultas.change_reimpresion(idpagare[0].idpagare).subscribe(() => {});
        
                      
                  }
              });
      }

  

        
    });
}




}
