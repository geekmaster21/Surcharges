import { makeStyles, Theme } from '@material-ui/core';
import { drawerWidth } from './_constants';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  routeContent: {
    flexGrow: 1,
    height: '100%',
    marginTop: 'var(--header-ht)',
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    minHeight: 'calc(100vh - 116px)',
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100vh - 112px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: 'var(--orange-1)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    alignItems: 'baseline',
  },
  menuButton: {
    marginRight: theme.spacing(0.5),
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
