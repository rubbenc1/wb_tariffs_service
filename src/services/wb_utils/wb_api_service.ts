import {  WBTariff } from "#common/types/tariffs";
import axios from "axios";
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { saveTariffs } from "#services/wb_utils/save_tarrifs";

dotenv.config({ path: resolve(__dirname, '../../../.env') });

const WB_API = process.env.WB_URL || "";
const API_SESSION = process.env.API_SESSION || "";
/**
 * Fetch tariffs data from WB and save to the database
 */
export async function fetchAndStoreTariffs(): Promise<void> {
    try {
        console.log('Fetching tariffs from WB API...');
        
        const response = await axios.get<{report: WBTariff[]}>(WB_API, {
            headers: {
                Authorization: `Bearer ${API_SESSION}`
            },
        });

        const data = response.data?.report;

        if (!Array.isArray(data)) {
            console.error("Unexpected API response format");
            throw new Error("Invalid data format");
        }

        console.log("Saving tariffs to the database...");
        await saveTariffs(data);
        console.log("Tariffs successfully fetched and stored!");
    } catch (error) {
        console.error("Error fetching or storing tariffs:", error);
        throw error;
    }

}
