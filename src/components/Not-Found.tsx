import { AnchorLink, Image } from 'components';
import { FormattedMessage } from 'react-intl';

function NotFound() {
  return (
    <div className='hero big-image'>
      <Image src='/images/404.svg' alt='Not Found' className='nf-img' />

      <AnchorLink
        ATagProps={{
          className: 'link underline',
        }}
      >
        <FormattedMessage
          id='mainPage.notFound'
          defaultMessage='This is the end. Take me back Home!'
        />
      </AnchorLink>
    </div>
  );
}
export { NotFound };
