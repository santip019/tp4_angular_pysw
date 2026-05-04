import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  // Esta es la variable compartida
  categoriaSeleccionada = signal<string>(''); 

  setCategoria(nueva: string) {
    this.categoriaSeleccionada.set(nueva); //aca se cambia el valor de la variable, y como es un signal, cualquier componente que esté suscrito a esta variable se actualizará automáticamente
  }
}
