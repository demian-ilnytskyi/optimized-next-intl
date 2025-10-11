import { type LinkProps } from 'next/link';
import { type ComponentProps } from 'react';
type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> & Omit<LinkProps, 'locale' | 'href' | 'prefetch' | 'onNavigate' | 'hrefLang'>;
type Props = NextLinkProps & {
    locale: string;
};
declare const LocaleLink: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLAnchorElement>>;
export default LocaleLink;
