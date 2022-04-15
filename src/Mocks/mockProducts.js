import faker from "faker";
import ContenedorMemoria from "../contenedores/ContenedorMemoria.js";
const { datatype } = faker;

export default class MockProducts extends ContenedorMemoria {
  constructor() {
    super();
  }

  productos = (cant) => {
    const nuevosProductos = [];
    for (let i = 0; i < cant; i++) {
      nuevosProductos.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        descripcion: faker.lorem.sentence(),
        imagen: faker.image.imageUrl(),
        cantidad: faker.datatype.number(),
      });
    }
    this.products = [...this.products, ...nuevosProductos];
    return nuevosProductos;
  };
}
