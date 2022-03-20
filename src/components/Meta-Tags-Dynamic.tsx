import { IChildren } from 'models';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { IsCSR } from 'utils';

type Props = IChildren & {
  url?: string;
  desc?: string;
  title?: string;
  jsonLd?: object;
  canonical?: string;
};
const Brand = 'OrangeFox Recovery Downloads';
const Branded = (item?: string) => (item ? `${item} | ${Brand}` : Brand);

export const MetaTagsDynamic = ({
  desc,
  title,
  jsonLd,
  children,
  canonical,
  url = IsCSR ? Router.asPath : '',
}: Props) => {
  const brandedTitle = Branded(title);
  return (
    <Head>
      <title>{brandedTitle}</title>

      <meta name='title' content={brandedTitle} />
      <meta name='og:title' content={brandedTitle} />

      {url && (
        <>
          <meta name='url' content={url} />
          <meta property='url' content={url} />
          <meta name='og:url' content={url} />
        </>
      )}

      {canonical && (
        <>
          <link rel='canonical' href={canonical} />
        </>
      )}

      {desc && (
        <>
          <meta name='content' content={desc} />
          <meta name='og:content' content={desc} />
          <meta name='description' content={desc} />
          <meta property='description' content={desc} />
          <meta name='og:description' content={desc} />
        </>
      )}

      {jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...jsonLd,
            }),
          }}
        ></script>
      )}

      {children}
    </Head>
  );
};
