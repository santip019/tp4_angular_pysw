import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroService } from '../../services/filtro.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-actividad1',
  imports: [CommonModule],
  templateUrl: './actividad1.html',
  styleUrl: './actividad1.css',
})
export class Actividad1 {

  productos = [
    {
      categoria: "Celulares",
      img: "assets/img/Samsun a54.webp",
      nombre: "Smartphone Samsung Galaxy A54 128GB",
      precio: 450000,
      descripcion: "Celular con pantalla Super AMOLED de 6.4 pulgadas, 128GB de almacenamiento, cámara triple de 50MP y batería de larga duración. Ideal para uso diario y redes sociales."
    },
    {
      categoria: "Computadoras",
      img: "assets/img/lenovo r3.webp",
      nombre: "Notebook Lenovo IdeaPad 3 Ryzen 5",
      precio: 780000,
      descripcion: "Laptop con procesador AMD Ryzen 5, 8GB de RAM y SSD de 512GB. Perfecta para estudio, programación y tareas multitarea."
    },
    {
      categoria: "Accesorios",
      img: "assets/img/jbltune.webp",
      nombre: "Auriculares Inalámbricos JBL Tune 510BT",
      precio: 85000,
      descripcion: "Auriculares Bluetooth con sonido potente, batería de hasta 40 horas y diseño cómodo para uso prolongado."
    },
    {
      categoria: "Televisores",
      img: "assets/img/lg50pulgada.webp",
      nombre: "Smart TV LG 50'' 4K UHD",
      precio: 920000,
      descripcion: "Televisor 4K con sistema webOS, HDR activo y acceso a apps como Netflix y YouTube. Excelente calidad de imagen."
    },
    {
      categoria: "Accesorios",
      img: "assets/img/mouseRDcobra.webp",
      nombre: "Mouse Gamer Redragon Cobra M711",
      precio: 35000,
      descripcion: "Mouse con sensor de alta precisión, iluminación RGB y botones programables. Ideal para gaming."
    },
    {
      categoria: "Accesorios",
      img: "assets/img/tecladoAlloy.webp",
      nombre: "Teclado Mecánico HyperX Alloy Core RGB",
      precio: 120000,
      descripcion: "Teclado con iluminación RGB, teclas resistentes y respuesta rápida para gaming o escritura intensiva."
    },
    {
      categoria: "Tablets",
      img: "assets/img/tabA8.webp",
      nombre: "Tablet Samsung Galaxy Tab A8",
      precio: 390000,
      descripcion: "Tablet con pantalla de 10.5 pulgadas, 64GB de almacenamiento y batería duradera. Perfecta para entretenimiento y estudio."
    },
    {
      categoria: "Computadoras",
      img: "assets/img/ssdkingstone.webp",
      nombre: "Disco Sólido SSD Kingston 1TB",
      precio: 110000,
      descripcion: "Unidad de almacenamiento de alta velocidad para mejorar el rendimiento de PC o notebook."
    },
    {
      categoria: "Televisores",
      img: "assets/img/MonitorG3.webp",
      nombre: "Monitor Gamer Samsung 24'' 144Hz",
      precio: 480000,
      descripcion: "Monitor Full HD con tasa de refresco de 144Hz, ideal para juegos competitivos y fluidez de imagen."
    },
    {
      categoria: "Accesorios",
      img: "assets/img/camarac920.webp",
      nombre: "Cámara Web Logitech C920 HD",
      precio: 150000,
      descripcion: "Cámara web Full HD 1080p con micrófono integrado, perfecta para videollamadas y streaming."
    }
  ];

  constructor(
    public filtroService: FiltroService,
    public carritoService: CarritoService
  ) { }

  // Esta lista se actualiza sola cuando cambia la categoría en el servicio
  productosFiltrados = computed(() => {
    const filtro = this.filtroService.categoriaSeleccionada(); //aca se obtiene el valor de la variable, y como es un signal, cualquier componente que esté suscrito a esta variable se actualizará automáticamente
    if (!filtro) return this.productos; //si no hay filtro, se muestra toda la lista
    return this.productos.filter(p => p.categoria === filtro); //aca se filtra la lista de productos
  });

  // Agrega un producto al carrito usando el servicio compartido
  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
  }

}
