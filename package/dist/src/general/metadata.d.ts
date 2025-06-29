export declare function alternatesLinks({ locale, url, canonical, linkPart }: {
    url: string;
    locale: string;
    linkPart?: string;
    canonical?: string;
}): {
    canonical?: string;
    languages: Record<string, string>;
} | undefined;
export declare function languages(url: string, linkPart?: string): Record<string, string>;
