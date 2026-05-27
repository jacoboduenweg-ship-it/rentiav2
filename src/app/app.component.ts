import { Component } from '@angular/core';
import { IonApp, IonButtons, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonMenu, IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonContent, IonTitle, IonMenuButton, IonButtons, IonToolbar, IonHeader, IonLabel, IonItem, IonMenu],
})
export class AppComponent {
  constructor(private router: Router) {}

  irCanjear(){
    this.router.navigate(['/canjearvale']);
  }

  irBuscarVale(){
    this.router.navigate(['/buscarvale']);
  }

  irListado(){
    this.router.navigate(['/listado']);
  }

  irHistorial(){
    this.router.navigate(['/historial']);
  }

  irContra(){
    this.router.navigate(['/cambiarcontra']);
  }

  irImpresion(){
    this.router.navigate(['/descargarrecibo']);
  }

  irInicio(){
    this.router.navigate(['/bienvenida']);
  }
}
