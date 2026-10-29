"use client";
import { translate } from "@/lib/i18n";

import { T, useLocale } from "@/app/components/LocaleProvider";

import Image from "@/app/components/LocalizedImage";
import { useRef, useState } from "react";
import s from "@/lib/styles";
type Shot = { src: string; alt: string; caption: string };
export default function Gallery({ images }: { images: Shot[] }) {
  const locale = useLocale();
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  if (!images.length) return null;
  const shot = images[index];
  return (
    <section className={s.section}>
      <h2>
        <T>Screenshots</T>
      </h2>
      <div className={s.gallery}>
        {images.map((image, i) => (
          <figure key={image.src}>
            <button
              onClick={() => {
                setIndex(i);
                dialog.current?.showModal();
              }}
              aria-label={`Enlarge ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1000}
                height={650}
              />
            </button>
            {image.caption && (
              <figcaption>
                <T>{image.caption}</T>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className={s.lightbox}
        aria-label={translate("Screenshot viewer", locale)}
      >
        <button
          autoFocus
          className={s.button}
          onClick={() => dialog.current?.close()}
        >
          <T>Close</T>
        </button>
        <Image src={shot.src} alt={shot.alt} width={1600} height={1000} />
        <p>
          <T>{shot.caption}</T>
        </p>
        {images.length > 1 && (
          <div className={s.cardLinks}>
            <button
              onClick={() =>
                setIndex((index + images.length - 1) % images.length)
              }
            >
              <T>Previous</T>
            </button>
            <span>
              <T>{index + 1}</T> / <T>{images.length}</T>
            </span>
            <button onClick={() => setIndex((index + 1) % images.length)}>
              <T>Next</T>
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
