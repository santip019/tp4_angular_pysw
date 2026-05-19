import { Component, OnInit } from '@angular/core';
import { Imagen, ImagenesService } from '../../services/imagenes.service';

@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.html',
  styleUrls: ['./punto1.css']
})
export class Punto1 implements OnInit {

  listaEventos: Imagen[] = []; //lista eventos es un arreglo de tipo Imagen que esta inicializado en vacio 
  indice: number = 0;          

  // Inyectamos el servicio que creamos
  constructor(private _imagenesService: ImagenesService) { } //constructor lo que hace es iniciar el componente y usar los servicios

  ngOnInit(): void {
    // Al cargar el componente, traemos la lista de imágenes del servicio
    this.listaEventos = this._imagenesService.getImagenes();
  }

  // Método para avanzar a la siguiente imagen
  siguiente(): void {
    // Usamos el operador módulo para que al llegar al final vuelva a 0 automáticamente
    this.indice = (this.indice + 1) % this.listaEventos.length; //El porcentaje se usa para que al llegar al final vuelva a 0 automáticamente
  }

  // Método para retroceder a la imagen anterior
  anterior(): void {
    // Sumamos la longitud antes de aplicar el módulo para evitar números negativos
    this.indice = (this.indice - 1 + this.listaEventos.length) % this.listaEventos.length;
  }
}