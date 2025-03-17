'use server';

import { getMenu as getMenuOriginal } from './index';
import { Menu } from './types';

export async function getMenuAction(): Promise<Menu[]> {
  return getMenuOriginal('next-js-frontend-header-menu');
} 