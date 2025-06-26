import { jsx as _jsx } from "react/jsx-runtime";
import LinkComponent from 'next/link';
import { forwardRef, } from 'react';
import { format } from 'url';
import config from '../../config/intl_config';
import { getLocaleCache } from '../../general/cache_variables';
function CustomLinkFunction({ href, prefetch, ...rest }, ref) {
    const localeValue = getLocaleCache();
    const needsLangPath = localeValue !== config.defaultLocale || !localeValue;
    let pathnames;
    if (needsLangPath) {
        let pathname;
        if (typeof href === 'object') {
            pathname = format(href);
        }
        else {
            pathname = href;
        }
        pathnames = `/${localeValue}${pathname}`;
    }
    else {
        pathnames = href;
    }
    return _jsx(LinkComponent, { ref: ref, href: pathnames, prefetch: prefetch, ...rest });
}
const Link = forwardRef(CustomLinkFunction);
export default Link;
