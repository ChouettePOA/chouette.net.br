
/**
 * Gets the pre-compiled cache file path corresponding to views props and args.
 */
export function views_get_cache_file_path(stringified_props, args_arr = []) {
	let tail = '';
	while(args_arr.length) {
		tail += "/" + args_arr.shift();
	}
	if (!tail.length) {
		tail = '/default';
	}
	return `src/cache/views/${views_hash_props(stringified_props)}${tail}.json`;
}

/**
 * Converts a string into a 53-bit hash.
 *
 * @see https://stackoverflow.com/a/52171480/2592338
 */
export function views_hash_props(str, seed = 0) {
	let h1 = 0xdeadbeef ^ seed;
	let h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
	h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
	return 4294967296 * (2097151 & h2) + (h1>>>0);
}
