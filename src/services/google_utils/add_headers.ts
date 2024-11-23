import {sheets_v4} from 'googleapis'

export async function addHeaders(
    sheets: sheets_v4.Sheets,
    sheetTitle: string,
    spreadsheetId: string,
    headers: string[]
  ) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetTitle}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
  }