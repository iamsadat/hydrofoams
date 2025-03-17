import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GridTileImage } from 'components/grid/tile';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={product.featuredImage?.url || '/images/placeholder.jpg'}
            alt={product.title}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-[#0A4A3C]">{product.title}</h1>
          <div className="border-b border-[#0A4A3C]/10 pb-6">
            <p className="text-lg text-[#0A4A3C]/80">{product.description}</p>
          </div>
          <div className="flex items-center justify-between py-4">
            <span className="text-3xl font-bold text-[#0A4A3C]">
              ${product.priceRange?.minVariantPrice?.amount || '0.00'}
            </span>
            <button className="bg-[#0A4A3C] text-white px-8 py-3 rounded-md hover:bg-[#0A4A3C]/90 transition-colors duration-200 hover:shadow-lg">
              Add to Cart
            </button>
          </div>
          {product.tags && product.tags.length > 0 && (
            <div className="pt-6">
              <h3 className="text-sm font-medium text-[#0A4A3C] mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-sm bg-[#0A4A3C]/5 text-[#0A4A3C] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
