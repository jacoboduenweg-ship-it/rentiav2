import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonImg, IonCheckbox } from '@ionic/angular/standalone';
import { ConsultasService } from "./../services/consultas.service";
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, FormsModule, IonButton, IonImg, IonCheckbox],
})

export class HomePage implements OnInit{
  constructor(private consultas: ConsultasService, private router: Router, public alertController: AlertController, private navCtrl: NavController) {}

datosUser: any;
user:any;
pass:any;
status: string = '';
showLoader: boolean = false;
guardarCredenciales: boolean = false;

  ngOnInit(): void {

    this.user = localStorage.getItem('usuario');
    this.pass = localStorage.getItem('contra');
   
   
  }

  showProgressBar() {
    this.showLoader = true;
  }
  
  hideProgressBar() {
    this.showLoader = false;
  }
  iniciarSesion(){
 
      // 👇 Esto quita el foco del botón que lanzó el evento
      (document.activeElement as HTMLElement)?.blur();
    
      this.showProgressBar();
      this.consultas.login(this.user)
        .subscribe((todos:any) => {
          this.datosUser = todos;
          console.log(this.status);
    
          if(todos != 0){
            this.status = this.datosUser[0].status;
    
            if(this.status == 'P'){
              localStorage.setItem('iddist', this.datosUser[0].iddistribuidor);
              this.router.navigate(['/cambiarcontra1ra']);
            } 
            else if(this.status == 'S'){
              if(this.pass == this.datosUser[0].contrasena){
                console.log('USUARIO CORRECTO');
                if (this.guardarCredenciales) {
                  localStorage.setItem('usuario', this.user);
                  localStorage.setItem('contra', this.pass);
                } 
                this.hideProgressBar();
                localStorage.setItem('iddist', this.datosUser[0].iddistribuidor);
                //this.router.navigateByUrl('/bienvenida', { replaceUrl: true });
                this.navCtrl.navigateRoot('/bienvenida');
              } else {
                this.hideProgressBar();
                this.alerta('ALERTA!', 'Usuario o contraseña incorrecto');
              }
            } else {
              this.hideProgressBar();
              this.alerta('ALERTA!', 'Usuario bloqueado');
            }
          } else {
            this.hideProgressBar();
            this.alerta('ALERTA!', 'Usuario o contraseña incorrecto');
          }
        });
    
   
  }

  async alerta(encabezado: string, mensaje: string){
    const alerta = await this.alertController.create({
      header: encabezado,
      message: mensaje,
      buttons: ['OK']
    });

    await alerta.present();
  }

  
}




