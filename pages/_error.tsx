import { NotFound } from 'components';
import NextErrorComponent from 'next/error';
import sentry from 'utils/sentry';

function Page({ statusCode, hasGetInitialPropsRun, err }: any) {
  if (!hasGetInitialPropsRun && err) {
    sentry.error({ __source__: 'pages/error/page', ...err, statusCode }, false);
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

  return {
    ...errorInitialProps,
    statusCode: Array.isArray(statusCode) ? statusCode.pop() : statusCode,
  };
};

export default Page;
