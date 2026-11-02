import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt?: string;
  className?: string;
  bounce?: boolean;
  wiggle?: boolean;
  float?: boolean;
}

export function DigiSprite({ src, alt = 'Digi', className, bounce, wiggle, float }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={cn(
        'select-none object-contain drop-shadow-[0_10px_18px_rgba(76,58,140,0.22)]',
        bounce && 'motion-safe:animate-digi-bounce',
        wiggle && 'motion-safe:animate-digi-wiggle',
        float && 'motion-safe:animate-float-slow',
        className,
      )}
    />
  );
}
