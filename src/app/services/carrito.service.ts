import { Injectable, signal, computed } from '@angular/core';

// Interfaz para los items del carrito (producto + cantidad)
export interface ItemCarrito {
  nombre: string;
  img: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // Array de productos en el carrito
  arrayCarrito = signal<ItemCarrito[]>([]);

  // Total a abonar (se recalcula automáticamente cuando cambia el carrito)
  total = computed(() =>
    this.arrayCarrito().reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  );

  // Cantidad total de items (para el badge del navbar)
  cantidadTotal = computed(() =>
    this.arrayCarrito().reduce((sum, item) => sum + item.cantidad, 0)
  );

  // Agrega un producto al carrito. Si ya existe, incrementa la cantidad.
  agregarProducto(producto: { nombre: string; img: string; precio: number }) {
    const carritoActual = this.arrayCarrito();
    const existente = carritoActual.find(item => item.nombre === producto.nombre);

    if (existente) {
      // Si ya está, actualizamos la cantidad
      this.arrayCarrito.set(
        carritoActual.map(item =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      // Si no está, lo agregamos con cantidad 1
      this.arrayCarrito.set([
        ...carritoActual,
        { nombre: producto.nombre, img: producto.img, precio: producto.precio, cantidad: 1 }
      ]);
    }
  }

  // Elimina un producto del carrito
  eliminarProducto(nombre: string) {
    this.arrayCarrito.set(
      this.arrayCarrito().filter(item => item.nombre !== nombre)
    );
  }
}
