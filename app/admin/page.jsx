'use client';

import { useMemo, useState } from 'react';

const defaultEvent = {
  title: 'Navaratri Mahotsavam',
  date: '2026-10-12',
  location: 'Main Temple Hall',
  summary: 'Nine nights of Devi worship, alankara, chanting, and community seva.',
  invitationFileUrl: '',
  galleryDriveFolderUrl: '',
  gallerySections: [
    {
      id: 1,
      name: 'Day 1 - Devi Alankara',
      description: 'Photos from the first day of Navaratri worship.',
      driveFolderUrl: '',
      photos: [],
    },
  ],
};

const defaultSevas = [
  { id: 1, name: 'Archana', description: 'Personal offering with name, nakshatra, flowers, kumkum, and Devi ashtottara.', price: '₹251', active: true },
  { id: 2, name: 'Abhishekam', description: 'Sacred bathing of the deity with panchamrita, fresh water, and flowers.', price: '₹501', active: true },
  { id: 3, name: 'Ganapati Homa', description: 'Fire ritual to remove obstacles before new beginnings and life events.', price: '₹1,100', active: true },
  { id: 4, name: 'Chandi Homa', description: 'Powerful Devi Mahatmyam fire ritual for protection and wellbeing.', price: '₹5,100', active: true },
  { id: 5, name: 'Navagraha Puja', description: 'Propitiation of the nine planetary deities for harmony and relief.', price: '₹1,501', active: true },
  { id: 6, name: 'Sahasra Deepa Puja', description: 'Lighting of 1,008 lamps before the Devi, especially auspicious on Fridays.', price: '₹2,100', active: true },
];

const defaultIntegration = {
  sheetCsvUrl: '',
  appsScriptUrl: '',
};

function fileToPreview(file) {
  return {
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file),
  };
}

function extractDriveId(url) {
  if (!url) return '';
  const patterns = [
    /\/folders\/([a-zA-Z0-9_-]+)/,
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/open\?id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return '';
}

function driveImageUrl(url) {
  const id = extractDriveId(url);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1000` : '';
}

export default function AdminPage() {
  const [event, setEvent] = useState(defaultEvent);
  const [integration, setIntegration] = useState(defaultIntegration);
  const [sevas, setSevas] = useState(defaultSevas);
  const [activeSectionId, setActiveSectionId] = useState(defaultEvent.gallerySections[0].id);
  const [activeSevaId, setActiveSevaId] = useState(defaultSevas[0].id);
  const [notice, setNotice] = useState('');

  const activeSection = useMemo(
    () => event.gallerySections.find((section) => section.id === activeSectionId) ?? event.gallerySections[0],
    [event.gallerySections, activeSectionId],
  );

  const activeSeva = useMemo(
    () => sevas.find((seva) => seva.id === activeSevaId) ?? sevas[0],
    [sevas, activeSevaId],
  );

  const publishPayload = useMemo(() => JSON.stringify({
    event: {
      ...event,
      invitationFileId: extractDriveId(event.invitationFileUrl),
      invitationImageUrl: driveImageUrl(event.invitationFileUrl),
      galleryDriveFolderId: extractDriveId(event.galleryDriveFolderUrl),
      gallerySections: event.gallerySections.map((section) => ({
        ...section,
        driveFolderId: extractDriveId(section.driveFolderUrl),
        photos: section.photos.map((photo) => ({ name: photo.name, size: photo.size })),
      })),
    },
    sevas,
    integration,
  }, null, 2), [event, sevas, integration]);

  function updateIntegration(field, value) {
    setIntegration((current) => ({ ...current, [field]: value }));
  }

  function updateEvent(field, value) {
    setEvent((current) => ({ ...current, [field]: value }));
  }

  function updateSection(id, field, value) {
    setEvent((current) => ({
      ...current,
      gallerySections: current.gallerySections.map((section) => (
        section.id === id ? { ...section, [field]: value } : section
      )),
    }));
  }

  function addSection() {
    const id = Date.now();
    const section = {
      id,
      name: 'New Event Section',
      description: 'Describe this gallery section.',
      driveFolderUrl: '',
      photos: [],
    };

    setEvent((current) => ({
      ...current,
      gallerySections: [...current.gallerySections, section],
    }));
    setActiveSectionId(id);
  }

  function addPhotos(files) {
    const previews = Array.from(files).map(fileToPreview);
    setEvent((current) => ({
      ...current,
      gallerySections: current.gallerySections.map((section) => (
        section.id === activeSectionId
          ? { ...section, photos: [...section.photos, ...previews] }
          : section
      )),
    }));
  }

  function updateSeva(id, field, value) {
    setSevas((current) => current.map((seva) => (
      seva.id === id ? { ...seva, [field]: value } : seva
    )));
  }

  function addSeva() {
    const id = Date.now();
    const seva = {
      id,
      name: 'New Seva',
      description: 'Describe the seva and what is included.',
      price: '₹',
      active: true,
    };
    setSevas((current) => [...current, seva]);
    setActiveSevaId(id);
  }

  function saveDraft() {
    window.localStorage.setItem('shrichakra-admin-draft', publishPayload);
    setNotice('Draft saved locally. Use the Sheet save buttons or copy this payload for backend work later.');
  }

  function sendToSheet(action, data) {
    if (!integration.appsScriptUrl) {
      setNotice('Add the Apps Script Web App URL before saving to Google Sheet.');
      return;
    }

    const params = new URLSearchParams({ action });
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, value == null ? '' : String(value));
    });

    fetch(`${integration.appsScriptUrl}?${params.toString()}`, {
      method: 'GET',
      mode: 'no-cors',
    })
      .then(() => setNotice(`Sent ${action} to Google Sheet. Refresh the site after the sheet updates.`))
      .catch((error) => setNotice(`Save failed: ${error.message}`));
  }

  function copyPayload() {
    window.navigator.clipboard?.writeText(publishPayload);
    setNotice('Website payload copied.');
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <p className="admin-kicker">ShriChakra Mandiram</p>
          <h1>Admin Portal</h1>
          <p>Manage Drive-linked gallery albums, invitations, events, and sevas.</p>
        </div>
        <div className="admin-stat">
          <span>Gallery Sections</span>
          <strong>{event.gallerySections.length}</strong>
        </div>
        <div className="admin-stat">
          <span>Sevas</span>
          <strong>{sevas.length}</strong>
        </div>
        <div className="admin-stat">
          <span>Drive Links</span>
          <strong>{event.gallerySections.filter((section) => section.driveFolderUrl).length + (event.galleryDriveFolderUrl ? 1 : 0)}</strong>
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">Direct Access Only</p>
            <h2>Temple Content Manager</h2>
          </div>
          <div className="admin-actions">
            <button className="admin-secondary" type="button" onClick={copyPayload}>Copy Payload</button>
            <button className="admin-primary" type="button" onClick={saveDraft}>Save Draft</button>
          </div>
        </header>

        {notice ? <div className="admin-notice">{notice}</div> : null}

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <p className="admin-kicker">Google Sheet Connection</p>
            <h3>Same Lightweight Method as Turnkey</h3>
          </div>
          <div className="admin-two">
            <label>
              Published Google Sheet CSV URL
              <input
                value={integration.sheetCsvUrl}
                placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                onChange={(e) => updateIntegration('sheetCsvUrl', e.target.value)}
              />
            </label>
            <label>
              Apps Script Web App URL
              <input
                value={integration.appsScriptUrl}
                placeholder="https://script.google.com/macros/s/.../exec"
                onChange={(e) => updateIntegration('appsScriptUrl', e.target.value)}
              />
            </label>
          </div>
          <div className="admin-drive-summary">
            <span>No Google API key is needed. The public website can read a published CSV, and admin saves can go through Apps Script GET requests.</span>
            <span>Recommended tabs: Events, GallerySections, Sevas.</span>
          </div>
        </section>

        <div className="admin-grid">
          <section className="admin-panel">
            <div className="admin-panel-heading">
              <p className="admin-kicker">Event Details</p>
              <h3>Invitation & Drive Folder</h3>
            </div>
            <label>
              Event Title
              <input value={event.title} onChange={(e) => updateEvent('title', e.target.value)} />
            </label>
            <div className="admin-two">
              <label>
                Event Date
                <input type="date" value={event.date} onChange={(e) => updateEvent('date', e.target.value)} />
              </label>
              <label>
                Location
                <input value={event.location} onChange={(e) => updateEvent('location', e.target.value)} />
              </label>
            </div>
            <label>
              Event Summary
              <textarea value={event.summary} onChange={(e) => updateEvent('summary', e.target.value)} />
            </label>
            <label>
              Invitation Google Drive Image Link
              <input
                value={event.invitationFileUrl}
                placeholder="https://drive.google.com/file/d/..."
                onChange={(e) => updateEvent('invitationFileUrl', e.target.value)}
              />
            </label>
            <label>
              Event Gallery Google Drive Folder Link
              <input
                value={event.galleryDriveFolderUrl}
                placeholder="https://drive.google.com/drive/folders/..."
                onChange={(e) => updateEvent('galleryDriveFolderUrl', e.target.value)}
              />
            </label>
            <div className="admin-drive-summary">
              <span>Invitation file ID: {extractDriveId(event.invitationFileUrl) || 'Not set'}</span>
              <span>Event folder ID: {extractDriveId(event.galleryDriveFolderUrl) || 'Not set'}</span>
            </div>
            {driveImageUrl(event.invitationFileUrl) ? (
              <div className="admin-invitation-preview">
                <img src={driveImageUrl(event.invitationFileUrl)} alt={`${event.title} invitation`} />
                <span>Invitation preview from Google Drive</span>
              </div>
            ) : null}
            <button
              className="admin-secondary"
              type="button"
              onClick={() => sendToSheet('saveEvent', {
                title: event.title,
                date: event.date,
                location: event.location,
                summary: event.summary,
                invitation_url: event.invitationFileUrl,
                invitation_image: driveImageUrl(event.invitationFileUrl),
                gallery_folder_url: event.galleryDriveFolderUrl,
                gallery_folder_id: extractDriveId(event.galleryDriveFolderUrl),
              })}
            >
              Save Event to Google Sheet
            </button>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-heading">
              <p className="admin-kicker">Gallery Sections</p>
              <h3>Event Albums</h3>
            </div>
            <div className="admin-section-list">
              {event.gallerySections.map((section) => (
                <button
                  className={section.id === activeSectionId ? 'active' : ''}
                  type="button"
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                >
                  <span>{section.name}</span>
                  <small>{extractDriveId(section.driveFolderUrl) ? 'Drive linked' : `${section.photos.length} photos`}</small>
                </button>
              ))}
            </div>
            <button className="admin-secondary" type="button" onClick={addSection}>Add Event Section</button>
          </section>
        </div>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <p className="admin-kicker">Selected Gallery Section</p>
            <h3>{activeSection.name}</h3>
          </div>
          <div className="admin-two">
            <label>
              Section Name
              <input value={activeSection.name} onChange={(e) => updateSection(activeSection.id, 'name', e.target.value)} />
            </label>
            <label>
              Google Drive Folder Link
              <input
                value={activeSection.driveFolderUrl}
                placeholder="https://drive.google.com/drive/folders/..."
                onChange={(e) => updateSection(activeSection.id, 'driveFolderUrl', e.target.value)}
              />
            </label>
          </div>
          <label>
            Description
            <input value={activeSection.description} onChange={(e) => updateSection(activeSection.id, 'description', e.target.value)} />
          </label>
          <div className="admin-drive-summary">
            <span>Section folder ID: {extractDriveId(activeSection.driveFolderUrl) || 'Not set'}</span>
          </div>
          <label className="admin-upload">
            <span>Local Photo Preview Upload</span>
            <input type="file" accept="image/*" multiple onChange={(e) => addPhotos(e.target.files ?? [])} />
          </label>
          <div className="admin-photo-grid">
            {activeSection.photos.length ? activeSection.photos.map((photo) => (
              <figure key={`${photo.name}-${photo.url}`}>
                <img src={photo.url} alt={photo.name} />
                <figcaption>{photo.name}</figcaption>
              </figure>
            )) : (
              <div className="admin-empty">Drive-linked photos will appear after backend sync is connected.</div>
            )}
          </div>
          <button
            className="admin-secondary"
            type="button"
            onClick={() => sendToSheet('saveGallerySection', {
              event_title: event.title,
              section_name: activeSection.name,
              description: activeSection.description,
              drive_folder_url: activeSection.driveFolderUrl,
              drive_folder_id: extractDriveId(activeSection.driveFolderUrl),
            })}
          >
            Save Gallery Section to Google Sheet
          </button>
        </section>

        <div className="admin-grid">
          <section className="admin-panel">
            <div className="admin-panel-heading">
              <p className="admin-kicker">Seva Details</p>
              <h3>Names, Description & Pricing</h3>
            </div>
            <div className="admin-section-list">
              {sevas.map((seva) => (
                <button
                  className={seva.id === activeSevaId ? 'active' : ''}
                  type="button"
                  key={seva.id}
                  onClick={() => setActiveSevaId(seva.id)}
                >
                  <span>{seva.name}</span>
                  <small>{seva.price}</small>
                </button>
              ))}
            </div>
            <button className="admin-secondary" type="button" onClick={addSeva}>Add Seva</button>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-heading">
              <p className="admin-kicker">Selected Seva</p>
              <h3>{activeSeva.name}</h3>
            </div>
            <label>
              Seva Name
              <input value={activeSeva.name} onChange={(e) => updateSeva(activeSeva.id, 'name', e.target.value)} />
            </label>
            <label>
              Price
              <input value={activeSeva.price} onChange={(e) => updateSeva(activeSeva.id, 'price', e.target.value)} />
            </label>
            <label>
              Description
              <textarea value={activeSeva.description} onChange={(e) => updateSeva(activeSeva.id, 'description', e.target.value)} />
            </label>
            <label className="admin-check">
              <input
                type="checkbox"
                checked={activeSeva.active}
                onChange={(e) => updateSeva(activeSeva.id, 'active', e.target.checked)}
              />
              <span>Show this seva on the website</span>
            </label>
            <button
              className="admin-secondary"
              type="button"
              onClick={() => sendToSheet('saveSeva', {
                name: activeSeva.name,
                description: activeSeva.description,
                price: activeSeva.price,
                active: activeSeva.active ? 'yes' : 'no',
              })}
            >
              Save Seva to Google Sheet
            </button>
          </section>
        </div>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <p className="admin-kicker">Website Payload</p>
            <h3>Backend-Ready Content JSON</h3>
          </div>
          <textarea className="admin-json" readOnly value={publishPayload} />
        </section>
      </section>
    </main>
  );
}
