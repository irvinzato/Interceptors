import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private http: HttpClient ) { }

  obtenerUsuarios() {
    //Los params se meteran a mi peticion, puedo verificar en consola del navegador-"Network" y ver la peticion "header"
    let params = new HttpParams().append('page','1');
    params = params.append('nombre', 'Irving Rivera');

    const headers = new HttpHeaders({
      'token-usuario': 'ALGUNTOKEN12FSDAFD'
    });

    return this.http.get('https://reqres.in/apiasdsa/usera', {
      params,
      headers
    }).pipe( //AL PASAR EL PIPE Y DESPUES EL MAP, TRANSFORMO LA RESPUESTA A LO QUE YO QUIERO OBTENER, O PUEDO DEJAR LA RESPUESTA TAL CUAL
      map( (resp) => { 
        return resp;
      }),
      //Tambien puedo borrar toda la logica del catchError y poner "catchError(this.manejarError)" queda modularizado
      catchError( error => { 
        console.log("Sucedio un error ", error);
        console.warn("Asi se personalizan errores http");
        return throwError( 'Error personalizado');
      })
    );
  }


  manejarError( error: HttpErrorResponse ) {
    console.log("Sucedio un error ", error);
    console.warn("Asi se personalizan errores http");
    return throwError( 'Error personalizado');
  }

}
