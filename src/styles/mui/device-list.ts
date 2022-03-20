import { makeStyles, Theme } from '@material-ui/core';
import { drawerWidth } from './_constants';

export default makeStyles((theme: Theme) => ({
  root: {
    // Stops device list from shifting when scrollbar is visible
    marginRight: `calc(-1 * (${drawerWidth - 8}px - 100%))`,
    display: 'flex',
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    [theme.breakpoints.up('xs')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  searchTxtField: {
    display: 'flex',
    margin: theme.spacing(1.3),
  },
  searchContainer: {
    background: 'var(--grey-1)',
    top: 0,
    position: 'sticky',
    zIndex: 1,
    padding: '2px 0 2px',
    display: 'flex',
    flexDirection: 'column',
    '&>.MuiToggleButtonGroup-root': {
      alignSelf: 'center',
    },
  },
  clearSearch: {
    marginRight: '5px',
    cursor: 'pointer',
  },
  filterBtn: {
    color: '#4a4a4a',
    border: '1px solid #4a4a4a',
    fontSize: '0.6rem',
    '&.Mui-selected': {
      color: '#ddd',
      background: '#252525',
    },
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
    padding: '10px 0 10px',
  },
  version: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    textAlign: 'center',
    backgroundColor: 'var(--grey-1)',
    padding: '2px 0',
  },
}));
