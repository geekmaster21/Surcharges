import { makeStyles, Theme } from '@material-ui/core';
import { drawerWidth } from './_constants';

export default makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: 'var(--grey-1)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    alignItems: 'baseline',
  },
  menuButton: {
    marginRight: theme.spacing(0.5),
    color: 'var(--orange-1)',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  header: {
    width: '100%',
    minHeight: '50px',
    height: '100%',
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--orange-1)',
  },
  headerContentRight: {
    display: 'flex',
    alignItems: 'center',
  },
  brand: {
    fontFamily: 'Euclid',
    fontWeight: 500,
    fontSize: '1.1rem',
    lineHeight: '1rem',
  },
  recoverySmall: {
    fontWeight: 400,
    fontSize: '.8rem',
  },
  drawerPaper: {
    overflowX: 'hidden',
    width: `${drawerWidth}px`,
    boxShadow: '0 0 5px black',
  },
}));
