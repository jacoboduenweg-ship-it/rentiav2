import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenu, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ConsultasService } from "./../services/consultas.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscarvale',
  templateUrl: './buscarvale.page.html',
  styleUrls: ['./buscarvale.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem, IonButton, IonMenuButton, IonButtons, IonInput]
})
export class BuscarvalePage implements OnInit {

  idpagare!: number;
  datosvale:any = {};
  datos:any = {};
  datoscliente:any = {};
  datos2:any = [];
  numvale!: number;
  numvale2!: number;
  numpagare!: number;
  cliente: string = '';
  fecha!: Date;
  vencimiento!: Date;
  status: string = '';
  montovale!: number;
  pago!: number;
  numpago!: number;
  fechapago!: Date;
  quincenas!: number;

  varglobal : number | undefined;

  constructor(private consultas: ConsultasService, private router: Router) { }

  ngOnInit() {
  }

  ircanjearvale(){
    this.router.navigate(['/canjearvale']);
  }
  irpprincipal(){
    this.router.navigate(['/bienvenida']);
  }

  InfoVale(){
    this.numvale = this.numvale2;
   

    
      this.consultas.getIdPagare(this.numvale).subscribe((todos: any) => {
        this.datosvale = todos;
        this.idpagare = this.datosvale[0].idpagare;
       console.log(this.idpagare)
        this.consultas.getValeInfo(this.idpagare).subscribe((todos2: any) => {
          this.datos = todos2;
          console.log(todos2);
          this.cliente = this.datos.idcliente;
          this.numpagare = this.datos.numpagare;
          this.status = this.datos.status;

          if(this.status == 'C'){
            this.status = 'CANCELADO';
          }
          else{
            this.status = 'PAGANDOSE';
          }

          this.fecha = this.datos.fecha;
          this.vencimiento = this.datos.vencimiento;

          this.consultas.getUserInfo(this.cliente)
          .subscribe((todoscliente: any) => {
      
           this.datoscliente = todoscliente;
           this.cliente = this.datoscliente.nombre1 + ' ' + this.datoscliente.nombre2 + ' ' + this.datoscliente.appaterno + ' ' + this.datoscliente.apmaterno;     
       

           this.consultas.getValeInfo2(this.idpagare)
           .subscribe((todos3: any) => {
           
             this.datos2 = todos3;

             
             this.montovale = this.datos2[0].montovale;
             this.pago = this.datos2[0].pago;
             this.numpago = this.datos2[0].numpago;
             this.fechapago = this.datos2[0].fechapago;
             this.quincenas = this.datos2[0].quincenas;
 
           });


          });

        

        });
  
      });
  
     
    
  }

}
