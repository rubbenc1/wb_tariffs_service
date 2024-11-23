import pool from "#config/pooling";
import { WBTariff } from "#common/types/tariffs";


export async function fetchDataInBatches(batchSize: number, offset: number): Promise<WBTariff[]> {
    const query = `
      SELECT * 
      FROM tarrifs
      WHERE created_day = CURRENT_DATE
      LIMIT $1 OFFSET $2;`;
  
    const result = await pool.query(query, [batchSize, offset]);
    return result.rows;
  }