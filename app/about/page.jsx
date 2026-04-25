import RawPage from '@/components/RawPage';
import { pageContent } from '@/lib/pageContent';

export const metadata = {
  title: pageContent.about.title,
};

const shreevidyaSection = `
<section class="section" style="background:var(--bg-section);">
  <div class="container fade-in">
    <p class="section-label">Shreevidya Upasana</p>
    <h2>A Sacred Centre of Shreechakra Mahameru Worship</h2>
    <p style="color:var(--text-muted);margin-bottom:1rem;">A form of precious upasana with an affiliation to Vedic authenticity and a strong Agamic base is Shreevidya. It is a perfect combination of deity, mantra, tantra, and Shreechakra is a unique yantra which has its presiding deity as Shree Lalitha Mahatripurasundari and the corresponding mantra is Panchadasi.</p>
    <p style="color:var(--text-muted);margin-bottom:1rem;">As Shreevidya is a rahasya jnana as pronounced in Tantric texts, it is practiced by a limited number of upasakas. The expectations and systems of upasana are quite complicated, and it is believed that only a sadhaka with accumulated punya can enter into this upasana. Under these constraints, there are very few centres, such as temples and mandiras, for this upasana in India.</p>
    <p style="color:var(--text-muted);margin-bottom:1rem;">In light of the above, with the divine grace and prerana of the Mother Goddess, a centre for Shreevidya Upasana was created with the help of devotees by SHREEVIDYA UPASANA MAHAPEETAMA TRUST(R), Bangalore, founded by Dr. S.R. Narasimha Murthy (Nrisimhanandanatha), a senior Shreevidya upasaka under the lineage of Srimajjagadguru Shankaracharya Shree Shree Sachidananda Valukeshwara Bharathi Mahaswamiji, Kudli Sringeri Maha Samsthanam, Kudli, Shimoga.</p>
    <p style="color:var(--text-muted);margin-bottom:1rem;">The temple is patronised by Dr. M.S. Prakash, a senior educationist; Sri M.S. Satheesh, businessman; Sri U.V. Srinivasa Murthy, a retired senior official; and many other devotees.</p>
    <p style="color:var(--text-muted);">This beautiful temple of Shreechakra Mahameru and Sri Lalitha Mahatripurasundari is a unique temple built in a very calm and serene atmosphere. This is the only temple with a combination of Shreechakra Mahameru, Sri Lalitha Matha, and Mahameru Gopuram in Karnataka, and one among such few temples of the world. Srimatha is fulfilling all the requests of devotees here.</p>
  </div>
</section>
`;

export default function Page() {
  const html = pageContent.about.html.replace('<!-- MISSION -->', `${shreevidyaSection}\n\n<!-- MISSION -->`);

  return <RawPage html={html} />;
}
