# Google Apps Script Form Handler

This script powers the contact form on `theskyinterior.com`. It receives form submissions via HTTP `POST` and logs them directly to the Google Sheet.

## Script Implementation

```javascript
/**
 * Sky Interior - Website Contact Form Handler
 * Web App URL: https://script.google.com/macros/s/AKfycbyrXGwSxW6AOzOJUQZA-b5SNKptlMy_YcFoMdmju9LtKb1LCIarSkUv50-4BB07UVH6/exec
 */

function doPost(e) {
  try {
    var params = e.parameter;

    // 1. Honeypot Anti-Spam Verification:
    // If the hidden 'website' input contains any value, it was filled by a spam bot.
    // Quietly exit with a 200 OK response without polluting the spreadsheet.
    if (params.website && params.website.toString().trim() !== "") {
      return ContentService.createTextOutput("OK")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    // 2. Append Inquiry to Active Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();

    sheet.appendRow([
      timestamp,
      params.name || "",
      params.phone || "",
      params.email || "",
      params.project || "",
      params.details || ""
    ]);

    // Optional email notification to founders
    // MailApp.sendEmail("skyinteriordesign08@gmail.com", "New Inquiry: " + params.name, params.details);

    return ContentService.createTextOutput("SUCCESS")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService.createTextOutput("ERROR: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
```

## Important Deployment Notes

1. **Deployment Type**: Web App.
2. **Execute as**: *Me* (your Google account).
3. **Who has access**: *Anyone* (even anonymous).
4. **Client-side fetch**: Uses `mode: "no-cors"` to prevent CORS blocks from browser restrictions while delivering the POST payload.
