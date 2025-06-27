import { type LinkProps } from 'next/link';
import { type ComponentProps } from 'react';
type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> & Omit<LinkProps, 'locale' | 'href' | 'prefetch' | 'onClick' | 'hrefLang'>;
type Props = NextLinkProps & {
    locale: string;
    onLoadingChange?: (isLoading: boolean) => void;
    componentIsSWitcher?: boolean;
};
declare const LanguageSwitcher: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLAnchorElement>>;
export default LanguageSwitcher;
