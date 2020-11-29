import { makeStyles, Theme } from '@material-ui/core';
import { themedAlert } from './release-type';

export default makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  list: {
    width: '100%',
  },
  titleWithCopyIcon: {
    '&>h2': {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  icon: {
    color: '#ddd',
  },
  iconM5: {
    marginRight: '5px',
  },
  version: {
    display: 'flex',
    alignItems: 'center',
  },
  details: {
    padding: '5px 10px 10px',
    userSelect: 'text',
  },
  nestedList: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  md5: {
    overflowWrap: 'anywhere',
  },
  bug: {
    color: '#ff5e5e',
    borderColor: '#ff5e5e66',
    backgroundColor: '#ff5e5e11',
    '&:hover': {
      borderColor: '#ff5e5e',
    },
  },
  outlinedButton: {
    margin: '8px 0 8px 16px',
  },
  downloadButton: {
    margin: '14px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    '&>a': {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      '&:hover': {
        color: 'var(--orange-1) !important',
      },
    },
  },
  summary: {
    width: '100%',
    display: 'flex',
    placeContent: 'space-between',
  },
  ...themedAlert,
}));
