import { ServerStyleSheets } from '@material-ui/core/styles';
import config from 'config';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

export default class OrangeFoxDocument extends Document {
  render() {
    return (
      <Html data-version={config.version}>
        <Head>
          <link rel='sitemap' type='application/xml' href='/sitemap.xml' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

OrangeFoxDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
