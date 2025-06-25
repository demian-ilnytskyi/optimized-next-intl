import { setPageLocaleAsync } from "@/shared/constants/variables/locale_helper";
import { getTranslations } from "optimized-next-intl/src/server/functions/server";

export default async function Home({
    params
}: {
    params: Promise<{ locale: Language }>;
}): Promise<Component> {
    await setPageLocaleAsync(params);

    const t = await getTranslations('HomePage');
    const list: string[] = t('list');

    return <main className="flex-1 flex flex-col">
        <ul>
            {list.map((item) => <li key={item}>{item}</li>)}
        </ul>
    </main>
}
