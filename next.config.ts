export default {
  experimental: {
    ppr: false,
    inlineCss: true,
    useCache: true,
    reactOwnerStack: true,
    newDevOverlay: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ],
    domains: ['cdn.shopify.com']
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<clientSlug>.*).x.com',
          },
        ],
        destination: '/:clientSlug/:path*',
      },
    ];
  },
};
