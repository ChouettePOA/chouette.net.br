import { readable } from 'svelte/store';
import * as data from '../content/site/information.json'
export const site_information = readable(data);
