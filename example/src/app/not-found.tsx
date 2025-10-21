import type { Metadata } from "next";
import { getLocale } from "optimized-next-intl";
import NotFound, { generateMetadata as notFoundGenerateMetadata } from "./[locale]/not-found";
import RootLayout from "./[locale]/layout";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale() as Language;
  return notFoundGenerateMetadata({ params: Promise.resolve({ locale }) });
};

export default async function GlobalNotFound(): Promise<Component> {
  const locale = await getLocale() as Language;
  return <RootLayout params={Promise.resolve({ locale })}>
    <NotFound params={Promise.resolve({ locale })} />
  </RootLayout>
}
