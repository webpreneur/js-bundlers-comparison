import "../styles/styles.scss";

import '@spectrum-web-components/color-wheel/sp-color-wheel.js';
import '@spectrum-web-components/color-area/sp-color-area.js';


import { ColorArea } from '@spectrum-web-components/color-area';

(() => console.log('HELLO WORLD!'))();

const tsDemoFunc = (message: string): void => console.log('TS compilation works fine' + message);

tsDemoFunc('check');

const colorArea: ColorArea = document.querySelector('sp-color-area');

colorArea.color = {
    r: 100,
    g: 100,
    b: 100,
};

colorArea.addEventListener('input', ({ target }) => {
    console.log((target as ColorArea).color);
    console.log((target as ColorArea).value);
    console.log((target as ColorArea).hue);
    console.log((target as ColorArea).x);
    console.log((target as ColorArea).y);
});
