import LiveContentPage from '@/components/LiveContentPage';
import { pageContent } from '@/lib/pageContent';
import { siteName } from '@/lib/site';

export const metadata = {
  title: `Events - ${siteName}`,
};

export default function Page() {
  return <LiveContentPage kind="events" fallbackHtml={pageContent.events.html} />;
}
