const dataPrueba = [{
    id_prestamo: '01',
    nombre: 'Ricardo Tapias',
    posicion: 'Estudiante',
    correo: 'ric.tap@urosario.edu.co',
    fecha_entrega: '2021-10-20 11:00',
    fecha_limite_devolucion: '2021-10-25 11:00'
  }, {
    id_prestamo: '02',
    nombre: 'Bruno Diaz',
    posicion: 'Estudiante',
    correo: 'bru.dia@urosario.edu.co',
    fecha_entrega: '2021-10-20 11:00',
    fecha_limite_devolucion: '2021-10-30 11:00'
  }, {
    id_prestamo: '03',
    nombre: 'Bruno Diaz',
    posicion: 'Estudiante',
    correo: 'bru.dia@urosario.edu.co',
    fecha_entrega: '2021-10-25 11:00',
    fecha_limite_devolucion: '2021-11-29 11:00'
  }, {
    id_prestamo: '04',
    nombre: 'Camila Mendez',
    posicion: 'Profesor',
    correo: 'cam.men@urosario.edu.co',
    fecha_entrega: '2021-10-10 11:00',
    fecha_limite_devolucion: '2021-10-28 11:00'
  }, {
    id_prestamo: '05',
    nombre: 'Juan Galindo',
    posicion: 'Profesor',
    correo: 'juan.gal@urosario.edu.co',
    fecha_entrega: '2021-10-10 11:00',
    fecha_limite_devolucion: '2021-10-31 11:00'
  }, {
    id_prestamo: '06',
    nombre: 'Camilo Martínez',
    posicion: 'Estudiante',
    correo: 'cam.mar@urosario.edu.co',
    fecha_entrega: '2021-10-10 11:00',
    fecha_limite_devolucion: '2021-11-01 11:00'
  }
];

const detallePrueba = [
  {
    id_prestamo: '01',
    productos: [
      {
        codigo: '000001',
        descripcion: 'Generador de funciones arbitrarias',
        categoria: 'Cat1',
        ubicacion: 'Estanteria 1',
        cantidad: '1',
      },
      {
        codigo: '000002',
        descripcion: 'Pasta de soldadura',
        categoria: 'Cat2',
        ubicacion: 'Estanteria 2',
        cantidad: '1',
      },
      {
        codigo: '000003',
        descripcion: 'Led rojo',
        categoria: 'Cat3',
        ubicacion: 'Estanteria 3',
        cantidad: '2',
      }
    ]
  },
  {
    id_prestamo: '02',
    productos: [
      {
        codigo: '000001',
        descripcion: 'Generador de funciones arbitrarias',
        categoria: 'Cat1',
        ubicacion: 'Estanteria 1',
        cantidad: '1',
      },
      {
        codigo: '000002',
        descripcion: 'Pasta de soldadura',
        categoria: 'Cat2',
        ubicacion: 'Estanteria 2',
        cantidad: '1',
      }
    ]
  },
  {
    id_prestamo: '03',
    productos: [
      {
        codigo: '000001',
        descripcion: 'Generador de funciones arbitrarias',
        categoria: 'Cat1',
        ubicacion: 'Estanteria 1',
        cantidad: '1',
      }
    ]
  },
  {
    id_prestamo: '04',
    productos: [
      {
        codigo: '000001',
        descripcion: 'Generador de funciones arbitrarias',
        categoria: 'Cat1',
        ubicacion: 'Estanteria 1',
        cantidad: '1',
      },
      {
        codigo: '000002',
        descripcion: 'Pasta de soldadura',
        categoria: 'Cat2',
        ubicacion: 'Estanteria 2',
        cantidad: '1',
      }
    ]
  },
  {
    id_prestamo: '05',
    productos: [
      {
        codigo: '000001',
        descripcion: 'Generador de funciones arbitrarias',
        categoria: 'Cat1',
        ubicacion: 'Estanteria 1',
        cantidad: '1',
      },
      {
        codigo: '000002',
        descripcion: 'Pasta de soldadura',
        categoria: 'Cat2',
        ubicacion: 'Estanteria 2',
        cantidad: '1',
      },
      {
        codigo: '000003',
        descripcion: 'Jumpers',
        categoria: 'Cat2',
        ubicacion: 'Estanteria 2',
        cantidad: '10',
      },
      {
        codigo: '000004',
        descripcion: 'Arduino',
        categoria: 'Cat4',
        ubicacion: 'Estanteria 2',
        cantidad: '1',
      },
      {
        codigo: '000005',
        descripcion: 'Panel solar',
        categoria: 'Cat5',
        ubicacion: 'Estanteria 2',
        cantidad: '1',
      },
      {
        codigo: '000006',
        descripcion: 'Panel solar',
        categoria: 'Cat5',
        ubicacion: 'Estanteria 2',
        cantidad: '1',
      }
    ]
  }
];

export {dataPrueba, detallePrueba};