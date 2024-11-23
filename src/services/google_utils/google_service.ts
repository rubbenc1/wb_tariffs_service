import * as dotenv from 'dotenv';
import {resolve } from 'path';
import { fetchDataInBatches } from './fetch_data_from_pg';
import { BATCH_SIZE, HEADERS } from '#common/variables/variables';
import { appendDataToSheet } from './write_to_sheet';

dotenv.config({ path: resolve(__dirname, '../../.env') });

export async function exportToGoogleSheets(){
    let offset = 0;

    try {
        while (true) {
            const batch = await fetchDataInBatches(BATCH_SIZE, offset);
      
            if (batch.length === 0) {
              console.log('No more data to fetch.');
              break;
            }
      
            const values = batch.map(row => [
              row.kgvpMarketplace,
              row.kgvpSupplier,
              row.kgvpSupplierExpress,
              row.paidStorageKgvp,
              row.parentID,
              row.parentName,
              row.subjectID,
              row.subjectName,
            ]);
            await appendDataToSheet(process.env.SPREADSHEET_ID ||'', HEADERS, values);
      
            offset += BATCH_SIZE;
        }
      
          console.log('All data processed and appended successfully!');
    } catch (error){
        console.error('Error processing data:', error);
    }

}