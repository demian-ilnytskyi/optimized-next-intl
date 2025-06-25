import LinkComponent, { type LinkProps } from 'next/link';
import {
    forwardRef,
    type ComponentProps,
    type Ref,
} from 'react';
import type { UrlObject } from 'url';
import { format } from 'url';
import config from '../../config/intl_config';
import { getLocaleCache } from '../../general/cache_variables';

type Url = string | UrlObject;


type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> &
    Omit<LinkProps, 'locale'>;

type Props = NextLinkProps;

function CustomLinkFunction(
    { href, prefetch, ...rest }: Props,
    ref: Ref<HTMLAnchorElement>
) {
    const localeValue = getLocaleCache();

    const needsLangPath = localeValue !== config.defaultLocale || !localeValue;

    let pathnames: Url;

    if (needsLangPath) {
        let pathname: string;
        if (typeof href === 'object') {
            pathname = format(href);
        } else {
            pathname = href;
        }
        pathnames = `/${localeValue}${pathname}`;
    } else {
        pathnames = href;
    }

    return <LinkComponent
        ref={ref}
        href={pathnames}
        prefetch={prefetch}
        {...rest}
    />;
}

const Link = forwardRef(CustomLinkFunction);

export default Link;
