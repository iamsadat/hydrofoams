'use client';

import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenuAction } from 'lib/shopify/actions';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

function formatSubdomain(hostname: string) {
  const subdomain = hostname.split('.')[0] || '';
  if (subdomain === 'x' || subdomain === 'www' || subdomain === '') {
    return '';
  }
  return subdomain
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Navbar() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [hostname, setHostname] = useState('');
  const formattedSubdomain = formatSubdomain(hostname);
  const displayName = formattedSubdomain ? `${formattedSubdomain}` : SITE_NAME;

  useEffect(() => {
    const fetchMenu = async () => {
      const menuData = await getMenuAction();
      setMenu(menuData);
    };
    
    setHostname(window.location.hostname);
    fetchMenu();
  }, []);

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-[#0A4A3C] text-white">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {displayName}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-white/80 hover:text-[#C5B358] transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
