import { DocumentContext } from "next/document";
import { IsCSR } from "./common";

export function CreateOriginUrl(ctx: DocumentContext) {
    let baseUrl = "";
    if (IsCSR) {
        baseUrl = location.origin;
    } else {
        let {
            headers: { referer, host, "x-forwarded-proto": proto },
            secure,
            connection,
        } = ctx.req as any;
        secure = secure || connection.encrypted;
        secure = secure || proto === "https";

        const url = new URL(referer || `${secure ? "https" : "http"}://${host}`);
        baseUrl = url.origin;
    }
    return baseUrl;
}
