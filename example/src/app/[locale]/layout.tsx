import type { Metadata } from "next";
import NavigationBar from "@/shared/components/nav_bar/nav_bar";
import { cn } from "@/lib/utils";
import metadataHelper from "@/shared/helpers/metadata_helper";
import KTextConstants from "@/shared/constants/variables/text_constants";
import { getTranslations } from "optimized-next-intl/src/server/functions/server";
import LocationzationProvider from "optimized-next-intl/src/server/components/server_provider";
import { getCurrentTheme } from "optimized-next-intl";
import DeletectThemeScript from "optimized-next-intl/src/theme_switcher/functions/deletect_theme_script";


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
  const { locale, isDark, htmlParam } = await getCurrentTheme();

  return <html  {...htmlParam} >
    <head>
      <meta httpEquiv="Content-Language" content={locale} />
      <DeletectThemeScript isDark={isDark} />
    </head>
    <body
      className={cn(`bg-white dark:bg-gray-900`)}>
      <LocationzationProvider language={locale} >
        <div className="flex flex-col min-h-screen mx-4 lg:mx-24 tablet:mx-8 self-center">
          <NavigationBar isDark={isDark ?? undefined} />
          {children}
        </div>
      </LocationzationProvider>
    </body>
  </html >;
}
