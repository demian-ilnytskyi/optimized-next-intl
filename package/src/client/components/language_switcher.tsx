"use client";

import LinkComponent, { type LinkProps } from 'next/link';
import {
    forwardRef,
    type ComponentProps,
    type Ref,
} from 'react';
import { useRouter } from "next/navigation";
import config from '../../config/intl_config';
import { setLocale } from '../../server/functions/server';
import usePathname from '../hooks/usePathName';
import changeLanguage from '../../server/functions/change_language';



type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> &
    Omit<LinkProps, 'locale' | 'href' | 'prefetch'>;

type Props = NextLinkProps & {
    nextLocale: string;
};

function LanguageSwitcherComponent(
    { nextLocale, ...rest }: Props,
    ref: Ref<HTMLAnchorElement>
) {
    const router = useRouter();
    const pathname = usePathname();

    const localePrefix = nextLocale === config.defaultLocale ? '' : `/${nextLocale}`;

    const href = `${localePrefix}${pathname}`;

    async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        await changeLanguage(nextLocale);
        setLocale(nextLocale);
        router.push(href);
    };

    return <LinkComponent
        ref={ref}
        hrefLang={nextLocale}
        {...rest}
        href={href}
        onClick={(e) => handleClick(e)}
    />;
}

const LanguageSwitcher = forwardRef(LanguageSwitcherComponent);

export default LanguageSwitcher;
