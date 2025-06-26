// import intlConfig from '../../../../src/l18n/intl_config';
import type { LocalePrefixMode, Locales, RoutingConfig } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let intlConfig: any;

try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    intlConfig = require('../../../../src/l18n/intl_config');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    throw error;
    // throw Error('Please set config file it should be in folder: src/l18n/intl_config.(ts|tsx|js|jsx)');
}

function getConfig(): RoutingConfig<Locales, LocalePrefixMode> {
    const value = intlConfig;

    if (value) {
        return intlConfig as RoutingConfig<Locales, LocalePrefixMode>;
    } else {
        throw Error('Please set config file it should be in folder: src/l18n/intl_config.(ts|tsx|js|jsx)');
    }
}

const config = getConfig();

export default config;