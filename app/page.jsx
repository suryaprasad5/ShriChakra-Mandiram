import RawPage from '@/components/RawPage';
import { pageContent } from '@/lib/pageContent';
import { fullTempleName } from '@/lib/site';

export const metadata = {
  title: `${fullTempleName} - Sacred Temple`,
};

export default function Page() {
  return <RawPage html={pageContent.home.html} />;
}
