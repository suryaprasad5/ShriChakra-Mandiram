const githubPages = process.env.GITHUB_PAGES !== 'false';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: githubPages ? 'export' : undefined,
  basePath: githubPages ? '/ShriChakra-Mandiram' : '',
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
