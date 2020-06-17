import { readable } from 'svelte/store';
import * as data from '../content/global_data.json'
export const global_data = readable(data);
