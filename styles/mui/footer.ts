import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '50px',
      display: 'flex',
      fontSize: '13.5px',
      padding: '0 10px',
      alignItems: 'center',
      placeContent: 'flex-end',
      [theme.breakpoints.down('xs')]: {
        fontSize: '11px',
        height: '55px',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '2px 5px',
        '&>[class*=dot]': {
          display: 'none',
        },
        '&>*': {
          margin: 'auto 0',
        },
      },
    },
    dot: {
      margin: '0 5px',
    },
  })
);
