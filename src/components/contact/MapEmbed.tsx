export function MapEmbed({ address }: { address: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-card border border-border shadow-card-rest">
      <iframe
        title="Saini Phool Bhandar location map"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale-[15%]"
      />
    </div>
  );
}
