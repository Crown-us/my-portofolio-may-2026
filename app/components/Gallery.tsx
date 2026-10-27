"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import s from "@/lib/styles";
type Shot = { src: string; alt: string; caption: string };
export default function Gallery({ images }: { images: Shot[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  if (!images.length) return null;
  const shot = images[index];
  return (
    <section className={s.section}>
      <h2>Screenshots</h2>
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
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className={s.lightbox}
        aria-label="Screenshot viewer"
      >
        <button
          autoFocus
          className={s.button}
          onClick={() => dialog.current?.close()}
        >
          Close
        </button>
        <Image src={shot.src} alt={shot.alt} width={1600} height={1000} />
        <p>{shot.caption}</p>
        {images.length > 1 && (
          <div className={s.cardLinks}>
            <button
              onClick={() =>
                setIndex((index + images.length - 1) % images.length)
              }
            >
              Previous
            </button>
            <span>
              {index + 1} / {images.length}
            </span>
            <button onClick={() => setIndex((index + 1) % images.length)}>
              Next
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
