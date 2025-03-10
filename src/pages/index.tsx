'use client';

import Image from 'next/image'
import styles from "./styles/Home.module.css";
import { useEffect } from 'react';
import { annotate, annotationGroup } from 'rough-notation';
import assert from 'assert';
import { Neucha } from 'next/font/google'
import Head from "next/head";
import Link from 'next/link';

const neucha = Neucha({
  weight: "400",
  preload: true,
  fallback: [
    "Neucha", "Dekko",
    // fallbacks from https://github.com/system-fonts/modern-font-stacks#handwritten
    'Segoe Print', 'Bradley Hand', 'Chilanka', 'TSCu_Comic',
    'casual', 'cursive',
  ],
  subsets: ["latin"],
})

/**
  * This function gets the latest version of Saber from GitHub,
  * without the v prefix. (e.g. 1.0.0 instead of v1.0.0)
  */
async function getVersionName(): Promise<string> {
  // get the latest tag from GitHub (saber-notes/saber)
  const res = await fetch('https://api.github.com/repos/saber-notes/saber/tags');
  const json = await res.json();
  const versionWithV = json[0].name;
  assert(versionWithV.startsWith('v'));
  const versionWithoutV = versionWithV.slice(1);
  return versionWithoutV;
}

export async function getStaticProps() {
  const versionName = await getVersionName();
 
  return { props: { versionName } };
}

export default function Home({ versionName }: { versionName: string }) {
  useEffect(() => {
    const highlightColor = "var(--highlight-color)";

    const headerElem = document.querySelector<HTMLElement>('.' + styles.header)!;
    const badgesElem = document.querySelector<HTMLElement>('.' + styles.badges)!;
    const otherElems = document.querySelectorAll<HTMLElement>(
      'h2, .' + styles.underlineMe
    );

    const headerAnnotation = annotate(headerElem, {
      type: 'box',
      strokeWidth: 2,
      iterations: 2,
    });
    const badgesAnnotation = annotate(badgesElem, {
      type: 'bracket',
      strokeWidth: 2,
      iterations: 2,
      brackets: ['right', 'left'],
    });
    const otherElemsAnnotations = Array.from(otherElems).map((elem) => {
      if (elem.tagName === 'H2') {
        return annotate(elem, {
          type: 'highlight',
          color: highlightColor,
          iterations: 2,
        });
      } else if (elem.classList.contains(styles.underlineMe)) {
        return annotate(elem, {
          type: 'underline',
          color: highlightColor,
          iterations: 2,
        });
      } else {
        throw new Error('Unknown element');
      }
    });

    const group = annotationGroup([
      headerAnnotation,
      badgesAnnotation,
      ...otherElemsAnnotations,
    ]);
    group.show();

    return () => {
      group.hide();
    };
  }, []);

  return (
    <>
    <Head>
      <title>Saber</title>
      <meta name="description" content="The notes app built for handwriting" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={`${styles.main} ${neucha.className}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Saber
        </h1>
        <p className={styles.subtitle}>
          Handwritten Notes
        </p>
        <Image
          src="https://raw.githubusercontent.com/saber-notes/saber/refs/heads/main/assets/icon/icon.svg"
          alt="Logo"
          width={100}
          height={100}
        />
        <p className={styles.summary}>
          The notes app built for handwriting
        </p>
      </div>

      <div className={styles.badges}>
        <a href="https://play.google.com/store/apps/details?id=com.adilhanney.saber">
          <Image
            src="https://raw.githubusercontent.com/saber-notes/saber/main/assets_raw/badges/google-play-badge.png"
            alt="Get it on Google Play"
            width={564}
            height={168}
          />
        </a>
        <a href="https://f-droid.org/packages/com.adilhanney.saber/">
          <Image
            src="https://raw.githubusercontent.com/saber-notes/saber/main/assets_raw/badges/f-droid-badge.png"
            alt="Get it on F-Droid"
            width={564}
            height={168}
          />
        </a>
        <a href="https://apps.apple.com/us/app/saber/id1671523739">
          <Image
            src="https://raw.githubusercontent.com/saber-notes/saber/main/assets_raw/badges/app-store-badge.svg"
            alt="Download on the App Store"
            width={120}
            height={40}
          />
        </a>
        <a href={`https://github.com/saber-notes/saber/releases/download/v${versionName}/SaberInstaller_v${versionName}.exe`}>
          <Image
            src="https://raw.githubusercontent.com/saber-notes/saber/main/assets_raw/badges/windows-badge.png"
            alt="Download for Windows"
            width={391}
            height={129}
          />
        </a>
        <a href="https://flathub.org/apps/details/com.adilhanney.saber">
          <Image
            src="https://raw.githubusercontent.com/saber-notes/saber/main/assets_raw/badges/flathub-badge.svg"
            alt="Download on Flathub"
            width={300}
            height={100}
          />
        </a>
        <a href={`https://github.com/saber-notes/saber/releases/download/v${versionName}/Saber-${versionName}-x86_64.AppImage`}>
          <Image
            src="https://raw.githubusercontent.com/saber-notes/saber/main/assets_raw/badges/appimage-logo.png"
            alt="Get it as an AppImage"
            width={468}
            height={468}
          />
        </a>
        <a href="https://snapcraft.io/saber">
          <Image
            src="https://raw.githubusercontent.com/saber-notes/saber/main/assets_raw/badges/snap-badge.png"
            alt="Get it from the Snap Store"
            width={364}
            height={112}
          />
        </a>
      </div>

      <div className={styles.feature}>
        <h2>Private</h2>
        <p>Only you can access your notes!</p>
        <p>
          You can sync your notes across devices
          knowing that they are encrypted and stored securely,
          and not even the server can read them.
        </p>
        <p>
          You can also read the{' '}
          <Link href="/privacy_policy">privacy policy</Link>.
        </p>
      </div>

      <div className={styles.feature}>
        <h2>Cross-platform</h2>
        <p>
          You can sync and edit your notes across all your devices,
          whether they&apos;re a phone, tablet, or computer.
        </p>
      </div>

      <div className={styles.feature}>
        <h2>The perfect highlighter</h2>
        <p>
          Saber&apos;s highlighter doesn&apos;t overlap with itself
          and change color when you go over the same area again.
        </p>
        <p>
          The highlighter also renders{' '}
          <span className={styles.underlineMe}>underneath</span>{' '}
          the text, so you can still see the text clearly.
        </p>
      </div>

      <div className={styles.feature}>
        <h2>Stay organized</h2>
        <p>
          Saber lets you organize your notes into unlimited nested folders.
        </p>
        <p>
          You can also quickly access your most recent notes
          from the home screen.
        </p>
      </div>

      <div className={styles.feature}>
        <h2>Cohesive dark mode</h2>
        <p>
          Saber&apos;s dark mode doesn&apos;t just darken the UI;
          it also darkens the notes themselves.
        </p>
        <p>
          This means that you can read your notes in the dark
          without hurting your eyes.
        </p>
      </div>

      <div className={styles.feature}>
        <h2>Open source</h2>
        <p>No sneaky stuff! Saber is free and open source software.</p>
        <p>
          Find the code on{' '}
          <a href="https://github.com/saber-notes/saber">
            <Image
              className={styles.githubLogo}
              src="images/badges/github-mark.svg"
              alt=""
              aria-hidden="true"
              width={100}
              height={41}
            />
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
    </>
  )
}
