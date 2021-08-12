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

colorArea.addEventListener('input', event => {

    const areaEl: ColorArea = event.target as ColorArea;

    console.log("message from index.ts");
    console.log(areaEl.value);

    import("./js/lazy/lazy-utils")
        .then(({ LazyUtils }) => {
            LazyUtils.logAreaProp(areaEl, 'color');
            LazyUtils.logAreaProp(areaEl, 'hue');
            LazyUtils.logAreaProp(areaEl, 'x');
        })
        .catch(console.error);

});
