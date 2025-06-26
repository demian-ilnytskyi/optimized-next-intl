// eslint-disable-next-line @typescript-eslint/no-explicit-any
let intlConfig;
try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    intlConfig = require('../../../../src/l18n/intl_config');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
}
catch (error) {
    throw Error('Please set config file it should be in folder: src/l18n/intl_config.(ts|tsx|js|jsx)');
}
export function setIntlConfig(config) {
    return config;
}
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
