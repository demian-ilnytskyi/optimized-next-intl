interface HtmlParamProps {
    className?: string;
    suppressHydrationWarning?: boolean;
    lang: string;
}
export default function getLayoutStates(): Promise<{
    isDark: boolean | null;
    locale: string;
    htmlParam?: HtmlParamProps;
}>;
export {};
