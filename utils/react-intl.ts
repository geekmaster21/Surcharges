import config from "config";

/** Temporary hack to ignore React.Intl related error in prod env */
export default function DisableErrorFromReactIntl() {
  if (!config.isDevEnv) {
    // if prod env
    console.error = (...r: any) => {
      if (r.includes && r.includes("@formatjs/cli")) {
        // do nothing
      } else {
        console.error(...r);
      }
    };
  }
}
