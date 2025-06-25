import KTextConstants from "@/shared/constants/variables/text_constants";
import { setIntlConfig } from "optimized-next-intl/src/config/intl_config";

declare global {
    type Language = 'uk' | 'en';
}

const intlConfig = setIntlConfig({
    locales: KTextConstants.locales,
    defaultLocale: KTextConstants.defaultLocale,
});
export default intlConfig