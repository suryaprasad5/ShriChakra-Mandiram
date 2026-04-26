'use client';

import { useMemo, useState } from 'react';

const defaultEvent = {
  title: 'Navaratri Mahotsavam',
  date: '2026-10-12',
  location: 'Main Temple Hall',
  summary: 'Nine nights of Devi worship, alankara, chanting, and community seva.',
  invitationName: '',
  invitationPreview: '',
  gallerySections: [
    {
      id: 1,
      name: 'Day 1 - Devi Alankara',
      description: 'Photos from the first day of Navaratri worship.',
      photos: [],
    },
  ],
};

function fileToPreview(file) {
  return {
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file),
  };
}

export default function AdminPage() {
  const [event, setEvent] = useState(defaultEvent);
  const [activeSectionId, setActiveSectionId] = useState(defaultEvent.gallerySections[0].id);
  const [notice, setNotice] = useState('');

  const activeSection = useMemo(
    () => event.gallerySections.find((section) => section.id === activeSectionId) ?? event.gallerySections[0],
    [event.gallerySections, activeSectionId],
  );

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

  function addInvitation(file) {
    if (!file) return;
    const preview = fileToPreview(file);
    setEvent((current) => ({
      ...current,
      invitationName: preview.name,
      invitationPreview: preview.url,
    }));
  }

  function saveDraft() {
    window.localStorage.setItem('shrichakra-admin-draft', JSON.stringify({
      ...event,
      invitationPreview: event.invitationName ? '[local-preview]' : '',
      gallerySections: event.gallerySections.map((section) => ({
        ...section,
        photos: section.photos.map((photo) => ({ name: photo.name, size: photo.size })),
      })),
    }));
    setNotice('Draft saved locally in this browser. Backend publishing can be connected later.');
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <p className="admin-kicker">ShriChakra Mandiram</p>
          <h1>Admin Portal</h1>
          <p>Manage gallery sections, photo uploads, event details, and invitation artwork.</p>
        </div>
        <div className="admin-stat">
          <span>Gallery Sections</span>
          <strong>{event.gallerySections.length}</strong>
        </div>
        <div className="admin-stat">
          <span>Total Photos</span>
          <strong>{event.gallerySections.reduce((total, section) => total + section.photos.length, 0)}</strong>
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">Direct Access Only</p>
            <h2>Gallery & Event Manager</h2>
          </div>
          <button className="admin-primary" type="button" onClick={saveDraft}>Save Draft</button>
        </header>

        {notice ? <div className="admin-notice">{notice}</div> : null}

        <div className="admin-grid">
          <section className="admin-panel">
            <div className="admin-panel-heading">
              <p className="admin-kicker">Event Details</p>
              <h3>Invitation & Schedule</h3>
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
            <label className="admin-upload">
              <span>Upload Invitation Picture</span>
              <input type="file" accept="image/*" onChange={(e) => addInvitation(e.target.files?.[0])} />
            </label>
            {event.invitationPreview ? (
              <div className="admin-invitation-preview">
                <img src={event.invitationPreview} alt={event.invitationName} />
                <span>{event.invitationName}</span>
              </div>
            ) : null}
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
                  <small>{section.photos.length} photos</small>
                </button>
              ))}
            </div>
            <button className="admin-secondary" type="button" onClick={addSection}>Add Event Section</button>
          </section>
        </div>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <p className="admin-kicker">Selected Section</p>
            <h3>{activeSection.name}</h3>
          </div>
          <div className="admin-two">
            <label>
              Section Name
              <input value={activeSection.name} onChange={(e) => updateSection(activeSection.id, 'name', e.target.value)} />
            </label>
            <label>
              Description
              <input value={activeSection.description} onChange={(e) => updateSection(activeSection.id, 'description', e.target.value)} />
            </label>
          </div>
          <label className="admin-upload">
            <span>Upload Photos to This Section</span>
            <input type="file" accept="image/*" multiple onChange={(e) => addPhotos(e.target.files ?? [])} />
          </label>
          <div className="admin-photo-grid">
            {activeSection.photos.length ? activeSection.photos.map((photo) => (
              <figure key={`${photo.name}-${photo.url}`}>
                <img src={photo.url} alt={photo.name} />
                <figcaption>{photo.name}</figcaption>
              </figure>
            )) : (
              <div className="admin-empty">No photos uploaded to this section yet.</div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
