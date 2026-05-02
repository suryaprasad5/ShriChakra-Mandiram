import LiveContentPage from '@/components/LiveContentPage';
import { pageContent } from '@/lib/pageContent';

export const metadata = {
  title: pageContent.events.title,
};

export default function Page() {
  return <LiveContentPage kind="events" fallbackHtml={pageContent.events.html} />;
}
