import * as React from 'react';
import LightboxComponent, { type Slide } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
}

export interface LightboxProps {
  images: LightboxImage[];
  open: boolean;
  index?: number;
  onClose: () => void;
}

/**
 * Image lightbox with keyboard navigation (yet-another-react-lightbox).
 */
export function Lightbox({ images, open, index = 0, onClose }: LightboxProps) {
  const slides = React.useMemo<Slide[]>(
    () => images.map((img) => ({ src: img.src, alt: img.alt, title: img.title })),
    [images],
  );

  return <LightboxComponent open={open} close={onClose} index={index} slides={slides} />;
}

export interface GalleryGridProps {
  images: LightboxImage[];
  className?: string;
}

/**
 * Uniform image grid — click opens the lightbox at the tapped index.
 */
export function GalleryGrid({ images, className }: GalleryGridProps) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <div className={className ?? 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <img
              src={img.src}
              alt={img.alt ?? ''}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <Lightbox images={images} open={open} index={index} onClose={() => setOpen(false)} />
    </>
  );
}
