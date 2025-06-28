"use client";

import LinkComponent, { type LinkProps } from 'next/link';
import {
    forwardRef,
    useState,
    type ComponentProps,
    type Ref,
} from 'react';
import { useRouter } from "next/navigation";
import config from '../../config/intl_config';
import usePathname from '../hooks/usePathName';
import changeLanguage from '../../server/functions/change_language';



type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> &
    Omit<LinkProps, 'locale' | 'href' | 'prefetch' | 'onClick' | 'hrefLang'>;

type Props = NextLinkProps & {
    locale: string;
    onLoadingChange?: (isLoading: boolean) => void;
    onFailed?: () => void;
};

function LocaleLinkComponent(
    {
        locale,
        scroll,
        onLoadingChange,
        onFailed,
        className,
        ...rest
    }: Props,
    ref: Ref<HTMLAnchorElement>
) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const localePrefix = locale === config.defaultLocale ? '' : `/${locale}`;

    const href = `${localePrefix}${pathname === '/' && localePrefix ? '' : pathname}`;

    async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            if (onLoadingChange) onLoadingChange(true);
            const state = await changeLanguage(locale);
            if (state) {
                router.push(href, { scroll: scroll });
            } else {
                if (onFailed) onFailed();
            }
            if (onLoadingChange) onLoadingChange(false);
            setIsLoading(false);
        }
    };

    return <LinkComponent
        ref={ref}
        hrefLang={locale}
        scroll={scroll}
        className={isLoading ? 'cursor-not-allowed ' : 'cursor-pointer '}
        {...rest}
        href={href}
        onClick={(e) => handleClick(e)}
    />;
}

const LocaleLink = forwardRef(LocaleLinkComponent);

export default LocaleLink;
