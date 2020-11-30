import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    topLogo: {
      width: '100%',
      display: 'flex',
      padding: '2vh 0',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        padding: '10px 0',
      },
    },
    root: {
      width: '100%',
      padding: '1vh 3vw',
      display: 'grid',
      gap: '20px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr) )',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center',
        paddingBottom: '10px',
      },
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
    },
    itemPlaceholder: {
      gap: '10px',
      display: 'flex',
      flexDirection: 'column',
      '& b': {
        height: '10px',
        width: '200px',
        display: 'inline-block',
      },
      '& small': {
        height: '10px',
        width: '100px',
        display: 'inline-block',
      },
    },
    code: {
      fontStyle: 'italic',
    },
  })
);
