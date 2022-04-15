import options from "./options/mysqlconfig.js";
import knex from "knex";

const database = knex(options);

database.schema
  .createTable("products", (table) => {
    table.increments("id").nullable(false);
    table.string("title").nullable(false);
    table.float("price").nullable(false);
    table.string("thumbnail", 100).nullable(false);
  })
  .then(() => {
    console.log("table created");
  });

database.schema
  .createTable("messages", (table) => {
    table.string("user").nullable(false);
    table.string("message", 100).nullable(false);
  })
  .then(() => {
    console.log("table created");
  });
