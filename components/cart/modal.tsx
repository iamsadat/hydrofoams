'use client';

import { Dialog } from '@headlessui/react';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createCartAndSetCookie, redirectToCheckout } from './actions';
import { useCart } from './cart-context';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (cart?.totalQuantity && cart?.totalQuantity !== quantityRef.current && cart?.totalQuantity > 0) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <Dialog open={isOpen} onClose={closeCart}>
      <div className="fixed inset-0 flex justify-end">
        <Dialog.Panel className="fixed right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white px-4 py-6 shadow-xl sm:px-6">
          <div className="flex items-center justify-between border-b border-[#0A4A3C]/10 pb-4">
            <Dialog.Title className="text-lg font-medium text-[#0A4A3C]">Shopping Cart</Dialog.Title>
            <button type="button" className="text-[#0A4A3C]/60 hover:text-[#0A4A3C]" onClick={closeCart}>
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {!cart || cart.lines.length === 0 ? (
            <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
              <ShoppingCartIcon className="h-16 text-[#0A4A3C]" />
              <p className="mt-6 text-center text-2xl font-bold text-[#0A4A3C]">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between overflow-hidden p-1">
              <ul className="flex-grow overflow-auto py-4">
                {cart.lines.map((item, i) => {
                  const merchandiseSearchParams = {} as MerchandiseSearchParams;

                  item.merchandise.selectedOptions.forEach(({ name, value }) => {
                    if (value !== DEFAULT_OPTION) {
                      merchandiseSearchParams[name.toLowerCase()] = value;
                    }
                  });

                  const merchandiseUrl = createUrl(
                    `/product/${item.merchandise.product.handle}`,
                    new URLSearchParams(merchandiseSearchParams)
                  );

                  return (
                    <li key={i} className="flex py-6">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-[#0A4A3C]/10">
                        <Image
                          src={item.merchandise.product.featuredImage.url}
                          alt={item.merchandise.product.featuredImage.altText || ''}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-[#0A4A3C]">
                            <h3>
                              <Link href={merchandiseUrl} onClick={closeCart}>
                                {item.merchandise.product.title}
                              </Link>
                            </h3>
                            <Price
                              amount={item.cost.totalAmount.amount}
                              currencyCode={item.cost.totalAmount.currencyCode}
                            />
                          </div>
                          {item.merchandise.title !== DEFAULT_OPTION ? (
                            <p className="mt-1 text-sm text-[#0A4A3C]/70">{item.merchandise.title}</p>
                          ) : null}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <p className="text-[#0A4A3C]/70">Qty</p>
                            <div className="flex items-center gap-2">
                              <EditItemQuantityButton item={item} type="minus" />
                              <p>{item.quantity}</p>
                              <EditItemQuantityButton item={item} type="plus" />
                            </div>
                          </div>
                          <DeleteItemButton item={item} />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-[#0A4A3C]/10 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-[#0A4A3C]">
                  <p>Subtotal</p>
                  <Price
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </div>
                <p className="mt-0.5 text-sm text-[#0A4A3C]/70">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button
                    onClick={redirectToCheckout}
                    className="w-full rounded-md border border-transparent bg-[#0A4A3C] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#0A4A3C]/90"
                  >
                    Checkout
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-[#0A4A3C]/70">
                  <p>
                    or{' '}
                    <button type="button" className="font-medium text-[#0A4A3C] hover:text-[#C5B358]" onClick={closeCart}>
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 