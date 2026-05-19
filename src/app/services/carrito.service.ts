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
  arrayCarrito = signal<ItemCarrito[]>([]); //Signal es una forma de manejar el estado de la aplicacion, es decir, es una variable que se puede modificar y que se puede observar para que se actualice la vista cuando cambia

  // Total a abonar (se recalcula automáticamente cuando cambia el carrito)
  total = computed(() => //computed es una funcion que permite crear un signal que se calcula a partir de otro signal
    this.arrayCarrito().reduce((sum, item) => sum + item.precio * item.cantidad, 0) //reduce es una funcion que recorre todo el arreglo y acumula un valor, en este caso suma la cantidad de items
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
        //Recorre todo el arreglo, donde compara el nombre del producto con el nombre del producto del arreglo si es true incrementa la cantidad si es false devuelve el item tal cual.
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
eliminarProducto(producto: { nombre: string; cantidad: number }) {
    this.arrayCarrito.set(
        //Recorre todo el arreglo, donde compara el nombre del producto con el nombre del producto del arreglo si es true incrementa la cantidad si es false devuelve el item tal cual.
        this.arrayCarrito().map(item =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
      );

    if(producto.cantidad === 1) {
      this.arrayCarrito.set( //set asigna un nuevo valor al signal, este es un metodo especial de signal que reemplaza todo el valor actual por uno nuevo
        this.arrayCarrito().filter(item => item.nombre !== producto.nombre) //Te da un nuevo arreglo con los elemntos filtrados, quitando el elemento que se pasa como parametro
      );
    }
  }

  eliminarProductoTodo(producto: { nombre: string; cantidad: number }) {
    this.arrayCarrito.set( //set asigna un nuevo valor al signal, este es un metodo especial de signal que reemplaza todo el valor actual por uno nuevo
      this.arrayCarrito().filter(item => item.nombre !== producto.nombre) //Te da un nuevo arreglo con los elemntos filtrados, quitando el elemento que se pasa como parametro
    );
  }
}