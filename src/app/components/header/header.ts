import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule, DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { FiltroService } from '../../services/filtro.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isDarkMode = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public filtroService: FiltroService,  //aca se inyecta el servicio
    public carritoService: CarritoService
  ) {
    this.isDarkMode = this.document.body.classList.contains('dark-mode');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      this.document.body.classList.add('dark-mode');
    } else {
      this.document.body.classList.remove('dark-mode');
    }
  }
}