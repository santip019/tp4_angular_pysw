import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GestionInscripcion } from '../../services/gestionInscripcion';

@Component({
  selector: 'app-parte2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './parte2.html',
  styleUrl: './parte2.css',
})

export class Parte2 implements OnInit {

  // Variable para controlar el envio del formulario
  submitted = false;
  
  // Formulario
  public inscripcionForm: FormGroup;

  // Array que almacena las categorias
  categorias = [
    { id: 1, nombre: "Estudiante" },
    { id: 2, nombre: "Egresado" },
    { id: 3, nombre: "Particular" }
  ];

  // Constructor
  constructor(
    private formBuilder: FormBuilder, // Builder para construir el formulario
    public gestionService: GestionInscripcion // Importamos el servicio
  ) {
    this.inscripcionForm = this.formBuilder.group({
      dni: new FormControl('', [Validators.required, Validators.pattern("\\d{7,8}")]),
      precio: new FormControl('', [Validators.required, Validators.pattern("\\d+")]),
      categoriaAlumno: new FormControl('', [Validators.required]),
      fechaInscripcion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      curso: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() { 
    // Se ejecuta al inicializar el componente
  }

  // Metodo para limpiar el formulario
  limpiarFormulario() {
    this.inscripcionForm.reset();
    this.submitted = false;
  }

  // Metodo que se ejecuta al registrar el formulario
  onSubmit() {
    this.submitted = true;

    if (this.inscripcionForm.valid) {
      const alumno = this.inscripcionForm.value;
      
      // Verificamos si ya existe (para decidir si agregar o actualizar)
      const existe = this.gestionService.getAlumnoByDni(alumno.dni);
      
      if (existe) {
        this.gestionService.updateAlumno(alumno.dni, alumno);
        alert('Alumno actualizado correctamente');
      } else {
        this.gestionService.addAlumno(alumno);
        alert('Alumno inscripto correctamente');
      }

      console.log('Alumnos actuales:', this.gestionService.getAlumnos());
      this.limpiarFormulario();
    } else {
      alert('Por favor, complete el formulario correctamente');
    }
  }

  // Calcula el precio total con descuento para un alumno específico
  getPrecioConDescuento(alumno: any): number {
    const precio = Number(alumno.precio) || 0;
    const categoria = alumno.categoriaAlumno;
    let total = precio;
    
    if (categoria === "Estudiante") {
      total = precio * 0.65;
    } else if (categoria === "Egresado") {
      total = precio * 0.50;
    }
    return total;
  }

  // Obtiene el resumen de inscripciones por categoría
  getResumenPorCategoria() {
    const resumen: { [key: string]: number } = { //un objeto que tiene como clave un string y como valor un numero, en este caso string es la categoria y el numero es la cantidad de alumnos en esa categoria
      "Estudiante": 0,
      "Egresado": 0,
      "Particular": 0
    };

    this.gestionService.getAlumnos().forEach(a => { // Recorre el array de alumnos
      if (resumen[a.categoriaAlumno] !== undefined) { //si la categoria del alumno existe en el objeto resumen 
        resumen[a.categoriaAlumno]++;//aumenta la cantidad segun la categoria, osea es un contador
      }
    });

    return Object.keys(resumen).map(key => ({ // Transforma el objeto resumen en un array de objetos el key es la categoria y el value es la cantidad
      categoria: key,
      cantidad: resumen[key]
    }));
  }

  // Calcula el total general (suma de todos los precios con descuento)
  getTotalGeneral(): number {
    return this.gestionService.getAlumnos().reduce((sum, a) => {
      return sum + this.getPrecioConDescuento(a);
    }, 0);
  }

  // Calcula el precio total con descuento (para el formulario)
  precioTotal(): number {
    return this.getPrecioConDescuento(this.inscripcionForm.value);
  }
}
