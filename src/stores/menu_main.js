import { readable } from 'svelte/store';
import * as data from '../content/menu/main.json'
export const menu_main = readable(data);
