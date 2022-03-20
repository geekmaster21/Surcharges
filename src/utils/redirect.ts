import { NextPageContext } from 'next';
import Router from 'next/router';
import { IsCSR } from './common';
import { GetCurrentLocale } from './locale';

export function RedirectTo(ctx: NextPageContext, locale?: string) {
  const { res, asPath } = ctx;
  const curLocale = locale || GetCurrentLocale();
  const Location = `/${curLocale}${asPath}`;
  if (!asPath?.startsWith(curLocale)) {
    if (res) {
      res.writeHead(302, { Location });
      res.end();
      return true;
    } else {
      if (IsCSR) {
        Router.push(Location);
        return true;
      }
    }
  }
  return false;
}
