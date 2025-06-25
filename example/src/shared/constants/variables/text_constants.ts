export default abstract class KTextConstants {
    static readonly isDevENV = process.env.NEXT_PUBLIC_FLAVOUR === "development";
    static readonly isDev = process.env.NODE_ENV === "development";
    static readonly currentDate = new Date();
    static readonly defaultLocale: Language = "en";
    static readonly locales: Language[] = ["uk", "en"];
    static readonly baseUrl = "http://localhost:3000"
}