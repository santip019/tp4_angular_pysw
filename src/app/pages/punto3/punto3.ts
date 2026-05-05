import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaz para representar cada carta del tablero
export interface Carta {
  id: number;
  valor: string; // Puede ser el nombre de la imagen, un emoji, o un string
  descubierta: boolean; // Indica si la carta está boca arriba o boca abajo
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
    { id: 1, valor: 'A', descubierta: false },
    { id: 2, valor: 'A', descubierta: false },
    { id: 3, valor: 'B', descubierta: false },
    { id: 4, valor: 'B', descubierta: false },
    { id: 5, valor: 'C', descubierta: false },
    { id: 6, valor: 'C', descubierta: false },
    { id: 7, valor: 'D', descubierta: false },
    { id: 8, valor: 'D', descubierta: false },
    { id: 9, valor: 'E', descubierta: false },
    { id: 10, valor: 'E', descubierta: false },
    { id: 11, valor: 'F', descubierta: false },
    { id: 12, valor: 'F', descubierta: false },
  ];

  // --- Variables de estado ---
  intentosRestantes: number = 0; 
  juegoIniciado: boolean = false;
  cartasSeleccionadas: Carta[] = [];
  
  // Variable para cumplir con el botón "INTENTAR" que habilita a voltear
  puedeVoltear: boolean = false; 

  // 1. La lógica de INICIAR y REINICIAR
  iniciarJuego() {
    this.juegoIniciado = true;
    this.intentosRestantes = 10; // Iniciamos con 10 intentos
    this.puedeVoltear = false;
    this.cartasSeleccionadas = [];
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
      alert("No te quedan intentos");
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
      // POR HACER:
      // Validar cartas, tener en cuenta intentos y definir derrota
    }
  }
}
