import config from "config";
import { NextPageContext } from "next";
import Router from "next/router";
import { IsCSR } from "./common";
import { GetCurrentLocale } from "./locale";

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

/** This function redirects route on missing or incorrect locale when passed in the url */
export function RedirectOnMissingLocale(ctx: NextPageContext, locale?: string) {
  const { asPath } = ctx;
  if (asPath && !asPath.includes("sitemap")) {
    const reqLocale = (asPath || "").split("/").filter(Boolean).shift() || "";
    if (!config.locale.pattern.test(reqLocale)) {
      // is not like /en
      return RedirectTo(ctx, locale);
    }
  }
  return false;
}
