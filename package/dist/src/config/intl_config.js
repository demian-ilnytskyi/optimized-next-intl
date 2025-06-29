import intlConfig from '@intl-config';
function getConfig() {
    const value = intlConfig;
    if (value) {
        return intlConfig;
    }
    else {
        throw Error('Please set config file it should be in folder: src/l18n/intl_config.(ts|tsx|js|jsx)');
    }
}
const config = getConfig();
export default config;
