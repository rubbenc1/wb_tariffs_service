import knexconfig from "#config/knexfile";
import knex from "knex";


export const db = knex(knexconfig);