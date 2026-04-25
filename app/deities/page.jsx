import RawPage from '@/components/RawPage';
import { pageContent } from '@/lib/pageContent';

export const metadata = {
  title: pageContent.deities.title,
};

export default function Page() {
  return <RawPage html={pageContent.deities.html} />;
}
