import { readable } from 'svelte/store';
import * as data from '../cache/page_routing_trails.json'
export const page_routing_trails = readable(data);
