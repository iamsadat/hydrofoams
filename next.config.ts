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
  
};


/*
async rewrites() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: '(?<clientSlug>.*).x.com',
          },
        ],
        destination: '/clients/:clientSlug',
      },
      {
        source: '/product/:handle',
        has: [
          {
            type: 'host',
            value: '(?<clientSlug>.*).x.com',
          },
        ],
        destination: '/clients/:clientSlug/products/:handle',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<clientSlug>.*).x.com',
          },
        ],
        destination: '/clients/:clientSlug/:path*',
      },
    ];
  },

  */