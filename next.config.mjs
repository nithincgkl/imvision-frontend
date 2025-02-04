import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
  },
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);