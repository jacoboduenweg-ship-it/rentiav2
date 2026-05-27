import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonInputOtp, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ConsultasService } from "./../services/consultas.service";
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiarcontra1ra',
  templateUrl: './cambiarcontra1ra.page.html',
  styleUrls: ['./cambiarcontra1ra.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule,FormsModule,IonCardTitle, IonCardHeader, IonCard, IonItem, IonButton, IonInput]
})
export class Cambiarcontra1raPage implements OnInit {

  constructor(private consultas: ConsultasService, private router: Router, public alertController: AlertController) { }

  contrasenas = new FormGroup({
    actual: new FormControl(''),
    nueva: new FormControl(''),
  });

  iddist!: number;

contraNueva: any;
contraActual: any;
  datos: any = [];
  contrabd!: string;
  tituloalerta!: string;
  mensajealerta!: string;

  iddistribuidor!: string;
  idd: any;

  ngOnInit():void {
    this.idd = localStorage.getItem('iddist');
    
  }

  cambiarcontra(){

  
console.log('iel idddd:::', this.idd);
console.log('iel 22222:::', this.contrasenas.get('actual')?.value);
console.log('iel 33333:::', this.contrasenas.get('nueva')?.value);


    
    


    console.log(this.iddist);

    this.consultas.getconsultacontra(this.idd).subscribe((todos:any) => {
      this.datos = todos;
      this.contrabd = this.datos[0].contrasena;

      console.log(this.contrabd);

      if(this.contrasenas.get('actual')?.value == this.contrabd){
        this.consultas.getmodificarcontra(this.idd, this.contrasenas.get('nueva')?.value!).subscribe((todos:any) =>{
          console.log('CONTRASEÑA CAMBIADA');
          this.alerta('¡Exito!', 'Contraseña cambiada correctamente.');
          this.router.navigate(['/bienvenida']);
        });
      }
      else{
        this.alerta('¡Error!', 'Contraseña actual incorrecto.');
      }

    });


  }
  async alerta(titulo: string, mensaje: string){
    const alerta = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alerta.present();

  }


}
