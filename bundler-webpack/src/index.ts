import "../styles/styles.scss";

(() => console.log('HELLO WORLD!'))();

const tsDemoFunc = (message: string): void => console.log('TS compilation works fine' + message);

tsDemoFunc('check');
