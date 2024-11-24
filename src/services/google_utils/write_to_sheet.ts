import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { join } from 'path';
import dayjs from 'dayjs';
import { create_sheet } from './create_sheet';
import { addHeaders } from './add_headers';
import { appendData } from './append_data';

export async function appendDataToSheet(
  spreadsheetId: string,
  headers: string[],
  values: (string | number)[][]
) {
  const credentialsPath = join(__dirname, '../../../utopian-domain-441510-c1-63ab62144de2.json');
  const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Generate today's date for the sheet title
  const sheetTitle = dayjs().format('YYYY-MM-DD');

  // Check if the sheet already exists
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetExists = spreadsheet.data.sheets?.some(
    sheet => sheet.properties?.title === sheetTitle
  );

  // If the sheet does not exist, create it
  if (!sheetExists) {
    await create_sheet(sheets, sheetTitle, spreadsheetId);
    await addHeaders(sheets, sheetTitle,spreadsheetId, headers);
  }
  await appendData(sheets, sheetTitle, spreadsheetId, values);

}
