import { ColorArea } from '@spectrum-web-components/color-area';

export class LazyUtils {
    static logAreaProp(area: ColorArea, key: "color" | "hue" | "x" | "y" ) {
        console.log("message from lazy-utils.ts");
        console.log(area[key]);
    }
}
