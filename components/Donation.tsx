import { Button, Hidden, IconButton } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { OpenOutside } from '.';
import { MonetizationOnOutlinedIcon } from './Icons';

export interface DonationsProps {
  className?: string;
}

const Donations: React.FunctionComponent<DonationsProps> = ({ className }) => {
  return (
    <OpenOutside
      title='Donations'
      id='link-donations'
      className={className}
      href='https://opencollective.com/orangefox/donate'
    >
      <Hidden smUp implementation='css'>
        <IconButton
          color='inherit'
          component='span'
          aria-label='Open Donations link'
        >
          <MonetizationOnOutlinedIcon />
        </IconButton>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Button
          color='primary'
          component='span'
          className='orange'
          startIcon={<MonetizationOnOutlinedIcon className='bigIcon' />}
        >
          <FormattedMessage id='mainPage.donation' defaultMessage='Donations' />
        </Button>
      </Hidden>
    </OpenOutside>
  );
};

export { Donations };
