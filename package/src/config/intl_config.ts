import intlConfig from '../../../example/src/l18n/intl_config'// /src/l18n/intl_config';
import type { LocalePrefixMode, Locales, RoutingConfig } from '../types/types';

export function setIntlConfig<
    const AppLocales extends Locales,
    const AppLocalePrefixMode extends LocalePrefixMode = 'as-needed'>
    (config: RoutingConfig<AppLocales, AppLocalePrefixMode>): RoutingConfig<AppLocales, AppLocalePrefixMode> {
    return config;
}

function getConfig(): RoutingConfig<Locales, LocalePrefixMode> {
    const value = intlConfig;

    if (value) {
        return intlConfig as RoutingConfig<Locales, LocalePrefixMode>;
    } else {
        throw Error('Please set config file it should be in folder: src/l18n/intl_config.(ts|tsx|js|jsx)')
    }
}

const config = getConfig();

export default config;