import RawPage from '@/components/RawPage';
import { pageContent } from '@/lib/pageContent';
import { siteName, trustAddress } from '@/lib/site';

export const metadata = {
  title: `Contact - ${siteName}`,
};

const addressHtml = trustAddress.join('<br>');

export default function Page() {
  const html = pageContent.contact.html
    .replace(
      '<span>123 Mandir Marg, Malleshwaram,<br>Bengaluru, Karnataka 560003</span>',
      `<span>${addressHtml}</span>`,
    )
    .replace('123 Mandir Marg', 'SHREEVIDYA UPASANA MAHAPEETAM TRUST (R).')
    .replace('Malleshwaram, Bengaluru', 'Turahalli, Bangalore - 560061')
    .replace('ShriChakra Mandiram Malleshwaram', 'Shreechakra Mandiram Turahalli')
    .replace('Shreechakra Mandiram Malleshwaram', 'Shreechakra Mandiram Turahalli')
    .replace(
      'Malleshwaram Station (Purple Line) – 500m walk',
      'Nearest Kanakapura Road metro station, then local auto/cab to Turahalli',
    )
    .replace(
      'BMTC Routes 201, 211, 255 – Mandir Stop',
      'BMTC services towards Turahalli/Subrahmanyapura; confirm current route before travel',
    );

  return <RawPage html={html} />;
}
