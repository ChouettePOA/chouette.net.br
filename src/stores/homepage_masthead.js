import { readable } from 'svelte/store';
import * as data from '../content/block/homepage_masthead.json'
export const homepage_masthead = readable(data);
