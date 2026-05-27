import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonLabel, IonMenuButton, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { MenuController, NavController,AlertController } from '@ionic/angular';
import { ConsultasService } from "./../services/consultas.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-canjearvale',
  templateUrl: './canjearvale.page.html',
  styleUrls: ['./canjearvale.page.scss'],
  standalone: true,
  imports: [IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonItem, 
    IonLabel, 
    IonMenuButton, 
    IonButtons,
  IonInput,
  IonSelect,
  IonSelectOption,
IonButton,
IonToggle,
]
})
export class CanjearvalePage implements OnInit {

  constructor(public alertController: AlertController, private navCtrl: NavController, private menuCtrl: MenuController,  private router: Router, private consultas: ConsultasService) { }

  folio: any;
  datosMontos: any;
  datosplazos:any;
  plazoSelect:any;
  montoSelect: any;
  nombre:any;
  cancelarCheck:any;
  folioCancelar:any;
  mostrarCancelarVar:boolean = false;
  nombresinespacio:any;
  datosidcliente:any;
  encabezado:any;
  mensaje:any;
  datosfolio:any;
  showLoader:any;
  status:any
  iddist:any;
  datoscredito1000:any;
  creditomas1000:any;
  creditomaspagare:any;
  idclientevalidar:any;
  datosfoliosdisp:any;
  datosnumvales:any;
  numerovales:any;
  datosfolio2:any;
  verificarvale:any;
  iddist2:any;


  ngOnInit() {
    this.iddist = localStorage.getItem('iddist');

    this.cargarfolio();


      this.consultas.getmonto().subscribe((montos:any) => {
        
        this.datosMontos = montos;
        
      });
 


  }

  seleccionarMonto(event:any){

    this.montoSelect = event.detail.value;
    
        this.consultas.getplazos(this.montoSelect).subscribe((plazos: any) => {
          console.log('LOS PLAZOS::', plazos);
          this.datosplazos = plazos;
        });
        
  }

  mostrarCancelar() {
    if(this.cancelarCheck == true){
      this.mostrarCancelarVar = true;
    }
    else{
      this.mostrarCancelarVar = false;
    }
  }
  
  irpprincipal(){
    this.router.navigate(['/bienvenida']);
  }


  
  irBuscarVale(){
    this.router.navigate(['/buscarvale']);
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

  
  cargarfolio(){
    this.consultas.ultimoFolio().subscribe((todos: any) => {
      this.datosfoliosdisp = todos;

     

      if(this.datosfoliosdisp.length == 0){
        this.folio = 1;
      }
      else{
        this.folio = this.datosfoliosdisp[0].folio + 1;
      }

    });
  }

  cancelarvale(){
    

    this.consultas.getverificarvaledist(this.folioCancelar).subscribe(todos => {
      this.datosfolio2 = todos;
      this.verificarvale = this.datosfolio2[0].nombrecliente;
      this.iddist2 = this.datosfolio2[0].iddist;
      
      if(this.verificarvale != null){


        if(this.datosfolio2 == 0){
          console.log('NO SE ENCONTRO EL VALE');
          this.encabezado = '¡Alerta!';
          this.mensaje = 'Vale no encontrado.';
  
          this.alerta(this.encabezado, this.mensaje);
          
  
  
        }
        else{
          if(this.iddist2 == this.iddist){
          this.consultas.getcancelarvale(this.folioCancelar).subscribe(
            (todos: any)=> {
              console.log('VALE DADO DE BAJA');
              this.encabezado = '¡Alerta!';
              this.mensaje = 'Vale con folio: ' + this.folioCancelar + ', fue cancelado';
              this.alerta(this.encabezado, this.mensaje);
              this.folioCancelar = null;
              this.cargarfolio();
            });
          }
          else{
            this.encabezado = '¡Alerta!';
              this.mensaje = 'No puede cancelar un vale no asignado a su cuenta';
              this.alerta(this.encabezado, this.mensaje);
          }
        }

      }
      else{
        this.encabezado = '¡Alerta!';
        this.mensaje = 'Este vale no se ha usado';
        this.alerta(this.encabezado, this.mensaje);
      }
    });

    
  }



  verificarvaledist(){
   
    this.nombresinespacio = this.nombre.replace(/\s+/g, '');
   
      this.consultas.getnombrecliente(this.nombresinespacio).subscribe((todos: any) =>{
      this.datosidcliente = todos;

      if(this.datosidcliente.length == 0){
        if(this.nombre == "" || this.folio == 0 || this.montoSelect == 0 || this.plazoSelect === 5000){
          this.encabezado = '¡Alerta!';
              this.mensaje = 'Debe llenar todos los campos.';
              this.alerta(this.encabezado, this.mensaje);
              console.log("SE DEBE DE LLENAR TODOS LOS CAMPOS");
              
        }
        else{
    
    
        this.showProgressBar();
    
    
    
        this.consultas.getverificarvaledist(this.folio).subscribe((todos: any) => {
          this.datosfolio = todos;
         // this.foliorev = this.datosfolio[0].folio;
    
    
    
          if(this.datosfolio == 0)
          {
    
          if(this.datosfolio == 0){
            
    
              console.log('VALE ASiGNADO A SU CUENTA');
              this.status = 'A'
    let fecha;
  

    this.consultas.saldodisp(this.iddist).subscribe((todos: any) => {
      this.datoscredito1000 = todos;
        this.creditomas1000 = this.datoscredito1000[0].pagoo + 1000;
        this.creditomaspagare = this.datoscredito1000[0].pagoo + this.montoSelect;
    });

              if(this.creditomaspagare > this.creditomas1000){
                this.encabezado = 'Error!';
                this.mensaje = 'El vale, excede el limite de credito de su cuenta.';
                this.alerta(this.encabezado, this.mensaje);
              }
              else{
                this.consultas.getguardavale(this.nombre, this.iddist, this.status, this.folio, this.montoSelect, this.plazoSelect)
                .subscribe((todos: any) => {
                console.log('VALE CANJEADOO');
                this.cargarfolio();
                this.encabezado = '¡Exito!';
                this.mensaje = 'Vale canjeado con exito. El cliente debe presentarse en sucursal y decir que su vale es el: #' + this.folio;
                this.alerta(this.encabezado, this.mensaje);
                this.nombre = '';
                this.montoSelect = null;
                this.plazoSelect = null;
                this.folio = null;
           
        
          });
              }
    
    
         
    
    
          
          }
          else{
            this.encabezado = '¡Alerta!';
            this.mensaje = 'Este vale ya fue canjeado.'
            this.alerta(this.encabezado, this.mensaje);
          }
        }
        else{
          this.encabezado = '¡Alerta!';
          this.mensaje = 'Este vale ya fue canjeado en sucursal y no puede ser cancelado.'
          this.alerta(this.encabezado, this.mensaje);
        }
        });
    
        this.hideProgressBar();
    
      }
      }
      else{

      

      this.idclientevalidar = this.datosidcliente[0].idcliente;

      this.consultas.getnumerovales(this.idclientevalidar).subscribe((todos2: any) => {
        this.datosnumvales = todos2
        this.numerovales = this.datosnumvales[0].numerovales;




        
    if(this.numerovales >= 1){

      this.encabezado = '¡Alerta!';
      this.mensaje = 'Los clientes no pueden tener mas de un vale canjeado.';
      this.alerta(this.encabezado, this.mensaje);
      console.log('MUCHOS VALES');
    }
    else{
      
    if(this.nombre == "" || this.folio == 0 || this.montoSelect == 0 || this.plazoSelect === 5000){
      this.encabezado = '¡Alerta!';
          this.mensaje = 'Debe llenar todos los campos.';
          this.alerta(this.encabezado, this.mensaje);
          console.log("SE DEBE DE LLENAR TODOS LOS CAMPOS");
          
    }
    else{


    this.showProgressBar();



    this.consultas.getverificarvaledist(this.folio).subscribe(todos => {
      this.datosfolio = todos;
     // this.foliorev = this.datosfolio[0].folio;



      if(this.datosfolio == 0)
      {

      if(this.datosfolio == 0){
        

          console.log('VALE ASiGNADO A SU CUENTA');
          this.status = 'A'
let fecha;


let creditomas1000 = 0;
let creditomaspagare = 0;

this.consultas.saldodisp(this.iddist).subscribe((todos: any) => {
  this.datoscredito1000 = todos;
    creditomas1000 = this.datoscredito1000[0].pagoo + 1000;
    creditomaspagare = this.datoscredito1000[0].pagoo + this.montoSelect;
});

          if(creditomaspagare > creditomas1000){
            this.encabezado = 'Error.';
            this.mensaje = 'El vale excede el limite de credito de su cuenta.';
            this.alerta(this.encabezado, this.mensaje);
          }
          else{
            this.consultas.getguardavale(this.nombre, this.iddist, this.status, this.folio, this.montoSelect, this.plazoSelect)
            .subscribe((todos: any) => {
            console.log('VALE CANJEADOO');
            this.cargarfolio();
            this.encabezado = '¡Exito!';
            this.mensaje = 'Vale canjeado con exito. El cliente debe presentarse en sucursal y decir que su vale es el: #' + this.folio;
            this.alerta(this.encabezado, this.mensaje);
            this.nombre = '';
            this.montoSelect = null;
            this.plazoSelect = null;
            this.folio = null;
       
    
      });
          }

      
      }
      else{
        this.encabezado = '¡Alerta!';
        this.mensaje = 'Este vale ya fue canjeado.'
        this.alerta(this.encabezado, this.mensaje);
      }
    }
    else{
      this.encabezado = '¡Alerta!';
      this.mensaje = 'Este vale ya fue canjeado en sucursal y no puede ser cancelado.'
      this.alerta(this.encabezado, this.mensaje);
    }
    });

    this.hideProgressBar();

  }
    }



      });
  
      }
    });
    
  
  }



}
