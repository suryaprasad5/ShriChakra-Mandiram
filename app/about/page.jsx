import RawPage from '@/components/RawPage';
import { pageContent } from '@/lib/pageContent';
import { siteName } from '@/lib/site';

export const metadata = {
  title: `About - ${siteName}`,
};

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
  const html = pageContent.about.html.replace('<!-- MISSION -->', `${shreevidyaSection}\n${trusteesSection}\n<!-- MISSION -->`);

  return <RawPage html={html} />;
}
