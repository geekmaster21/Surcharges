import { createStyles, makeStyles } from '@material-ui/core';
import { CSSProperties } from 'react';

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

export function LoadShimmer(p?: { style?: CSSProperties }) {
  const classes = useStyles();
  return <span style={p?.style} className={'shimmer ' + classes.root}></span>;
}
