import config from "config";
import { IsCSR } from "./common";

const consoleError = console.error;
const isProdEnv = !config.isDevEnv;
const errIdentifier = "@formatjs/cli";

/** Temporary hack to suppress React.Intl related error in prod env and on client browsers */
export default function DisableErrorFromReactIntl() {
  if (isProdEnv && IsCSR) {
    console.error = (...r: any) => {
      const hasReactIntlError = (s: string) =>
        typeof s === "string" && s.includes(errIdentifier);

      const isIntlErr = Array.isArray(r)
        ? r.some((s) => hasReactIntlError(s))
        : hasReactIntlError(r);

      if (!isIntlErr) {
        consoleError(...r);
      }
    };
  }
}
