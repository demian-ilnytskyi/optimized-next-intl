
import intlConfig from '@intl-config';
import type { LocalePrefixMode, Locales, RoutingConfig } from '../types/types';

function getConfig(): RoutingConfig<Locales, LocalePrefixMode> {
    const value = intlConfig;

    if (value) {
        return intlConfig as RoutingConfig<Locales, LocalePrefixMode>;
    } else {
        throw Error('Please set config file and set path to it in next.config as in the example');
    }
}

const config = getConfig();

export default config;