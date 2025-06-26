import { type LinkProps } from 'next/link';
import { type ComponentProps } from 'react';
type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> & Omit<LinkProps, 'locale' | 'href' | 'prefetch' | 'onClick'>;
type Props = NextLinkProps & {
    nextLocale: string;
};
declare const LanguageSwitcher: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLAnchorElement>>;
export default LanguageSwitcher;
