import type { Metadata } from "next";
import NavigationBar from "@/shared/components/nav_bar/nav_bar";
import { cn } from "@/lib/utils";
import metadataHelper from "@/shared/helpers/metadata_helper";
import DeletectThemeScript from "@/shared/components/theme_switcher/deletect_theme_script";
import { cookies } from "next/headers";
import KTextConstants from "@/shared/constants/variables/text_constants";
import CookieKey, { getCookieBooleanValue } from "@/shared/constants/variables/cookie_key";
import { getTranslations } from "optimized-next-intl/src/server/functions/server";
import { localeCookieName } from "optimized-next-intl/src/config/middleware";
import LocationzationProvider from "optimized-next-intl/src/server/components/server_provider";


export async function generateMetadata({ params }: {
  params: Promise<{ locale: Language }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Metadata.Main', locale);

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
  const cookie = await cookies();
  const isDarkMode = cookie.get(CookieKey.isDarkCookieKey)?.value;
  const isDark = getCookieBooleanValue(isDarkMode);
  const locale = (cookie.get(localeCookieName)?.value as Language) ?? KTextConstants.defaultLocale;
  const htmlClass = (isDark === true && { className: 'dark' });

  // const nonce = (await headers()).get('x-nonce') ?? undefined;
  return <html suppressHydrationWarning={!KTextConstants.isDev || !isDarkMode} lang={locale} {...htmlClass} >
    <head>
      <meta httpEquiv="Content-Language" content={locale} />
      {!isDarkMode && <DeletectThemeScript />}
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
