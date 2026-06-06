import { basePath } from '@/lib/site';

const routeMap = {
  'index.html': '/',
  'about.html': '/about',
  'deities.html': '/deities',
  'services.html': '/sevas',
  'events.html': '/events',
  'facilities.html': '/facilities',
  'contact.html': '/contact',
};

function normalizeHtml(html) {
  let output = html
    .replaceAll('ShriChakra<br><span>Mandiram</span>', 'Shreevidya<br><span>Shreechakra Mahameru Mandiram</span>')
    .replaceAll('View Services', 'View Sevas')
    .replaceAll('ShriChakra', 'Shreechakra')
    .replaceAll('Shrichakra', 'Shreechakra')
    .replaceAll('shrichakramandiram.org', 'shreechakramandiram.org')
    .replaceAll('rgba(139,26,26', 'rgba(184,62,72');

  for (const [legacy, route] of Object.entries(routeMap)) {
    output = output.replaceAll(`href="${legacy}"`, `href="${basePath}${route}"`);
  }
  output = output.replaceAll('src="shrichakra.png"', `src="${basePath}/shrichakra.png"`);
  return output;
}

export default function RawPage({ html }) {
  return <main dangerouslySetInnerHTML={{ __html: normalizeHtml(html) }} />;
}
