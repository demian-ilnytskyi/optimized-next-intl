import intlConfig from '@intl-config';
function getConfig() {
    const value = intlConfig;
    if (value) {
        return intlConfig;
    }
    else {
        throw Error('Please set config file and set path to it in next.config as in the example');
    }
}
const config = getConfig();
export default config;
