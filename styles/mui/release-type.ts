import { makeStyles } from '@material-ui/core';
export const themedAlert = {
  alert: {
    color: 'white !important',
    borderColor: 'var(--orange-1) !important',
    alignItems: 'center',
    '& svg': {
      color: 'var(--orange-1) !important',
    },
  },
};

export default makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: '#18191B',
  },
  icon: {
    color: '#ddd',
  },
  iconM5: {
    color: '#ddd',
    marginRight: '5px',
  },
  details: {
    display: 'flex',
    padding: '5px 10px 10px',
    flexDirection: 'column',
  },
  ...themedAlert,
}));
