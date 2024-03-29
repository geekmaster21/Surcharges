import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  alert: {
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
    userSelect: 'text',
    '& .MuiAccordionSummary-expandIcon.MuiIconButton-edgeEnd': {
      display: 'none',
    },
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
