import { Injectable } from '@angular/core';

// 1. Definimos la interfaz
export interface Imagen {
  nombre: string;
  descripcion: string;
  img: string;
}
// Injectable decorador
@Injectable({
  providedIn: 'root'
})

export class ImagenesService {

  // 2. Datos locales
  private imagenes: Imagen[] = [ //imagenges es un arreglo de tipo Imagen
    {
      nombre: 'Taller de Yoga',
      descripcion: 'Una sesión para conectar cuerpo y mente.',
      img: 'https://a.storyblok.com/f/97382/2000x1500/4c15e1224b/cover-benefits-of-yoga-and-meditation.png' 
    },
    {
      nombre: 'Clase de Cocina',
      descripcion: 'Aprende a cocinar platos gourmet en casa.',
      img: 'https://foodandpleasure.com/wp-content/uploads/2020/11/jason-briscoe-grdjp16cpk8-unsplash.jpg'
    },
    {
      nombre: 'Torneo de Programación',
      descripcion: 'Demuestra tus habilidades con el código.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvTDz01-HFAFIi9fFZ7Ykytaxr7pX11LRcGQ&s'
    }
  ];

  constructor() { }

  // 3. Método para retornar los datos
  getImagenes(): Imagen[] {
    return this.imagenes;
  }
}