/* /frontend/src/stores.js      */

import { writable } from 'svelte/store';

export const walletInstalled = writable('checking');
export const walletInfo = writable({});
export const txResults = writable({});
export const userAccount = writable("");