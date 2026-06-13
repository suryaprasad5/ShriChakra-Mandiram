import Image from 'next/image';
import { siteName, withBasePath } from '@/lib/site';

export const metadata = {
  title: `Deities - ${siteName}`,
};

const pantheon = [
  {
    name: 'SHREESHAKTI GANAPATI',
    file: '/images/deities/shreeshakti-ganapati.jpeg',
    desc: 'The Shakti form of Ganapati, worshipped as the remover of obstacles. Every ritual at the temple begins with Ganapati puja.',
  },
  {
    name: 'SHREESHARADA & SHREESHANKARACHARYA',
    file: '/images/deities/shreesharada-shreeshankaracharya.jpeg',
    desc: 'Goddess Sharada (Saraswati) enshrined alongside Adi Shankaracharya, whose Sringeri lineage this temple follows.',
  },
  {
    name: 'SHAALAGRAAMA SHREELAKSHMINARASIMHA',
    file: '/images/deities/shaalagraama-shreelakshminarasimha.jpeg',
    desc: 'The protective form of Vishnu as Narasimha, worshipped through the sacred Shaalagraama stone.',
  },
  {
    name: 'SHREEPATTABHIRAMA',
    file: '/images/deities/shreepattabhirama.jpeg',
    desc: 'Sri Rama in his coronation form — the ideal king and embodiment of Dharma, worshipped with Sundarakanda parayana.',
  },
  {
    name: 'SHREEDATTATREYA & SHREEPASHUPATINATHA',
    file: '/images/deities/shreedattatreya-shreepashupatinatha.jpeg',
    desc: 'Dattatreya — the combined form of Brahma, Vishnu and Shiva — alongside Pashupatinatha, the Lord of all creatures.',
  },
];

const placeholders = [
  'SHREEDAKSHINAMURTHY',
  'SHREEHAYAGREEVA',
  'SHREESATYANARAYANA',
  'SHREESUBRAHMANYA',
];

function DeityPhoto({ name, file, desc }) {
  return (
    <article className="deity-card fade-in">
      <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
        <Image
          src={file}
          alt={name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          sizes="(max-width: 600px) 100vw, 300px"
        />
      </div>
      <div className="deity-body">
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
    </article>
  );
}

function DeityPlaceholder({ name }) {
  return (
    <article className="deity-card fade-in">
      <div className="card-thumb deity-placeholder">
        <span>Photo Coming Soon</span>
      </div>
      <div className="deity-body">
        <h3>{name}</h3>
        <p>Photo will be updated soon.</p>
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
        <p>The sacred deities worshipped at {siteName}, centred on Shreechakra Mahameru and Sri Lalitha Mahatripurasundari.</p>
      </div>

      {/* ── PRESIDING DEITY ── */}
      <section className="section">
        <div className="container">
          <p className="section-label">Presiding Deity</p>
          <div className="deity-feature-layout fade-in">

            {/* Two photos side by side */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ position: 'relative', height: '300px', border: '1px solid rgba(201,146,42,0.3)' }}>
                  <Image
                    src="/images/deities/shreechakra-mahameru.jpeg"
                    alt="Shreechakra Mahameru"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    sizes="220px"
                  />
                </div>
                <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginTop: '0.5rem' }}>Shreechakra Mahameru</p>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ position: 'relative', height: '300px', border: '1px solid rgba(201,146,42,0.3)' }}>
                  <Image
                    src="/images/deities/shreelalitha.jpeg"
                    alt="Sri Lalitha Mahatripurasundari"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    sizes="220px"
                  />
                </div>
                <p style={{ fontFamily: 'var(--font-sub)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginTop: '0.5rem' }}>Sri Lalitha Mahatripurasundari</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2>SHREECHAKRA MAHAMERU<br />SHREEMAHATRIPURASUNDARI</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                The presiding deity of the temple is Sri Lalitha Mahatripurasundari, worshipped through the sacred Shreechakra Mahameru — the three-dimensional form of the living yantra.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                This unique form unites Deity, Mantra, Tantra, and Yantra in the Shreevidya tradition. The Mahameru installed here makes this temple one of the very few in the world featuring this exceptional spiritual architecture.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                Her principal mantra is the <em>Panchadasi</em> — a fifteen-syllable mantra of extraordinary power — transmitted only through a qualified guru in the Shreevidya lineage.
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Also Known As</span>
                  <span style={{ color: 'var(--text-muted)' }}>Lalitha, Bala, Kamakshi, Rajeshwari</span>
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Yantra</span>
                  <span style={{ color: 'var(--text-muted)' }}>Shreechakra Mahameru (3D)</span>
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Mantra</span>
                  <span style={{ color: 'var(--text-muted)' }}>Panchadasi · Shodashi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PANTHEON ── */}
      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <p className="section-label center">The Temple Pantheon</p>
          <h2 className="center">Deities Present in the Temple</h2>
          <div className="cards-grid">
            {pantheon.map((deity) => (
              <DeityPhoto key={deity.name} {...deity} />
            ))}
            {placeholders.map((name) => (
              <DeityPlaceholder key={name} name={name} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
