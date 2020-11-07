import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AnchorLink, Donations, MenuIcon, Wiki } from 'components';
import { memo } from 'react';
import useStyles from 'styles/mui/drawer';
import { LanguageToggle } from './Language-Toggle';

function Header(props: { toggleClick: () => void }) {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.header}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={props.toggleClick}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography component='div' className={classes.headerContent}>
            <AnchorLink
              ATagProps={{
                className: 'link orange no-hover ' + classes.brand,
              }}
            >
              OrangeFox <span className={classes.recoverySmall}>Recovery</span>
            </AnchorLink>
          </Typography>

          <Donations
            className={'link orange no-hover ' + classes.headerContentRight}
          />
          <Wiki
            className={'link orange no-hover ' + classes.headerContentRight}
          />
          <LanguageToggle />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default memo(Header);
