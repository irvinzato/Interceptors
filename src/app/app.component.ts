import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor( private usuariosService: UsuariosService ) {  }

  ngOnInit() {
    this.usuariosService.obtenerUsuarios().subscribe( res => {
      console.log("Respuesta del servicio ", res);
    }, (error) => {
      alert("ERROR EN PETICION");
    });
  }


}
