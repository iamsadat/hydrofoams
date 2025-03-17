'use client';

import { getClientCollection, getCollectionProducts } from 'lib/shopify';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default async function CollectionPage({
    params,
  }: {
    params: { handle: string };
  }) {
  const [collection, setCollection] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCollection = async () => {
      const data = await getClientCollection(params.handle);
      if (!data) return notFound();
      setCollection(data);
      setFilteredProducts(data.products);
    };
    fetchCollection();
  }, [params.handle]);

  // ... rest of the component remains the same 