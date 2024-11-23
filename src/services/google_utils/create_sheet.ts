import {sheets_v4} from 'googleapis'


export async function create_sheet(sheets: sheets_v4.Sheets, sheetTitle: string, spreadsheetId: string) {
    await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetTitle,
                },
              },
            },
          ],
        },
      });
}