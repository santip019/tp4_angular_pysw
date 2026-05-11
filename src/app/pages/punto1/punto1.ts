import { Component, OnInit } from '@angular/core';
import { Imagen, ImagenesService } from '../../services/imagenes.service';

@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.html',
  styleUrls: ['./punto1.css']
})
export class Punto1 implements OnInit {

  // Variables locales para almacenar los datos y el estado
  listaEventos: Imagen[] = []; 
  indice: number = 0;          

  // Inyectamos el servicio que creamos anteriormente
  constructor(private _imagenesService: ImagenesService) { }

  ngOnInit(): void {
    // Al cargar el componente, traemos la lista de imágenes del servicio
    this.listaEventos = this._imagenesService.getImagenes();
  }

  // Método para avanzar a la siguiente imagen
  siguiente(): void {
    // Usamos el operador módulo para que al llegar al final vuelva a 0 automáticamente
    this.indice = (this.indice + 1) % this.listaEventos.length;
  }

  // Método para retroceder a la imagen anterior
  anterior(): void {
    // Sumamos la longitud antes de aplicar el módulo para evitar números negativos
    this.indice = (this.indice - 1 + this.listaEventos.length) % this.listaEventos.length;
  }
}