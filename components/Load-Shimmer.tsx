import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '200px',
      height: '10px',
      fontSize: '0.8rem',
      display: 'block',
      marginBottom: '5px',
    },
  })
);

export function LoadShimmer() {
  const classes = useStyles();
  return <span className={'shimmer ' + classes.root}></span>;
}
