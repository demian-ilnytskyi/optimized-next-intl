interface HtmlParamProps {
    className?: string;
    suppressHydrationWarning?: boolean;
    lang: string;
}
export default function getCurrentTheme(): Promise<{
    isDark: boolean | null;
    locale: string;
    htmlParam?: HtmlParamProps;
}>;
export {};
