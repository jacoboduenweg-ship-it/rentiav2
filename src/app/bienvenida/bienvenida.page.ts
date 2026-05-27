import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonMenu, IonMenuButton, IonProgressBar, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ConsultasService } from "./../services/consultas.service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonMenuButton, IonButtons, IonCardContent,IonCardTitle,IonCardHeader, IonCard, IonTextarea]
})
export class BienvenidaPage implements OnInit {

  constructor(private consultas: ConsultasService, ) { }

  datosUser: any;
nombre: any;
telefono: any;
direccion: any;
numdist: any;
saldodisp: any;
datosAvisos2: any = [];
avisos2:any = false;
datosAvisos:any = [];
avisos1:any = false;
  ngOnInit() {

    this.AvisosGeneral();
    const iddist = localStorage.getItem('iddist');
    this.consultas.userInfo(iddist)
    .subscribe((todos: any) => {
      console.log('LOS DATOS::', todos);
      this.datosUser = todos;
 
      console.log('USER DATA:::', this.datosUser);

      this.nombre = this.datosUser[0].nombre1 + ' ' + this.datosUser[0].nombre2 + ' ' + this.datosUser[0].appaterno + ' ' + this.datosUser[0].apmaterno;
      this.telefono = this.datosUser[0].telefono;
      this.direccion = this.datosUser[0].calle + ' ' + this.datosUser[0].colonia + ' ' + this.datosUser[0].codpostal;
      this.numdist = this.datosUser[0].numdistribuidor;   

      this.consultas.saldodisp(this.numdist)
      .subscribe((saldo: any) => {
        console.log('saldooo:::', saldo);
        this.saldodisp = saldo[0].pagoo;

        this.consultas.getAvisos(this.numdist)
        .subscribe(todos => {
         
         this.datosAvisos = todos; 
         if(this.datosAvisos.length > 0){
          this.avisos1 = true;
         }
          
          
        });
      })
    });
  }

  AvisosGeneral(){
    this.consultas.getAvisosGenerales()
    .subscribe((todos:any) => {
     
     this.datosAvisos2 = todos;  

     if(this.datosAvisos2.length > 0){
      this.avisos2 = true;
     }
      
 
    });
  }

}
