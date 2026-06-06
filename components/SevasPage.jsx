import LiveContentPage from '@/components/LiveContentPage';
import { pageContent } from '@/lib/pageContent';

function normalizeSevasHtml(html) {
  return html
    .replaceAll('Sacred Services', 'Sacred Sevas')
    .replaceAll('Personal Services', 'Personal Sevas')
    .replaceAll('· Services', '· Sevas')
    .replaceAll('services performed', 'sevas performed')
    .replaceAll('services.html', 'sevas.html');
}

export default function SevasPage() {
  return <LiveContentPage kind="sevas" fallbackHtml={normalizeSevasHtml(pageContent.services.html)} />;
}
