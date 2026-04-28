import RawPage from '@/components/RawPage';
import { pageContent } from '@/lib/pageContent';

function normalizeSevasHtml(html) {
  return html
    .replaceAll('Services – ShriChakra Mandiram', 'Sevas - ShriChakra Mandiram')
    .replaceAll('Sacred Services', 'Sacred Sevas')
    .replaceAll('Personal Services', 'Personal Sevas')
    .replaceAll('services performed', 'sevas performed')
    .replaceAll('services.html', 'sevas.html');
}

export default function SevasPage() {
  return <RawPage html={normalizeSevasHtml(pageContent.services.html)} />;
}
