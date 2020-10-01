import { makeStyles, Theme } from '@material-ui/core';

const listItem = {
  gap: '10px',
  display: 'flex',
  borderLeft: '3px solid transparent',
};

export default makeStyles((theme: Theme) => ({
  formControl: {
    marginRight: '-8px',
    [theme.breakpoints.up('sm')]: {
      marginRight: '-16px',
    },
    marginLeft: theme.spacing(3),
    outline: 'none',
  },
  listItem,
  listItemHelp: {
    ...listItem,
    fontSize: '15px',
    margin: '0 10px',
    borderBottom: '1px solid gray',
  },
  listItemSelected: {
    borderLeft: '3px solid var(--orange-1)',
  },
  select: {
    width: '55px',
    marginRight: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      width: '60px',
      marginRight: theme.spacing(12),
    },
  },
  arrowIcon: {
    fontSize: '20px',
    marginTop: '2px',
    color: 'white',
  },
}));
