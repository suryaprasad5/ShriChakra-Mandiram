import LiveContentPage from '@/components/LiveContentPage';
import { withBasePath } from '@/lib/site';

export const metadata = {
  title: 'Gallery - ShriChakra Mandiram',
};

const galleryItems = [
  {
    title: 'Shreechakra Mahameru',
    label: 'Sanctum',
    description: 'The sacred geometry of Shreechakra Mahameru, worshipped as the living presence of Sri Lalitha Mahatripurasundari.',
    image: '/shrichakra.png',
  },
  {
    title: 'Sri Lalitha Matha Alankara',
    label: 'Deity Darshan',
    description: 'A devotional space for future festival and daily alankara photographs of Srimatha.',
  },
  {
    title: 'Mahameru Gopuram',
    label: 'Temple Architecture',
    description: 'A calm and serene temple setting dedicated to Shreevidya upasana.',
  },
  {
    title: 'Daily Puja Seva',
    label: 'Rituals',
    description: 'Moments from daily worship, archana, abhishekam, and deepa seva.',
  },
  {
    title: 'Festival Celebrations',
    label: 'Events',
    description: 'Navaratri, deepotsava, and special utsava memories can be added here.',
  },
  {
    title: 'Devotee Seva',
    label: 'Community',
    description: 'Annadanam, volunteer work, and community offerings by devotees.',
  },
];

function GalleryFallback() {
  return (
    <main>
      <div className="page-hero">
        <p className="breadcrumb">
          <a href={withBasePath('/')}>Home</a> · Gallery
        </p>
        <h1>Temple Gallery</h1>
        <p>Glimpses of Shreechakra Mahameru, Sri Lalitha Matha, sacred rituals, festivals, and devotee seva.</p>
      </div>

      <section className="section">
        <div className="container">
          <p className="section-label center">Sacred Moments</p>
          <h2 className="center">Darshan & Devotion</h2>
          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <article className="gallery-card fade-in" key={item.title}>
                <div className="gallery-thumb">
                  {item.image ? (
                    <img src={withBasePath(item.image)} alt={item.title} />
                  ) : (
                    <div className="gallery-placeholder" aria-hidden="true">
                      <span>ॐ</span>
                    </div>
                  )}
                  <span className="gallery-label">{item.label}</span>
                </div>
                <div className="gallery-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-inner">
          <div className="quote-chakra">⬡</div>
          <blockquote>"Every darshan becomes a memory when devotion sees the divine in form, ritual, and silence."</blockquote>
          <cite>— ShriChakra Mandiram</cite>
        </div>
      </section>
    </main>
  );
}

export default function GalleryPage() {
  return (
    <LiveContentPage kind="gallery">
      <GalleryFallback />
    </LiveContentPage>
  );
}
