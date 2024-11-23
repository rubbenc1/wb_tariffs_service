import { fetchAndStoreTariffs } from "./wb_utils/wb_api_service";
import cron from "node-cron";

/**
 * Schedules an hourly job
 */
export function scheduleHourlyJob(): void {
  cron.schedule("0 * * * *", async () => {
    console.log("Running hourly job...");
    try {
      await fetchAndStoreTariffs();
    } catch (error) {
      console.error("Error during hourly job:", error);
    }
  });
}
