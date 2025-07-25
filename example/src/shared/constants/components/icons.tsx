import {
    Info,
    Menu,
    Moon,
    Sun,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
};

const baseClass = 'select-none cursor-default inline-block text-2xl';

const KIcons = {
    sun: (props: IconProps): Component => <Sun {...props} className={cn(baseClass, props?.className)} />,
    menu: (props: IconProps): Component => <Menu {...props} className={cn(baseClass, props?.className)} />,
    moon: (props: IconProps): Component => <Moon {...props} className={cn(baseClass, props?.className)} />,
    error: (props: IconProps): Component => <Info {...props} className={cn(baseClass, 'text-red-500', props?.className)} />,
};

export default KIcons;