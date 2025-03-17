import clsx from 'clsx';
import { getMenu } from 'lib/shopify';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import FooterMenu from './footer-menu';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-600';
  const copyrightName = COMPANY_NAME || SITE_NAME || '';
  const menu = await getMenu('footer');

  return ( 
    <footer className="text-sm text-white bg-gradient-to-b from-[#195440] via-[#133d2e] to-[#0c261d] overflow-hidden w-full">
      

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 border-t border-neutral-600 px-4 py-12 text-sm md:flex-row md:gap-12 md:justify-between">
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Link className="flex items-center gap-2 text-white md:pt-1" href="/">
            <img src="/image.png" alt="Logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4 w-full md:w-auto  md:text-left">
          <h3 className="font-semibold text-base text-center md:text-lg">Quick Links</h3>
          <div className="flex flex-col">
           
            <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
         <Link href="https://shopify.com/authentication/92061827391/login?client_id=dde6159a-4dbf-4c2d-8553-842480b2f653&redirect_uri=https%3A%2F%2Fshopify.com%2Fauthentication%2F92061827391%2Foauth%2Fauthorize%3Fclient_id%3Ddde6159a-4dbf-4c2d-8553-842480b2f653%26consent_id%3D%26nonce%3D21bec039-b7c3-4c03-abc6-eb7d499765ab%26redirect_uri%3Dhttps%253A%252F%252Fshop.F.D.in%252Fcustomer_authentication%252Fcallback%253Fsource%253Dcore%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bcustomer-account-api%253Afull%26state%3D01JJKJRAAVHFEP6TSKJVSH4E6S" className={clsx(
          'block p-2 text-xs underline-offset-4 hover:text-[#d1f0e5] hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
        )} target="_blank" rel="noopener noreferrer">
              Login / Register
            </Link>
            <Link href="https://www.shiprocket.in/shipment-tracking/"  className={clsx(
          'block p-2 text-xs underline-offset-4 hover:text-[#d1f0e5] hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
        )} target="_blank" rel="noopener noreferrer">
              Track Your Order
            </Link>
          </div>
        </div>
        
        

        {/* Redesigned Contact Section */}
        <div className="space-y-4 w-full md:w-auto">
          <h3 className="font-bold text-base md:text-lg text-center md:text-left">Get In Touch</h3>
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto md:mx-0">
            <Link
              href="mailto:perfumevalleyworld@gmail.com"
              className="flex items-center space-x-3 p-4 rounded-lg hover:bg-[#1a4a3a] transition-all duration-300 border border-green-800 group"
            >
              <Mail className="h-5 w-5 flex-shrink-0 group-hover:text-green-400" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Email Us</span>
                <span className="text-xs opacity-75">fdkhan.com</span>
              </div>
            </Link>
            <Link
              href="tel:+9059069188"
              className="flex items-center space-x-3 p-4 rounded-lg hover:bg-[#1a4a3a]

> Pudgy Shoeb:
transition-all duration-300 border border-green-800 group"
            >
              <Phone className="h-5 w-5 flex-shrink-0 group-hover:text-green-400" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Call Us</span>
                <span className="text-xs opacity-75">+91 555555555 </span>
              </div>
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="https://maps.app.goo.gl/nhX9rk6r5C8bsrtJ8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-[#1a4a3a] transition-all duration-300 border border-green-800 group text-center"
              >
                <MapPin className="h-5 w-5 mb-2 group-hover:text-green-400" />
                <span className="text-xs font-semibold">Abids</span>
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="border-t border-neutral-600 py-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row items-center justify-between px-4 space-y-3 md:space-y-0">
          
        <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/F.D.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.facebook.com/Perfumevalley.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCJ6r5kUZzIaBT8IgBnCRTuQ"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-sm text-center md:text-left">
            Copyrights © 2025 F.D KHAN & Co. All rights reserved.
          </p>
          
          {/* Social Links */}
         

          
        </div>
      </div>
    </footer>
  );
}
