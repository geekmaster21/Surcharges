import { makeStyles, Theme } from '@material-ui/core';
import { drawerWidth } from './_constants';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(1.3),
  },
  drawerContainer: {
    // Stops device list from shifting when scrollbar is visible
    marginRight: `calc(-1 * (${drawerWidth - 8}px - 100%))`,
    [theme.breakpoints.up('xs')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerStickySearch: {
    background: 'var(--grey-1)',
    top: 0,
    position: 'sticky',
    zIndex: 1,
    padding: '2px 0 1px',
  },
  clearSearch: {
    marginRight: '5px',
    cursor: 'pointer',
  },
  listNotFound: {
    display: 'flex',
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  sitemap: {
    height: '30px',
    width: 'auto',
    background: 'var(--grey-1)',
    bottom: 0,
    position: 'sticky',
    zIndex: 1,
  },
  notFound: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '0 10px',
  },
}));
