import * as sapper from '@sapper/app';
import { main } from './lib/responsive-components.js';

sapper.start({
	target: document.querySelector('#sapper')
});

main();
