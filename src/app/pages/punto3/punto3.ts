import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaz para representar cada carta del tablero
export interface Carta {
  id: number;
  valor: string; // Puede ser el nombre de la imagen, un emoji, o un string
  descubierta: boolean; // Indica si la carta está boca arriba o boca abajo
  imagen: string; // URL de la imagen de la carta
}

@Component({
  selector: 'app-punto3',
  imports: [CommonModule],
  templateUrl: './punto3.html',
  styleUrl: './punto3.css',
})
export class Punto3 {
  // Arreglo de 12 elementos con 6 parejas ('A' a 'F')
  cartas: Carta[] = [
    { id: 1, valor: 'A', descubierta: false, imagen: 'https://images.unsplash.com/photo-1652254048339-6c50e7cc26ac?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, valor: 'A', descubierta: false, imagen: 'https://images.unsplash.com/photo-1652254048339-6c50e7cc26ac?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%3D' },
    { id: 3, valor: 'B', descubierta: false, imagen: 'https://images.unsplash.com/photo-1727791174121-835760e60cd4?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, valor: 'B', descubierta: false, imagen: 'https://images.unsplash.com/photo-1727791174121-835760e60cd4?q=80&w=985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, valor: 'C', descubierta: false, imagen: 'https://images.unsplash.com/photo-1552751753-0fc84ae5b6c8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 6, valor: 'C', descubierta: false, imagen: 'https://images.unsplash.com/photo-1552751753-0fc84ae5b6c8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 7, valor: 'D', descubierta: false, imagen: 'https://images.unsplash.com/photo-1673369965024-979e1d26b779?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 8, valor: 'D', descubierta: false, imagen: 'https://images.unsplash.com/photo-1673369965024-979e1d26b779?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 9, valor: 'E', descubierta: false, imagen: 'https://emountain.tur.ar/Merlo/Images/sierraquijadas.jpg' },
    { id: 10, valor: 'E', descubierta: false, imagen: 'https://emountain.tur.ar/Merlo/Images/sierraquijadas.jpg' },
    { id: 11, valor: 'F', descubierta: false, imagen: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1200' },
    { id: 12, valor: 'F', descubierta: false, imagen: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1200' },
  ];

  // --- Variables de estado ---
  intentosRestantes: number = 0; 
  juegoIniciado: boolean = false;
  cartasSeleccionadas: Carta[] = [];
  contadorGanar: number = 0;
  
  // Variable para cumplir con el botón "INTENTAR" que habilita a voltear
  puedeVoltear: boolean = false; 

  banderaIntentos: boolean = false; // Para mostrar mensaje de derrota
  banderaganar: boolean = false; // Para mostrar mensaje de victoria

  // 1. La lógica de INICIAR y REINICIAR
  iniciarJuego() {
    this.juegoIniciado = true;
    this.intentosRestantes = 10; // Iniciamos con 10 intentos
    this.puedeVoltear = false;
    this.cartasSeleccionadas = [];
    this.contadorGanar = 0;
    this.banderaIntentos = false;
    this.banderaganar = false;
    this.mezclarCartas();
  }

  reiniciarJuego() {
    this.cartas.forEach(carta => carta.descubierta = false);
    this.iniciarJuego();
  }

  mezclarCartas() {
    // Desordenar un arreglo aleatoriamente
    this.cartas.sort(() => Math.random() - 0.5);
  }

  // 2. Lógica del botón INTENTAR
  habilitarIntento() {
    // valida si intentosRestantes es 0, sino muestra alert y no hace nada.
    if (this.intentosRestantes != 0) {
      this.puedeVoltear = true;
    } else {
      this.puedeVoltear = false;
      this.banderaIntentos = true;
    }
  }

  // 3. Lógica al hacer clic en la carta
  seleccionarCarta(cartaClickeada: Carta) {
    // Si el juego no inició, o no habilitó el botón intentar, o la carta ya está descubierta, o ya hay 2 seleccionadas: salir.
    if (!this.juegoIniciado || !this.puedeVoltear || cartaClickeada.descubierta || this.cartasSeleccionadas.length >= 2) {
      return;
    }

    // Volteamos la carta y la guardamos en el arreglo temporal
    cartaClickeada.descubierta = true;
    this.cartasSeleccionadas.push(cartaClickeada);

    // Cuando ya se seleccionaron 2 cartas, toca evaluarlas
    if (this.cartasSeleccionadas.length === 2) {
        
          this.puedeVoltear = false; // Bloqueamos hasta que presione INTENTAR de nuevo
          if (this.cartasSeleccionadas[0].valor === this.cartasSeleccionadas[1].valor) {
            // Si coinciden, las dejamos descubiertas y limpiamos la selección
            this.cartasSeleccionadas = [];
            this.contadorGanar++;
          } else {
            // Si no coinciden, las volteamos de nuevo después de un breve retraso
            setTimeout(() => {
              this.cartasSeleccionadas.forEach(carta => carta.descubierta = false);
              this.cartasSeleccionadas = [];
            }, 1000); // 1 segundo para que el jugador vea las cartas
          }
          this.intentosRestantes--;
    }

    if (this.contadorGanar === 6) {
      this.banderaganar = true;
    }
  }
}
