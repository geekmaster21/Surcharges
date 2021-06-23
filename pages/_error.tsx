import { NotFound } from 'components';
import NextErrorComponent from 'next/error';
import sentry from 'utils/sentry';

function Page({ statusCode, hasGetInitialPropsRun, err }: any) {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    sentry.error({ __source__: 'pages/error/page', ...err, statusCode });
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
    await sentry.error({
      __source__: 'pages/error/initialProps',
      ...err,
      asPath,
    });
    return errorInitialProps;
  }

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { ...errorInitialProps, statusCode };
};

export default Page;
