import { creditText, getPhoto, type Photo as PhotoData } from "../../lib/photos";

type Props = {
  photoKey?: string | null;
  alt: string;
  /** Texto del panel cuando no hay foto con licencia para ese lugar. */
  fallbackTitle?: string;
  fallbackEyebrow?: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Muestra el crédito sobre la foto (abajo a la derecha). */
  showCredit?: boolean;
};

export function PhotoCredit({ photo, className = "" }: { photo: PhotoData; className?: string }) {
  const text = creditText(photo);
  if (!photo.sourceUrl) return <span className={className}>{text}</span>;
  return (
    <a
      href={photo.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline-offset-2 hover:underline ${className}`}
    >
      {text}
      <span className="sr-only"> (ver licencia en Wikimedia Commons)</span>
    </a>
  );
}

export default function Photo({
  photoKey,
  alt,
  fallbackTitle,
  fallbackEyebrow,
  sizes = "100vw",
  className = "",
  imgClassName = "h-full w-full object-cover",
  priority = false,
  showCredit = false,
}: Props) {
  const photo = getPhoto(photoKey);

  if (!photo) {
    // Sin foto verificable del lugar: mejor un panel honesto que una foto de otro sitio.
    return (
      <div
        className={`relative flex flex-col justify-end overflow-hidden bg-river-800 p-5 text-cream-100 ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full text-river-700"
          preserveAspectRatio="none"
          viewBox="0 0 400 300"
        >
          <path d="M0 210 C 80 180, 160 240, 240 205 S 360 190, 400 215 V300 H0Z" fill="currentColor" />
          <path
            d="M0 245 C 90 225, 170 270, 260 240 S 360 235, 400 250 V300 H0Z"
            fill="currentColor"
            opacity=".6"
          />
        </svg>
        {fallbackEyebrow ? (
          <span className="relative text-xs font-medium uppercase tracking-[0.14em] text-river-100">
            {fallbackEyebrow}
          </span>
        ) : null}
        {fallbackTitle ? (
          <span className="relative mt-1 font-display text-2xl leading-tight">{fallbackTitle}</span>
        ) : null}
      </div>
    );
  }

  const img = (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={photo.srcSet ? sizes : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      referrerPolicy="no-referrer"
      className={imgClassName}
    />
  );

  return (
    <div className={`relative overflow-hidden bg-cream-200 ${className}`}>
      {photo.webpSrc ? (
        <picture>
          <source srcSet={photo.webpSrc} type="image/webp" />
          {img}
        </picture>
      ) : (
        img
      )}
      {showCredit ? (
        <span className="absolute bottom-2 right-2 max-w-[85%] truncate rounded-full bg-ink/60 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
          <PhotoCredit photo={photo} />
        </span>
      ) : null}
    </div>
  );
}
