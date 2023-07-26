'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect } from 'react';
import { annotate, annotationGroup } from 'rough-notation';
import { RoughAnnotationGroup } from 'rough-notation/lib/model';

export default function Home() {
  let lastAnnotationGroup: RoughAnnotationGroup | null = null;
  useEffect(() => {
    const headerElem = document.querySelector<HTMLElement>('.'+styles.header)!;
    const h2s = document.querySelectorAll('h2');

    const headerAnnotation = annotate(headerElem, { type: 'box' });
    const h2Annotations = Array.from(h2s)
        .map((h2) => annotate(h2, { type: 'box' }));

    lastAnnotationGroup?.hide();
    const group = annotationGroup([headerAnnotation, ...h2Annotations]);
    group.show();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Image
          src="https://raw.githubusercontent.com/adil192/saber/main/assets/icon/resized/icon-512x512.png"
          alt="Logo"
          width={100}
          height={100}
        />
        <h1 className={styles.title}>Saber</h1>
        <p className={styles.summary}>
          A cross-platform libre handwritten notes app
        </p>
      </div>

      <div className={styles.github}>
        <h2>Open source</h2>
        <p>No sneaky stuff! Saber is free and open source software.</p>
        <p>
          Find the code on{' '}
          <a href="https://github.com/adil192/saber">
            <Image
              className={styles.githubLogo}
              src="images/badges/GitHub_Logo.png"
              alt="GitHub"
              width={100}
              height={41}
            />
          </a>
          .
        </p>
      </div>
    </main>
  )
}
