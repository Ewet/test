import { API_MENU } from 'const/apiKey';
import { getItem, setItem } from 'utils/cache';

export const setMenu = val => setItem(API_MENU, val, 0);

export const getMenu = () => getItem(API_MENU);
