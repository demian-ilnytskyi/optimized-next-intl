import type { Metadata } from "next";
import NavigationBar from "@/shared/components/nav_bar/nav_bar";
import { cn } from "@/lib/utils";
import metadataHelper from "@/shared/helpers/metadata_helper";
import { getTranslations, IntlHelperScript } from "optimized-next-intl";
import { IntlProvider } from "optimized-next-intl";
import { getLayoutStates } from "optimized-next-intl";


export async function generateMetadata({ params }: {
  params: Promise<{ locale: Language }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Metadata.Main', locale.includes('.') ? undefined : locale);

  return {
    ...metadataHelper({
      isMain: true,
      t: t,
      linkPart: '',
      locale: locale,
    }),
    category: t('category'),
    manifest: `/${locale}/manifest.json`,
    other: {
      "Content-Language": locale,
    },
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<Component> {
  const { locale, isDark, htmlParam } = await getLayoutStates();

  return <html  {...htmlParam} >
    <head>
      <meta httpEquiv="Content-Language" content={locale} />
      <IntlHelperScript isDark={isDark} />
    </head>
    <body
      className={cn(`bg-white dark:bg-gray-900`)}>
      <IntlProvider language={locale} >
        <div className="flex flex-col min-h-screen mx-4 lg:mx-24 tablet:mx-8 self-center ease-out">
          <NavigationBar isDark={isDark ?? undefined} />
          {children}
        </div>
      </IntlProvider>
    </body>
  </html >;
}
