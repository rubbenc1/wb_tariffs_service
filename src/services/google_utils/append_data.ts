import {sheets_v4} from 'googleapis'

export async function appendData(
    sheets: sheets_v4.Sheets, 
    sheetTitle: string, 
    spreadsheetId: string,
    values: (string | number)[][]
){
    const range = `${sheetTitle}!A2`;
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: { values },
    });
}