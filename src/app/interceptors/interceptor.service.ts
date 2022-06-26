import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//PARA QUE ESTA CLASE PUEDA SER ESCUCHADA HAY QUE IMPORTARLA EN LOS PROVIDERS DEL "APP.MODULE"
//La configuración básica consta de 3 parametros que ya puse en "app.module", de esa manera este interceptor escuchara cualquier peticones que lance mi aplicación
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Paso por el interceptor');
    //YO PUEDO MANDAR AQUI MIS HEADERS EN TODAS LAS PETICIONES, DE ESTA MANERO LO QUITO DE CADA PETICION INDIVIDUAL
    const headers = new HttpHeaders({
      'token-usuario': 'ALGUNTOKEN12FSDAFD'
    });

    const reqClone = req.clone({
      headers
    });

    //Si paso mi handle por el pipe "catchError()", asi puedo atrapar los errores de todas mis peticiones
    //Ya no necesitaria tener el catchError en cada una de mis peticiones por que todas pasarian por aqui
    return next.handle( reqClone ).pipe(
      catchError( this.manejarError )
    );
  }

  manejarError( error: HttpErrorResponse ) {
    console.log("Sucedio un error ", error.status);
    console.warn("Asi se personalizan errores http");
    alert("ERROR ATRAPADO DESDE MI SERVICIO" + error);
    return throwError( 'Error personalizado');
  }

}
