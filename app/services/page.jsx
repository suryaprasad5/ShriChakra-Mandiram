import RawPage from '@/components/RawPage';
import { pageContent } from '@/lib/pageContent';

export const metadata = {
  title: pageContent.services.title,
};

export default function Page() {
  return <RawPage html={pageContent.services.html} />;
}
