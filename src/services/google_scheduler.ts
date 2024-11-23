import { exportToGoogleSheets } from "./google_utils/google_service";
import cron from "node-cron";
/**
 * Schedules a daily job at 23:00 to export data to Google Sheets
 */
export function scheduleDailyJob(): void {
  cron.schedule("0 23 * * *", async () => {
    console.log("Running daily job for exporting to Google Sheets...");
    try {
      await exportToGoogleSheets();
      console.log("Daily job completed successfully.");
    } catch (error) {
      console.error("Error during daily job:", error);
    }
  });
}
