import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  login(user: string){

    const url = `${environment.apiUrl}/login/${user}`;
    return this.http.get(url, {});
   
  }
  
  userInfo(id: any){
    const url = `${environment.apiUrl}/datosclientes/${id}`;
    return this.http.get(url, {});
  }

  saldodisp(id: any){
    const path = `${environment.apiUrl}/outputs/${id}`;
    return this.http.get<Task[]>(path);
  }

  ultimoFolio(){

      const path = `${environment.apiUrl}/ultimofolio/`;
      return this.http.get<Task[]>(path);
    
  }

  getmonto(){

    const path = `${environment.apiUrl}/monto/`;
      return this.http.get<Task[]>(path);
  }

  getplazos(monto?:number){
    const path = `${environment.apiUrl}/plazos/`+monto;
    return this.http.get<Task[]>(path);
  }
  getnombrecliente(nombre?: string){
    const path = `${environment.apiUrl}/buscarcliente/`+nombre;
    return this.http.get<Task[]>(path);
  }
  getverificarvaledist(folio?: number){

    const path = `${environment.apiUrl}/validarvaledist/`+folio;
    return this.http.get<Task[]>(path);
  }
  getguardavale(nombrecliente?:string, iddist?:number, status?:string, folio?:number, monto?:number, plazo?:number){
    const path = `${environment.apiUrl}/nuevovale/`+nombrecliente + '/' + iddist + '/' + status + '/' + folio + '/' + monto+ '/' + plazo;
    return this.http.get<Task[]>(path);


  }

  getnumerovales(id?: number){

    const path = `${environment.apiUrl}/numerovales/`+id;
    return this.http.get<Task[]>(path);

  
  }
  getcancelarvale(id?: number){

    const path = `${environment.apiUrl}/cancelarvale/`+id;
    return this.http.get<Task[]>(path);
  
  
  }

  getconsultacontra(id?: number){

    const path = `${environment.apiUrl}/consultarcontra/`+id;
  
    return this.http.get<Task[]>(path);
  }

  getmodificarcontra(id?: number, contra?: string){
    const path = `${environment.apiUrl}/modificarcontra/`+ id + '/' + contra;
  
    return this.http.get<Task[]>(path);
  }

  getIdPagare(id?:number){

    const path = `${environment.apiUrl}/idpagare/`+ id ;

  
  
    return this.http.get<Task[]>(path);
  }

  getValeInfo(id?:number){

    const path = `${environment.apiUrl}/InfoPagare/`+ id ;
    //const path = 'http://169.197.183.51/rentia/api/InfoPagare/' + id;
     
     return this.http.get<Task[]>(path);
   }

   getUserInfo(id?:string){

    const path = `${environment.apiUrl}/datosclientes/`+ id ;
  
     
     return this.http.get<Task[]>(path);
   }

   getValeInfo2(id?:number){


    const path = `${environment.apiUrl}/infopagare2/`+ id ;
  
    return this.http.get<Task[]>(path);
  }

  getFechaListado(id?:string){

 

   const path = `${environment.apiUrl}/LiberarListado/`+ id ;
  
    return this.http.get<Task[]>(path);
 }

 getListado(id?:number, fecha?:string)
{

   const path = `${environment.apiUrl}/listados/` + id + "/" + fecha;
  
  return this.http.get<Task[]>(path);

 
}

get_reimpresion(id?: number){

  
  return this.http.get(`${environment.apiUrl}/get_reimpresion/` + id);
}

change_reimpresion(id?: number){

  
  return this.http.get(`${environment.apiUrl}/change_reimpresion/` + id);
}

getComisiones(){


  const path = `${environment.apiUrl}/comisiones/` ;

return this.http.get<Task[]>(path);
}

getdiascomision(){

  const path = `${environment.apiUrl}/diascomision/` ;

  return this.http.get<Task[]>(path);
}

getlistavales(id?: number){
  return this.http.get(`${environment.apiUrl}/ValesOtorgados/`+ id);
  
}

getIdPagareSinVirtuales(id?: number){
  return this.http.get(`${environment.apiUrl}/idnormales/`+ id);
}

getAvisos(id?:number){
  return this.http.get(`${environment.apiUrl}/avisos/`+ id);


}
getAvisosGenerales(){
  


  const path = `${environment.apiUrl}/avisosgenerales/`;

return this.http.get<Task[]>(path);
}

}

//<uses-permission android:name="android.permission.INTERNET"/>
//android:usesCleartextTraffic="true"
