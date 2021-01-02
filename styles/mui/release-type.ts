import { makeStyles } from '@material-ui/core';
export const themedAlert = {
  alert: {
    color: '#e4e4e4 !important',
    borderColor: 'var(--orange-1) !important',
    borderWidth: '2px',
    fontWeight: 500,
    alignItems: 'center',
    '& svg': {
      color: 'var(--orange-1) !important',
    },
    marginBottom: '5px',
  },
};

export default makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: '#2a2a2a',
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
