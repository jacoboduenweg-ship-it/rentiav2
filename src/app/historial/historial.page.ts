import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonMenuButton, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ConsultasService } from "./../services/consultas.service";
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonCol, IonRow, IonGrid, IonItem, IonMenuButton, IonButtons]
})
export class HistorialPage implements OnInit {

  iddist: any;
folio!: number;
cliente!: string;
fecha!: Date;
monto!: number;
plazo!: string;
datoslistavales: any = [];

  constructor(private consultas: ConsultasService) { }

  ngOnInit() {
    this.cargarvales();
  }

  cargarvales(){
    this.iddist = localStorage.getItem('iddist');

    this.consultas.getlistavales(this.iddist).subscribe((todos: any) => {
      this.datoslistavales = todos;

      this.folio = this.datoslistavales[0].folio;
      this.cliente = this.datoslistavales[0].nombrecliente;
      this.fecha = this.datoslistavales[0].fecha;
      this.monto = this.datoslistavales[0].monto;
      this.plazo = this.datoslistavales[0].plazo;
      
      if(this.datoslistavales[0].plazo == '0'){
        this.datoslistavales[0].plazo = 'N/E';
      }

      console.log(this.datoslistavales);
  
    });

    
  }


}
