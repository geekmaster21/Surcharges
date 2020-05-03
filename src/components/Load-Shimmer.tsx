import React from 'react';
import { makeStyles, createStyles } from './React-Material';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '200px',
            height: '10px',
            fontSize: '0.8rem',
            display: 'block',
            marginBottom: '5px'
        }
    }),
);

export function LoadShimmer() {
    const classes = useStyles();
    return (
        <span className={"shimmer " + classes.root}  ></span>
    );
}
