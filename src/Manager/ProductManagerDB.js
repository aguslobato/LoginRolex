import database from "../db/db.js";

class ProductManagerDB {
  getAll = async () => {
    let products = await database("products").select("*");
    return { status: "success", payload: products };
  };

  add = async (product) => {
    let products = await database("products").insert(product);
    return { status: "success", payload: products };
  };
}

export default ProductManagerDB;
