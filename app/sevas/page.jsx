import SevasPage from '@/components/SevasPage';
import { siteName } from '@/lib/site';

export const metadata = {
  title: `Sevas - ${siteName}`,
};

export default function Page() {
  return <SevasPage />;
}
