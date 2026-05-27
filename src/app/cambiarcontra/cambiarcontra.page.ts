import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ConsultasService } from '../services/consultas.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.page.html',
  styleUrls: ['./cambiarcontra.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonCardContent, IonCard, IonInput, IonMenuButton, IonButtons]
})
export class CambiarcontraPage implements OnInit {

  iddist? : any;

  contraactual: string = '';
  contranueva?: string = '';
  datos: any = [];
  contrabd?: string;
  tituloalerta?: string;
  mensajealerta?: string;

  constructor(private consultas: ConsultasService, public alertController: AlertController) { }

  ngOnInit() {
    this.iddist = localStorage.getItem('iddist');
  }

  cambiarcontra(){
    console.log(this.contraactual + this.contranueva);
    console.log(this.iddist);

    this.consultas.getconsultacontra(this.iddist).subscribe((todos: any) => {
      this.datos = todos;
      this.contrabd = this.datos[0].contrasena;

      console.log(this.contrabd);

      if(this.contraactual == this.contrabd){
        this.consultas.getmodificarcontra(this.iddist, this.contranueva).subscribe(todos =>{
          console.log('CONTRASEÑA CAMBIADA');
          this.alerta('¡Exito!', 'Contraseña cambiada correctamente.');
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
