import { TABLES } from "#database/table_names";
import { db } from "#database/utils/db";
import { WBTariff } from "#common/types/tariffs";


/**
 * Save tariffs data to the database
 * @param data - Array of WBTariff objects to be saved
 */
export async function saveTariffs(data: WBTariff[]): Promise<void> {
  try {
    // Start a transaction
    await db.transaction(async (trx) => {
      // Define the batch size
      const batchSize = 100;

      // Insert data with upsert logic
      for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);

        await db(TABLES.TARIFFS)
          .insert(batch)
          .transacting(trx)
          .onConflict(["parentID", "subjectID", "created_day"]) // Columns to handle conflict
          .merge(); // Merge to update existing rows
      }
    });

    console.log("Data successfully inserted/updated!");
  } catch (error) {
    console.error("Error saving tariffs:", error);
    throw error;
  }
}
