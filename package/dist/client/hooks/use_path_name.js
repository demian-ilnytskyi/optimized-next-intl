"use client";
import { usePathname as nextUsePathname } from "next/navigation";
import { useLocale } from "./client_hooks";
export default function usePathname() {
    const pathname = nextUsePathname();
    const locale = useLocale();
    const path = pathname.replace(`/${locale}`, '');
    if (path) {
        return path;
    }
    else {
        return '/';
    }
}
