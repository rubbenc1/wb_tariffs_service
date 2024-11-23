import { TABLES } from "#database/table_names";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTable(TABLES.TARIFFS, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.decimal("kgvpMarketplace", 10, 2).notNullable();
    table.decimal("kgvpSupplier", 10, 2).notNullable();
    table.decimal("kgvpSupplierExpress", 10, 2).notNullable();
    table.decimal("paidStorageKgvp", 10, 2).notNullable();
    table.integer("parentID").notNullable();
    table.string("parentName", 200).notNullable();
    table.integer("subjectID").notNullable();
    table.string("subjectName", 200).notNullable();
    table.date("created_day").notNullable().defaultTo(knex.fn.now());

    // Add the unique constraint directly in createTable
    table.unique(["parentID", "subjectID","created_day"], "unique_id_created_day");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLES.TARIFFS);
}
