import Link from "next/link";
import Image from "next/image";

export interface ServiceCardProps {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export function ServiceCard({ slug, title, category, description, image }: ServiceCardProps) {
  return (
    <Link href={`/services/${slug}`} className="group flex flex-col h-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-300 focus-visible:outline-[var(--color-accent)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface-muted)]">
        {image ? (
          <Image 
            src={image} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-xs uppercase tracking-widest">
            Coming Soon
          </div>
        )}
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <span className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-accent)] mb-3 block">
          {category}
        </span>
        <h3 className="font-serif text-[length:var(--text-heading-s)] text-[var(--color-text)] mb-4">
          {title}
        </h3>
        <p className="font-sans text-sm text-[var(--color-text-muted)] font-light leading-relaxed mb-6 flex-grow line-clamp-3">
          {description}
        </p>
        <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 mt-auto">
          Explore Service <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
