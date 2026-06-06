import { siteName, withBasePath } from '@/lib/site';

export const metadata = {
  title: `Facilities - ${siteName}`,
};

const facilities = [
  {
    title: 'VIDYARANYA PRARTHANA MANDIRA',
    text: 'The temple is accompanied by an adequate Prarthana Mandira called Vidyaranya Prarthana Mandira to accommodate about 100 people for Dhyana, Sankeerthana, Bhajan, and similar devotional activities.',
  },
  {
    title: 'SHREEVIDYA CHIDYAGNA SHALA',
    text: 'It is believed that the chaithanya in the deity can be established by doing Yagna; and hence, a unique yaga shala called Shreevidya Yagna Shala is also constructed and yagnic activities are carried here by the devotees.',
  },
  {
    title: 'ANNAPOORNAMBA PRASADA BHOJANA SHALA',
    text: 'This is constructed to provide prasadam to devotees to an extent of 50 members at a time.',
  },
  {
    title: 'SHREE BHARATI GOSHAALA',
    text: 'A sacred facility dedicated to goshala seva and the traditional care of cows within the spiritual ecosystem of the temple.',
  },
];

const futurePlans = [
  'To establish a library consisting of books related to Veda, Dharmasastra, Tantra, Shreevidya, Puranas, Astrology, Vasthu Shastra, and allied subjects.',
  'To establish a Vaidika Vasthu Sangrahala to collect and exhibit yagnic and ritualistic articles to preserve our Indian heritage.',
  'To construct Sachidananda Valukeshwara Bharathi Guru Nivasa, a residence for Swamijis, scholars, and Srividyopasakas.',
  'To establish a Veda and Agama Pathashala.',
  'To conduct seminars and lectures on Shreevidya and philosophy.',
  'To impart Shreevidya initiation, education, and training.',
];

export default function FacilitiesPage() {
  return (
    <main>
      <div className="page-hero">
        <p className="breadcrumb"><a href={withBasePath('/')}>Home</a> · Facilities</p>
        <h1>Temple Facilities</h1>
        <p>Spaces created for prayer, yagna, prasada, learning, seva, and future Shreevidya activities.</p>
      </div>

      <section className="section">
        <div className="container">
          <p className="section-label center">Temple Infrastructure</p>
          <h2 className="center">Sacred Facilities</h2>
          <div className="cards-grid">
            {facilities.map((facility) => (
              <article className="feature-card fade-in" key={facility.title}>
                <h3>{facility.title}</h3>
                <p>{facility.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <p className="section-label center">Future Plans</p>
          <h2 className="center">Planned Spiritual & Cultural Initiatives</h2>
          <div className="facility-plan-list">
            {futurePlans.map((plan) => (
              <div className="facility-plan-item" key={plan}>
                <span aria-hidden="true">ॐ</span>
                <p>{plan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
