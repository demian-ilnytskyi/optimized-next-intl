import type { LocalePrefixMode, Locales, RoutingConfig } from '../types/types';
export declare function setIntlConfig<const AppLocales extends Locales, const AppLocalePrefixMode extends LocalePrefixMode = 'as-needed'>(config: RoutingConfig<AppLocales, AppLocalePrefixMode>): RoutingConfig<AppLocales, AppLocalePrefixMode>;
declare const config: RoutingConfig<Locales, LocalePrefixMode>;
export default config;
