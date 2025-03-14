// app/[client]/page.tsx
'use client';

import { getClientCollection, getCollectionProducts } from 'lib/shopify';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default async function ClientPage({
    params,
  }: {
    params: { client: string };
  }) {
  const [collection, setCollection] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCollection = async () => {
      const data = await getClientCollection(params.client);
      if (!data) return notFound();
      setCollection(data);
      setFilteredProducts(data.products);
    };
    fetchCollection();
  }, [params.client]);

  useEffect(() => {
    if (!collection) return;

    const filtered = collection.products.filter((product: any) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => product.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedTags, collection]);

  if (!collection) return <div>Loading...</div>;
  const products = await getCollectionProducts({
    collection: params.client,
  });

  if (!products.length) notFound();

  const uniqueTags: string[] = Array.from(new Set(collection.products.flatMap((p: any) => p.tags)));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">{collection.title} Collection</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-3 border rounded-lg mb-6"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {uniqueTags.map((tag: string) => (
          <button
            key={tag}
            onClick={() => setSelectedTags(prev => 
              prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
            )}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags.includes(tag)
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <img
              src={product.featuredImage?.url || '/placeholder.jpg'}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="font-bold text-lg mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">
                ${product.priceRange?.minVariantPrice?.amount || '0.00'}
              </span>
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found matching your criteria
        </div>
      )}
    </div>
  );
}