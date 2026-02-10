import Image, { ImageProps } from "next/image";

type OptimizedImageProps = Omit<ImageProps, "sizes"> & {
  sizes?: string;
  preset?: "hero" | "testimonial" | "logo" | "full-width" | "card";
};

const PRESETS: Record<string, string> = {
  hero: "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px",
  testimonial: "(max-width: 640px) 80px, (max-width: 1024px) 96px, 96px",
  logo: "(max-width: 640px) 100px, (max-width: 1024px) 120px, 150px",
  "full-width": "100vw",
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
};

export default function OptimizedImage({
  preset,
  sizes,
  quality,
  ...props
}: OptimizedImageProps) {
  const responsiveSizes = sizes || (preset ? PRESETS[preset] : PRESETS.card);

  return (
    <Image
      {...props}
      sizes={responsiveSizes}
      quality={quality || (preset === "testimonial" ? 60 : 75)}
    />
  );
}
