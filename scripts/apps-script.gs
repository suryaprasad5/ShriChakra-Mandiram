const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';

const TABS = {
  events: 'Events',
  gallerySections: 'GallerySections',
  sevas: 'Sevas',
};

const HEADERS = {
  Events: ['id', 'title', 'date', 'location', 'summary', 'invitation_url', 'invitation_image', 'gallery_folder_url', 'gallery_folder_id', 'status', 'featured'],
  GallerySections: ['id', 'event_title', 'section_name', 'description', 'drive_folder_url', 'drive_folder_id', 'status', 'sort_order'],
  Sevas: ['id', 'name', 'description', 'price', 'active', 'sort_order'],
};

function doGet(e) {
  const params = e.parameter || {};
  const action = params.action || 'read';

  try {
    if (action === 'read') return jsonResponse(readAllContent());
    if (action === 'saveEvent') return jsonResponse(saveEvent(params));
    if (action === 'saveGallerySection') return jsonResponse(saveGallerySection(params));
    if (action === 'saveSeva') return jsonResponse(saveSeva(params));
    return jsonResponse({ ok: false, error: 'Unknown action: ' + action });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function readAllContent() {
  const gallerySections = readObjects(TABS.gallerySections).map(function(section) {
    const folderId = section.drive_folder_id || extractDriveId(section.drive_folder_url);
    return Object.assign({}, section, {
      drive_folder_id: folderId,
      photos: folderId ? listFolderImages(folderId) : [],
    });
  });

  return {
    ok: true,
    events: readObjects(TABS.events),
    gallerySections: gallerySections,
    sevas: readObjects(TABS.sevas),
  };
}

function saveEvent(params) {
  return saveRow(TABS.events, params, HEADERS.Events, {
    gallery_folder_id: params.gallery_folder_id || extractDriveId(params.gallery_folder_url),
    status: params.status || 'active',
    featured: params.featured || 'yes',
  });
}

function saveGallerySection(params) {
  return saveRow(TABS.gallerySections, params, HEADERS.GallerySections, {
    drive_folder_id: params.drive_folder_id || extractDriveId(params.drive_folder_url),
    status: params.status || 'active',
  });
}

function saveSeva(params) {
  return saveRow(TABS.sevas, params, HEADERS.Sevas, {
    active: params.active || 'yes',
  });
}

function saveRow(tabName, params, headers, defaults) {
  const sheet = getSheet(tabName);
  ensureHeaders(sheet, headers);

  const id = params.id || Utilities.getUuid();
  const rowObject = Object.assign({}, defaults || {}, params, { id: id });
  const rowValues = headers.map(function(header) {
    return rowObject[header] || '';
  });

  const existingRow = findRowById(sheet, id);
  if (existingRow > 0) {
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }

  return { ok: true, id: id };
}

function readObjects(tabName) {
  const sheet = getSheet(tabName);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map(function(header) {
    return String(header).trim();
  });

  return values.slice(1).map(function(row) {
    const obj = {};
    headers.forEach(function(header, index) {
      obj[header] = row[index] == null ? '' : String(row[index]).trim();
    });
    return obj;
  }).filter(function(row) {
    return row.id;
  });
}

function getSheet(tabName) {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(tabName) || spreadsheet.insertSheet(tabName);
}

function ensureHeaders(sheet, headers) {
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some(function(value) {
    return String(value || '').trim();
  });

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function findRowById(sheet, id) {
  const values = sheet.getDataRange().getValues();
  for (let index = 1; index < values.length; index += 1) {
    if (String(values[index][0]) === String(id)) return index + 1;
  }
  return -1;
}

function listFolderImages(folderId) {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  const photos = [];

  while (files.hasNext()) {
    const file = files.next();
    if (String(file.getMimeType()).indexOf('image/') === 0) {
      photos.push({
        id: file.getId(),
        name: file.getName(),
        url: 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1000',
      });
    }
  }

  return photos;
}

function extractDriveId(url) {
  if (!url) return '';
  const match = String(url).match(/(?:\/folders\/|\/file\/d\/|[?&]id=|\/open\?id=)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : '';
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
