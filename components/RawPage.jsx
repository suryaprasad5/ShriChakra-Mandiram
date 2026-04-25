import { basePath } from '@/lib/site';

const routeMap = {
  'index.html': '/',
  'about.html': '/about',
  'deities.html': '/deities',
  'services.html': '/services',
  'events.html': '/events',
  'contact.html': '/contact',
};

function normalizeHtml(html) {
  let output = html;
  for (const [legacy, route] of Object.entries(routeMap)) {
    output = output.replaceAll(`href="${legacy}"`, `href="${basePath}${route}"`);
  }
  output = output.replaceAll('src="shrichakra.png"', `src="${basePath}/shrichakra.png"`);
  return output;
}

export default function RawPage({ html }) {
  return <main dangerouslySetInnerHTML={{ __html: normalizeHtml(html) }} />;
}
