import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonMenuButton, IonProgressBar, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ConsultasService } from "./../services/consultas.service";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonCol, IonRow, IonGrid, IonItem, IonButton, IonProgressBar, IonMenuButton, IonButtons]
})
export class ListadoPage implements OnInit {

  fechapago!: Date;
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

  numdist: number = 0;
  iddist: string = '';

  comisiondinero: number = 0;
  comisiontotal: number = 0;
  descmora:number = 0;

  showLoader!: boolean;
  
  filas: number = 0;

  constructor(private consultas: ConsultasService, public alertController: AlertController) { }

 
  ngOnInit() {
    this.showProgressBar();
    
    
    this.cargar();

    
  }


  showProgressBar() {
    this.showLoader = true;
  }
  
  hideProgressBar() {
    this.showLoader = false;
  }
  

  cargar(){


   
    this.iddist = localStorage.getItem('iddist')!.toString();

    this.consultas.getFechaListado(this.iddist)
    .subscribe(todos => {
      this.datosliberar = todos;
      this.fecha = this.datosliberar[0].fechalistado.toString('yyyy-MM-dd');

      console.log('FECHA____', this.fecha);

      
    })

    

    this.consultas.getUserInfo(this.iddist)
    .subscribe(todos => {
      this.datos1 = todos;
           this.numdist = this.datos1[0].numdistribuidor;
      
           this.consultas.getListado(this.numdist, this.fecha)
           .subscribe(todos2 => {
             this.datos = todos2;

             if(todos2.length > 0){

       
             this.fechapago = this.datos[0].fechapago;
             this.folio = this.datos[0].folio;
             this.montoprestamo = this.datos[0].montoprestamo;
             this.adeudo = this.datos[0].adeudo;
             this.nombcomp = this.datos[0].nombcomp;
             this.numquincenas = this.datos[0].numquincenas;
             this.numpago = this.datos[0].numpago;
             this.pago = this.datos[0].pago;

            for(let dato of this.datos){
              this.totalpagar += dato.pago;
              this.filas++;
            }
                  
              this.cargaComisiones();
              this.accion2();
          }
          else{
        
              this.recargar();
         
          }  


            this.hideProgressBar();


           });

    });

 
  }

  cargaComisiones(){
    this.consultas.getComisiones().subscribe(todos => {
      this.datos2 = todos;

      this.comision = this.datos2[0].comision;


   
      for(let dato2 of this.datos2){
      let resulcomision = dato2.comision / 100;

      this.comisiondinero = this.totalpagar * resulcomision;

      this.descmora = this.comisiondinero;

      this.comisiontotal = this.totalpagar - this.comisiondinero;


    this.datoscomision.push(this.comisiontotal);
    this.datoscomisiones2.push(this.descmora);
     
  
    }

    });

   this.consultas.getdiascomision().subscribe(todos => {
    this.datosdiascomision = todos;

    for(let datodiascomision of this.datosdiascomision){
      this. datosdiascomision2.push(datodiascomision)
    }


   });

  
  }
  public ocultar1: boolean = false;
  async alerta(){
    const alerta = await this.alertController.create({
      header: '!Error!',
      message: 'Error, vuelva a cargar la aplicacion.',
      buttons: ['OK']
    });

    await alerta.present();
  }



  recargar(){
    this.showProgressBar();
    this.cargar();
  }

  
accion1(){
this.ocultar1 = !this.ocultar1;

}
accion2(){
  this.ocultar1 = false;
}

}
