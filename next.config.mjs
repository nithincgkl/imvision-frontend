import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'], // Add your external image domain here
  },
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
