import config from "config";
import { NextPageContext } from "next";
import Router from "next/router";
import { IsCSR } from "./common";
import { GetCurrentLocale, SetCurrentLocale } from "./current-locale";

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

export function RedirectIfNecessary(ctx: NextPageContext) {
    const { asPath } = ctx;
    if (asPath) {
        const { availableLanguages, currentLocale, localePattern } = config;
        const reqLocale = (asPath || "").split("/").filter(Boolean).shift() || "";
        if (localePattern.test(reqLocale)) {
            // is like /en
            const localeExists = availableLanguages.some((s) => s.code === reqLocale);
            if (localeExists && reqLocale !== currentLocale) {
                SetCurrentLocale(reqLocale);
                return RedirectTo(ctx, reqLocale);
            }
        } else {
            // is not like /en
            return RedirectTo(ctx);
        }
    }
    return false;
}
