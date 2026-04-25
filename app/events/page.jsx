import RawPage from '@/components/RawPage';
import { pageContent } from '@/lib/pageContent';

export const metadata = {
  title: pageContent.events.title,
};

export default function Page() {
  return <RawPage html={pageContent.events.html} />;
}
