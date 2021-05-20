import * as Sentry from '@sentry/nextjs';
import { NotFound } from 'components';
import NextErrorComponent from 'next/error';

function Page({ statusCode, hasGetInitialPropsRun, err }: any) {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException({ ...err, statusCode });
    // Flushing is not required in this case as it only happens on the client
  }
  return <NotFound />;
}

Page.getInitialProps = async ({ res, err, asPath }: any) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  } as any);

  if (err) {
    Sentry.captureException(err);

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000);

    return errorInitialProps;
  }

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );
  await Sentry.flush(2000);

  return { ...errorInitialProps, statusCode };
};

export default Page;
