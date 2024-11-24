import express from 'express';
import dotenv from 'dotenv';
import { logger } from './utils/logger'; 
import { scheduleHourlyJob } from '#services/wb_scheduler';
import { scheduleDailyJob } from '#services/google_scheduler';


dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, async () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    await scheduleHourlyJob();
    await scheduleDailyJob();
});