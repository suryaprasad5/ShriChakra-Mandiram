import RawPage from '@/components/RawPage';
import { pageContent } from '@/lib/pageContent';
import { siteName, withBasePath } from '@/lib/site';

export const metadata = {
  title: `About - ${siteName}`,
};

const heroSection = `
<div class="page-hero">
  <p class="breadcrumb"><a href="/">Home</a> · About</p>
  <h1>About the Temple</h1>
  <p>A sacred centre of Shreevidya Upasana, established by divine grace and devoted service to Sri Lalitha Mahatripurasundari.</p>
</div>
`;

const shreevidyaSection = `
<section class="section" style="background:var(--bg-section);">
  <div class="container fade-in">
    <p class="section-label">Shreevidya Upasana</p>
    <h2>A Sacred Centre of Shreechakra Mahameru Worship</h2>
    <p style="color:var(--text-muted);margin-bottom:1rem;">Shreevidya is a revered and profound form of worship deeply rooted in Vedic tradition and supported by a strong Agamic foundation. It represents a complete spiritual system that harmoniously integrates Deity, Mantra, Tantra, and Yantra. At its core is the sacred Shreechakra, a unique and powerful Yantra presided over by Sri Lalitha Mahatripurasundari, with the Panchadasi Mantra serving as its principal mantra.</p>
    <p style="color:var(--text-muted);margin-bottom:1rem;">According to the Tantric scriptures, Shreevidya is considered a Rahasya Jnana (esoteric spiritual knowledge). As a result, it is traditionally practiced by a limited number of dedicated upasakas (spiritual aspirants). The disciplines, rituals, and expectations associated with this path are intricate and demanding, and it is believed that only those blessed with accumulated spiritual merit (punya) are drawn to and initiated into this sacred tradition. Consequently, there are only a few temples and centers dedicated to Shreevidya Upasana across India.</p>
    <p style="color:var(--text-muted);margin-bottom:1rem;">Inspired by the divine grace and guidance of Sri Lalitha Mahatripurasundari, and with the devoted support of numerous devotees, a dedicated center for Shreevidya Upasana was established by the SHREEVIDYA UPASANA MAHAPEETAMA TRUST (R), Bangalore.</p>
    <p style="color:var(--text-muted);margin-bottom:1rem;">The Trust was founded by Dr. S. R. Narasimha Murthy, a distinguished Shreevidya Upasaka belonging to the spiritual lineage of Kudli Sringeri Maha Samsthanam, under the blessings of Sri Jagadguru Shankaracharya Sri Sri Sachidananda Valukeshwara Bharathi Mahaswamiji.</p>
    <p style="color:var(--text-muted);margin-bottom:1rem;">The initiative has been patronized and supported by eminent personalities and devotees, including Dr. M. S. Prakash, M. S. Satheesh, U. V. Srinivasa Murthy, and many others.</p>
    <p style="color:var(--text-muted);margin-bottom:1rem;">Nestled in a serene and tranquil environment, this magnificent temple dedicated to Sri Lalitha Mahatripurasundari Temple houses the sacred Shreechakra Mahameru and Sri Lalitha Mahatripurasundari. It is unique in Karnataka for its rare combination of the Shreechakra Mahameru, Sri Lalitha Matha, and Mahameru Gopuram, making it one of the very few temples in the world featuring this exceptional spiritual architecture.</p>
    <p style="color:var(--text-muted);">Devotees visit this sacred abode seeking the blessings of Srimatha, whose divine grace continues to fulfill the heartfelt prayers and aspirations of countless devotees.</p>

    <div style="display:flex;align-items:center;gap:2rem;margin-top:2.5rem;flex-wrap:wrap;">
      <div style="background:rgba(168,50,50,0.15);border:1px solid rgba(201,146,42,0.25);padding:1.5rem 2.5rem;text-align:center;">
        <div style="font-family:var(--font-head);font-size:2.5rem;color:var(--gold);line-height:1;">2014</div>
        <div style="font-family:var(--font-sub);font-size:0.75rem;letter-spacing:0.15em;color:var(--text-muted);text-transform:uppercase;margin-top:0.3rem;">Established</div>
      </div>
      <div style="color:var(--text-muted);font-size:0.95rem;max-width:480px;">
        Temple consecrated and Shreechakra Mahameru installed under the guidance of the Sringeri Sharada Peetham lineage.
      </div>
    </div>
  </div>
</section>
`;

const priestSection = `
<section class="section">
  <div class="container">
    <p class="section-label center">Temple Priests</p>
    <h2 class="center">Our Priestly Seva</h2>
    <p style="text-align:center;color:var(--text-muted);max-width:580px;margin:0 auto 3rem;">Daily puja and rituals at the temple are performed by trained priests following the Agama and Shreevidya tradition.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;max-width:700px;margin:0 auto;">
      <div class="feature-card fade-in" style="text-align:center;">
        <div style="font-size:3rem;margin-bottom:0.8rem;">👳</div>
        <h3 style="font-family:var(--font-sub);color:var(--gold-lt);font-size:1rem;margin-bottom:0.2rem;">Shri. K. P. Ashwath Kumar</h3>
        <span style="font-family:var(--font-sub);font-size:0.75rem;letter-spacing:0.12em;color:var(--gold);text-transform:uppercase;display:block;">Head Priest</span>
      </div>
      <div class="feature-card fade-in" style="text-align:center;">
        <div style="font-size:3rem;margin-bottom:0.8rem;">👳</div>
        <h3 style="font-family:var(--font-sub);color:var(--gold-lt);font-size:1rem;margin-bottom:0.2rem;">To be updated</h3>
        <span style="font-family:var(--font-sub);font-size:0.75rem;letter-spacing:0.12em;color:var(--gold);text-transform:uppercase;display:block;">Assistant Priest</span>
      </div>
    </div>
  </div>
</section>
`;

const trusteesSection = `
<section class="section">
  <div class="container">
    <p class="section-label center">Trustees & Office Bearers</p>
    <h2 class="center">SHREEVIDYA UPASANA MAHAPEETAM TRUST (R)</h2>
    <div class="trustee-grid">
      <article class="trustee-card trustee-card-featured">
        <h3>Dr. M. S. Prakash</h3>
        <span>President</span>
      </article>
      <article class="trustee-card">
        <h3>Dr. S. R. Narasimha Murthy</h3>
        <p>(Nrisimhanandanatha)</p>
      </article>
      <article class="trustee-card trustee-card-featured">
        <h3>M. S. Satheesh</h3>
        <span>Managing Trustee</span>
      </article>
      <article class="trustee-card"><h3>U. V. Srinivasa Murthy</h3></article>
      <article class="trustee-card"><h3>B. Mallikarjuna</h3></article>
      <article class="trustee-card"><h3>G. Dinesh kumar</h3></article>
      <article class="trustee-card"><h3>K. C. Sudarshan</h3></article>
      <article class="trustee-card"><h3>Smt. Sudha Gopalakrishna</h3></article>
    </div>
  </div>
</section>
`;

export default function Page() {
  const html = `${heroSection}\n${shreevidyaSection}\n${priestSection}\n${trusteesSection}`;
  return <RawPage html={html} />;
}
