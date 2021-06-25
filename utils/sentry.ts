import * as Sentry from '@sentry/nextjs';

type SentryError = { __source__: string } & { [p: string]: any };

async function error(err: SentryError, shouldFlush = true) {
  Sentry.captureException(err);
  if (shouldFlush)  {
    await Sentry.flush(2000);
  }
  console.error(err);
}

export default {
  error,
};
