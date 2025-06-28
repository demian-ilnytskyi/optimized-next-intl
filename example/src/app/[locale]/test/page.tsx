import { useTranslations } from "optimized-next-intl/use";


export default function Home(): Component {
    const t = useTranslations('HomePage');
    const list: string[] = t('list');

    return <main className="flex-1 flex flex-col mt-5">
        <ul>
            {list.map((item) => <li key={item}>{item}</li>)}
        </ul>
    </main>
}
