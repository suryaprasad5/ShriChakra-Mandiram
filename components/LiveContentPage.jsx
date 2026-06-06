'use client';

import { useEffect, useState } from 'react';
import { basePath, withBasePath } from '@/lib/site';

const routeMap = {
  'index.html': '/',
  'about.html': '/about',
  'deities.html': '/deities',
  'services.html': '/sevas',
  'events.html': '/events',
  'facilities.html': '/facilities',
  'contact.html': '/contact',
};

function normalizeHtml(html = '') {
  let output = html
    .replaceAll('ShriChakra<br><span>Mandiram</span>', 'Shreevidya<br><span>Shreechakra Mahameru Mandiram</span>')
    .replaceAll('View Services', 'View Sevas')
    .replaceAll('ShriChakra', 'Shreechakra')
    .replaceAll('Shrichakra', 'Shreechakra')
    .replaceAll('shrichakramandiram.org', 'shreechakramandiram.org')
    .replaceAll('rgba(139,26,26', 'rgba(184,62,72');

  for (const [legacy, route] of Object.entries(routeMap)) {
    output = output.replaceAll(`href="${legacy}"`, `href="${basePath}${route}"`);
  }
  return output.replaceAll('src="shrichakra.png"', `src="${basePath}/shrichakra.png"`);
}

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current);
  return values.map((value) => value.replace(/^"|"$/g, '').trim());
}

function parseCsv(csv) {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce((row, header, index) => ({
      ...row,
      [header]: values[index] ?? '',
    }), {});
  });
}

function splitList(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function extractDriveId(url = '') {
  const match = url.match(/(?:\/folders\/|\/file\/d\/|[?&]id=|\/open\?id=)([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? '';
}

function driveImageUrl(url = '') {
  const id = extractDriveId(url);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1000` : url;
}

function activeRows(rows, field = 'status') {
  return rows.filter((row) => {
    const status = String(row[field] ?? row.status ?? 'active').trim().toLowerCase();
    return status !== 'inactive' && status !== 'hidden' && status !== 'no';
  });
}

function normalizeData(data) {
  return {
    events: activeRows(data.events ?? data.Events ?? []),
    gallerySections: activeRows(data.gallerySections ?? data.GallerySections ?? data.gallery ?? []),
    sevas: activeRows(data.sevas ?? data.Sevas ?? [], 'active'),
  };
}

async function fetchCsvRows(url) {
  if (!url) return [];
  const response = await fetch(`${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`, { cache: 'no-store' });
  return parseCsv(await response.text());
}

async function fetchLiveContent() {
  const config = window.SCM_CONTENT_CONFIG ?? {};

  if (config.APPS_SCRIPT_URL) {
    const url = `${config.APPS_SCRIPT_URL}?action=read&t=${Date.now()}`;
    const response = await fetch(url, { cache: 'no-store' });
    const json = await response.json();
    return normalizeData(json);
  }

  const [events, gallerySections, sevas] = await Promise.all([
    fetchCsvRows(config.EVENTS_CSV_URL),
    fetchCsvRows(config.GALLERY_SECTIONS_CSV_URL),
    fetchCsvRows(config.SEVAS_CSV_URL),
  ]);

  return normalizeData({ events, gallerySections, sevas });
}

function hasLiveRows(kind, data) {
  if (kind === 'events') return data.events.length > 0;
  if (kind === 'gallery') return data.gallerySections.length > 0;
  if (kind === 'sevas') return data.sevas.length > 0;
  return false;
}

function EventsPage({ events }) {
  return (
    <main>
      <div className="page-hero">
        <p className="breadcrumb"><a href={withBasePath('/')}>Home</a> · Events</p>
        <h1>Events & Festivals</h1>
        <p>Upcoming pujas, utsavas, invitations, and temple gatherings.</p>
      </div>
      <section className="section">
        <div className="container">
          <p className="section-label center">Live From Google Sheet</p>
          <h2 className="center">Upcoming Events</h2>
          <div className="cards-grid">
            {events.map((event) => {
              const image = event.invitation_image || driveImageUrl(event.invitation_url);
              return (
                <article className="event-card fade-in" key={event.id || `${event.title}-${event.date}`}>
                  {image ? <img className="event-invitation" src={image} alt={`${event.title} invitation`} /> : null}
                  <div className="event-date"><span>{event.date}</span></div>
                  <div className="event-info">
                    <h4>{event.title}</h4>
                    <p>{event.summary || event.description}</p>
                    {event.location ? <p className="event-location">{event.location}</p> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function GalleryPage({ sections }) {
  return (
    <main>
      <div className="page-hero">
        <p className="breadcrumb"><a href={withBasePath('/')}>Home</a> · Gallery</p>
        <h1>Temple Gallery</h1>
        <p>Drive-linked albums from temple events, pujas, and devotee seva.</p>
      </div>
      <section className="section">
        <div className="container">
          <p className="section-label center">Live From Google Drive</p>
          <h2 className="center">Event Albums</h2>
          <div className="gallery-grid">
            {sections.map((section) => {
              const photos = Array.isArray(section.photos)
                ? section.photos
                : splitList(section.photo_urls || section.photos);
              const cover = section.cover_image || photos[0]?.url || photos[0] || '';
              return (
                <article className="gallery-card fade-in" key={section.id || section.section_name || section.name}>
                  <div className="gallery-thumb">
                    {cover ? (
                      <img src={driveImageUrl(cover)} alt={section.section_name || section.name} />
                    ) : (
                      <div className="gallery-placeholder" aria-hidden="true"><span>Om</span></div>
                    )}
                    <span className="gallery-label">{section.event_title || 'Gallery'}</span>
                  </div>
                  <div className="gallery-body">
                    <h3>{section.section_name || section.name}</h3>
                    <p>{section.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function SevasPage({ sevas }) {
  return (
    <main>
      <div className="page-hero">
        <p className="breadcrumb"><a href={withBasePath('/')}>Home</a> · Sevas</p>
        <h1>Seva & Rituals</h1>
        <p>Sacred sevas and pricing maintained from the temple Google Sheet.</p>
      </div>
      <section className="section">
        <div className="container">
          <p className="section-label center">Live From Google Sheet</p>
          <h2 className="center">Sevas for Devotees</h2>
          <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
            {sevas.map((seva) => (
              <article className="service-card fade-in" key={seva.id || seva.name}>
                <div className="service-header">
                  <div className="service-icon">Om</div>
                  <h3>{seva.name}</h3>
                </div>
                <div className="service-body">
                  <p>{seva.description}</p>
                  {seva.price ? (
                    <div className="price-tag">Starting from <span>{seva.price}</span></div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function LiveContentPage({ kind, fallbackHtml = '', children }) {
  const [liveData, setLiveData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchLiveContent()
      .then((data) => {
        if (!cancelled && hasLiveRows(kind, data)) setLiveData(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [kind]);

  if (liveData && kind === 'events') return <EventsPage events={liveData.events} />;
  if (liveData && kind === 'gallery') return <GalleryPage sections={liveData.gallerySections} />;
  if (liveData && kind === 'sevas') return <SevasPage sevas={liveData.sevas} />;

  if (children) return children;
  return <main dangerouslySetInnerHTML={{ __html: normalizeHtml(fallbackHtml) }} />;
}
