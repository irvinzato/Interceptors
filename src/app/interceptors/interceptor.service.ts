import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//PARA QUE ESTA CLASE PUEDA SER ESCUCHADA HAY QUE IMPORTARLA EN LOS PROVIDERS DEL "APP.MODULE"
//La configuración básica consta de 3 parametros que ya puse en "app.module", de esa manera este interceptor escuchara cualquier peticones que lance mi aplicación
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Paso por el interceptor');

    return next.handle( req );
    /* throw new Error("Metodo implementado"); */
  }

}
