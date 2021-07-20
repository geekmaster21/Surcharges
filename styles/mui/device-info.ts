import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  themedUnderline: {
    textDecoration: 'underline',
    textDecorationColor: 'var(--orange-1)',
  },
  deviceHeader: {
    color: 'var(--orange-1)',
    marginBottom: 20,
    fontSize: '1.6rem',
  },
  divider: {
    margin: '20px 0',
  },
  group: {
    display: 'flex',
    gap: 30,
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    '&>div': {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
    },
  },
  groupedItems: {
    display: 'flex',
    gap: 30,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  ///
  alert: {
    marginTop: 20,
    alignItems: 'center',
    '& > .MuiAlert-message': {
      width: '100%',
    },
  },
  details: {
    flexDirection: 'column',
    padding: '5px 10px 10px',
  },
  list: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  root: {
    width: '100%',
    backgroundColor: '#2a2a2a',
    padding: 20,
    marginBottom: 10,
    userSelect: 'text',
  },
  icon: {
    color: '#ddd',
  },
  notmaintained: {
    color: '#ffc459',
  },
  notmaintainedIcon: {
    fontSize: '1rem',
    marginBottom: '-0.2rem',
    marginRight: '2px',
  },
  iconM5: {
    color: '#ddd',
    marginRight: '5px',
  },
  flexText: {
    display: 'flex',
    alignItems: 'center',
  },
}));
