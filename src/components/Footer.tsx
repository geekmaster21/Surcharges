import { Paper } from '@material-ui/core';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/footer';
import { OpenOutside } from './Open-Outside';
import { PoweredBy } from './Powered-By';

const Footer = () => {
  const classes = useStyles();
  const Dot = () => <span className={'dot ' + classes.dot}>&#x25CF;</span>;

  return (
    <Paper component='footer' elevation={3} className={classes.root}>
      <Link href='/sitemap' as='/sitemap'>
        <a className='link'>Sitemap</a>
      </Link>

      <Dot />

      <OpenOutside
        className='link'
        href='https://gitlab.com/OrangeFox/infrastructure/dsite'
      >
        <FormattedMessage
          id='footer.openSource'
          defaultMessage='Open-Source Project'
        />
      </OpenOutside>

      <Dot />

      <PoweredBy />
    </Paper>
  );
};

export { Footer };
