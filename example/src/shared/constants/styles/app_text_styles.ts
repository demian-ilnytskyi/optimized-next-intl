export default abstract class AppTextStyle {
    static readonly bodyLarge: string = 'text-base font-normal leading-relaxed tracking-wide'; // 16px = 1rem

    static readonly h1: string = 'text-6xl font-medium leading-none tracking-tight'; // 64px = 4rem
    static readonly h1Mob: string = 'text-4xl font-medium leading-tight'; // 36px = 2.25rem
    static readonly h1Tablet: string = 'text-5xl font-medium leading-snug tracking-tight'; // 48px = 3rem
    static readonly h1TabletBold: string = 'text-5xl font-bold leading-snug tracking-tight'; // 48px = 3rem
}