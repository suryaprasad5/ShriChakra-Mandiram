import { siteName, withBasePath } from '@/lib/site';

export const metadata = {
  title: `Deities - ${siteName}`,
};

const pantheon = [
  'SHREESHAKTI GANAPATI',
  'SHREESHARADA',
  'SHAALAGRAAMA SHREELAKSHMINARASIMHA',
  'SHREEPATTABHIRAMA',
  'SHREEPASHUPATINATHA',
  'SHREEDAKSHINAMURTHY',
  'SHREEDATTATREYA',
  'SHREEHAYAGREEVA',
  'SHREESATYANARAYANA',
  'SHREESUBRAHMANYA',
  'SHREESHANKARACHARYA',
];

function DeityPlaceholder({ name, featured = false }) {
  return (
    <article className={featured ? 'deity-card deity-card-large fade-in' : 'deity-card fade-in'}>
      <div className="card-thumb deity-placeholder">
        <span>Photo Placeholder</span>
      </div>
      <div className="deity-body">
        <h3>{name}</h3>
        <p>Photo will be added after the temple image is shared.</p>
      </div>
    </article>
  );
}

export default function DeitiesPage() {
  return (
    <main>
      <div className="page-hero">
        <p className="breadcrumb"><a href={withBasePath('/')}>Home</a> · Deities</p>
        <h1>The Divine Pantheon</h1>
        <p>The sacred deities worshipped at {siteName}, centered on Shreechakra Mahameru and Sri Lalitha Mahatripurasundari.</p>
      </div>

      <section className="section">
        <div className="container">
          <p className="section-label">Presiding Deity</p>
          <div className="deity-feature-layout">
            <DeityPlaceholder name="SHREECHAKRA MAHAMERU SHREEMAHATRIPURASUNDARI" featured />
            <div>
              <h2>SHREECHAKRA MAHAMERU SHREEMAHATRIPURASUNDARI</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                The presiding deity of the temple is worshipped through the sacred Shreechakra Mahameru, the living yantra of Sri Lalitha Mahatripurasundari.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                This unique form unites deity, mantra, tantra, and yantra in the Shreevidya tradition, inviting devotees into the grace of Srimatha.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <p className="section-label center">The Temple Pantheon</p>
          <h2 className="center">Deities Present in the Temple</h2>
          <div className="cards-grid">
            {pantheon.map((name) => (
              <DeityPlaceholder key={name} name={name} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
